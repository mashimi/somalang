import os
from typing import Optional

from dotenv import load_dotenv

# Load Stream keys from the parent repo .env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))
# Local .env adds OPENAI_API_KEY and can override any key
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"), override=True)

from getstream.models import MemberRequest  # noqa: E402
from openai.types.realtime.realtime_transcription_session_audio_input_turn_detection_param import ServerVad  # noqa: E402
from vision_agents.core import Agent, AgentLauncher, User, Runner  # noqa: E402
from vision_agents.core.instructions import Instructions  # noqa: E402
from vision_agents.core.llm.events import (  # noqa: E402
    RealtimeAgentSpeechTranscriptionEvent,
    RealtimeUserSpeechTranscriptionEvent,
)
from vision_agents.plugins import getstream, openai  # noqa: E402

AGENT_USER_ID = "ai-teacher"

LANGUAGE_NAMES: dict[str, str] = {
    "es": "Kihispania",
    "fr": "Kifaransa",
    "ja": "Kijapani",
    "de": "Kijerumani",
}

DEFAULT_SYSTEM_PROMPT = (
    "Wewe ni mwalimu wa Kijerumani anayezungumza Kiswahili. Kazi yako ni kufundisha mwanafunzi Kijerumani kwa kutumia Kiswahili kama lugha ya maelekezo. "
    "Unafanya kazi katika hali mbili hasa na USIZICHANGANYE:\n"
    "1. HALI YA KUFUNDISHA: Sema neno au sentensi moja ya Kijerumani, maana yake kwa Kiswahili, na kidokezo fupi cha matamshi. "
    "Malizia kwa swali moja rahisi kama 'Unaweza kusema hivyo?' au 'Jaribu kuisema!'. "
    "Zamu yako INAISHIA pale. Usiseme kitu kingine. USIJIAMBIE mwanafunzi atasema nini. Acha tu.\n"
    "2. HALI YA KUITIKIA: Umepokea sauti halisi kutoka kwa mwanafunzi. "
    "Itikia kile alichokisema — sentensi moja ya sifa au kusahihisha kwa upole kwa Kiswahili — "
    "kisha muulize ajaribu tena au umpe neno jipya la Kijerumani. Acha tu.\n"
    "SHERIA KAMILI:\n"
    "- Usiseme 'Vizuri sana', 'Sahihi', au sifa yoyote isipokuwa mwanafunzi AMESEMA kitu katika zamu hii.\n"
    "- Usiendelee zaidi ya alama ya swali. Kila swali ni kikomo.\n"
    "- Usiigize majibu ya mwanafunzi au kuandika kile unachofikiria atasema.\n"
    "- Weka majibu yako yasiwe zaidi ya sentensi mbili fupi.\n"
    "- Baki ndani ya msamiati wa somo la sasa pekee. Usifundishe maneno yasiyo kwenye somo."
)

def _require_env(var_name: str) -> None:
    if not os.getenv(var_name):
        raise RuntimeError(f"Missing required environment variable: {var_name}")

def _language_name_from_call_id(call_id: str) -> Optional[str]:
    # call_id format: lesson-{langCode}-lesson-{n}-{userId}
    parts = call_id.split("-")
    if len(parts) >= 2 and parts[0] == "lesson":
        return LANGUAGE_NAMES.get(parts[1])
    return None


async def create_agent(**kwargs) -> Agent:
    return Agent(
        edge=getstream.Edge(),
        llm=openai.Realtime(
            # server_vad fires on raw audio energy (~100 ms after mic opens) rather
            # than waiting for semantic speech intent detection (~500 ms+).
            # This means the agent stops speaking almost immediately when the user
            # presses the push-and-hold mic button, before they have said a word.
            realtime_session={
                "type": "realtime",
                "audio": {
                    "input": {
                        "transcription": {"model": "gpt-4o-mini-transcribe"},
                        "turn_detection": ServerVad(
                            type="server_vad",
                            threshold=0.4,         # low enough to catch ambient noise on mic open
                            prefix_padding_ms=200,  # capture brief audio before speech onset
                            silence_duration_ms=400, # commit turn after 400 ms of silence
                            interrupt_response=True, # stop agent audio the moment VAD fires
                        ),
                    }
                },
            }
        ),
        agent_user=User(name="Mwalimu wa Kijerumani", id=AGENT_USER_ID),
        instructions=DEFAULT_SYSTEM_PROMPT,
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    # Read lesson context packed into the call's custom data by the mobile app
    custom: dict = {}
    try:
        resp = await call.get()
        custom = resp.data.call.custom or {}
    except Exception as e:
        print(f"[agent] Warning: could not fetch call custom data: {e}")

    system_prompt  = custom.get("system_prompt") or DEFAULT_SYSTEM_PROMPT
    intro_message  = custom.get("intro_message")
    language_code  = custom.get("language") or ""
    lesson_title   = custom.get("lesson_title") or ""
    language_name  = LANGUAGE_NAMES.get(language_code) or _language_name_from_call_id(call_id) or "lugha"

    # Apply lesson-specific instructions before joining so the Realtime LLM receives them
    agent.instructions = Instructions(input_text=system_prompt)

    # Grant admin role + go live so the agent can publish audio
    try:
        await call.update_call_members(
            update_members=[MemberRequest(user_id=AGENT_USER_ID, role="admin")]
        )
    except Exception as e:
        print(f"[agent] Warning: could not set admin role: {e}")

    try:
        await call.go_live()
    except Exception as e:
        print(f"[agent] Warning: go_live failed (expected for default call type): {e}")

    # Accumulate transcript deltas and forward them as Stream custom events so the
    # mobile app can display real-time captions word-by-word as speech is generated.
    partial_agent: list[str] = []
    partial_user: list[str] = []

    async def on_transcript_event(event) -> None:
        if isinstance(event, RealtimeAgentSpeechTranscriptionEvent):
            if event.mode == "delta" and event.text:
                partial_agent.append(event.text)
                try:
                    await agent.send_custom_event({
                        "type": "transcript_partial",
                        "speaker": "agent",
                        "text": "".join(partial_agent),
                    })
                except Exception as e:
                    print(f"[agent] send_custom_event error: {e}")
            elif event.mode == "final":
                partial_agent.clear()

        elif isinstance(event, RealtimeUserSpeechTranscriptionEvent):
            if event.mode == "delta" and event.text:
                partial_user.append(event.text)
                try:
                    await agent.send_custom_event({
                        "type": "transcript_partial",
                        "speaker": "user",
                        "text": "".join(partial_user),
                    })
                except Exception as e:
                    print(f"[agent] send_custom_event error: {e}")
            elif event.mode == "final":
                partial_user.clear()

    agent.subscribe(on_transcript_event)

    async with agent.join(call):
        # Wait for the student to join (returns immediately if already present)
        await agent.wait_for_participant(timeout=60.0)

        if intro_message:
            context_parts = [f"Mwanafunzi ameanza somo lako la {language_name}"]
            if lesson_title:
                context_parts[0] += f" — '{lesson_title}'"
            context_parts[0] += "."
            context_parts.append(
                f"Toa salamu hii na USISEME kitu kingine: \"{intro_message}\" "
                f"Baada ya salamu, muulize mwanafunzi swali moja rahisi ili aanze kuzungumza — "
                f"kwa mfano 'Uko tayari kuanza?' au 'Umewahi kujifunza {language_name} kabla?' "
                f"Kisha ACHA TU na usubiri jibu la mwanafunzi kabla ya kufundisha kitu chochote."
            )
            await agent.simple_response(" ".join(context_parts))
        else:
            await agent.simple_response(
                f"Mwanafunzi ameanza somo lako la {language_name}. "
                f"Msalamu kwa ukarimu na muulize swali fupi — kama 'Uko tayari kujifunza {language_name}?' "
                f"Kisha ACHA TU na usubiri jibu lao kabla hujafundisha kitu chochote."
            )

        await agent.finish()


if __name__ == "__main__":
    _require_env("STREAM_API_KEY")
    _require_env("STREAM_API_SECRET")
    _require_env("OPENAI_API_KEY")

    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
