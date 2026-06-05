import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";
import OpenAI from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase (server-side with service role key)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Free tier limit: 1 lesson per week
// Local type for AI-generated activities (mirrors frontend's Activity type)
interface GeneratedActivity {
  id: string;
  type: string;
  question?: string;
  correctAnswer?: string;
  options?: string[];
  hint?: string;
  front?: string;
  back?: string;
}

const FREE_WEEKLY_LIMIT = 1;

interface GenerateLessonRequest {
  userPrompt: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1";
  userId: string;
  isPremium: boolean;
}

function getWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString().split("T")[0];
}

async function generateLessonWithAI(
  userPrompt: string,
  level: "A1" | "A2" | "B1" | "B2" | "C1"
) {
  const systemPrompt = `You are an expert German language teacher for Swahili speakers. 
Generate a single, comprehensive lesson in strict JSON format.

CRITICAL REQUIREMENTS:
1. All explanations, instructions, and UI text MUST be in Swahili
2. The target language being taught is German
3. Vocabulary translations must be German → Swahili
4. Grammar explanations must be in Swahili
5. All activities must be interactive and educational
6. Pronunciation guides should use Swahili phonetics where helpful

Generate a lesson with this exact JSON structure:
{
  "id": "ai-lesson-${Date.now()}",
  "unitId": "ai-generated",
  "title": "German title for the lesson",
  "description": "Swahili description of what students will learn",
  "icon": "emoji representing the topic",
  "level": "${level}",
  "xpReward": 25,
  "estimatedMinutes": 15,
  "goals": [
    {
      "description": "Swahili description of learning goal",
      "xpReward": 10
    }
  ],
  "vocabulary": [
    {
      "word": "German word",
      "translation": "Swahili translation",
      "pronunciation": "phonetic guide",
      "emoji": "relevant emoji",
      "example": "German example sentence"
    }
  ],
  "phrases": [
    {
      "text": "German phrase",
      "translation": "Swahili translation",
      "pronunciation": "phonetic guide"
    }
  ],
  "grammar": {
    "topic": "Swahili grammar topic name",
    "explanation": "Detailed explanation in Swahili",
    "examples": ["German example 1", "German example 2"],
    "commonMistakes": ["Swahili explanation of common mistake"]
  },
  "culturalNote": {
    "title": "Swahili title",
    "content": "Cultural note in Swahili"
  },
  "activities": [
    {
      "id": "activity-1",
      "type": "multiple-choice",
      "question": "Question in Swahili asking about German",
      "correctAnswer": "Correct German word/phrase",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "hint": "Hint in Swahili"
    },
    {
      "id": "activity-2",
      "type": "flashcard",
      "question": "Swahili question",
      "correctAnswer": "German answer",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "front": "German word",
      "back": "Swahili translation"
    },
    {
      "id": "activity-3",
      "type": "translate",
      "question": "Translate to German: [Swahili phrase]",
      "correctAnswer": "German translation",
      "hint": "Hint in Swahili"
    }
  ],
  "aiTeacherPrompt": {
    "systemPrompt": "You are teaching this specific lesson. Speak Swahili to explain concepts, use German for practice. Stay focused on: [topic]. Keep responses short and encouraging.",
    "introMessage": "Swahili greeting introducing the lesson topic",
    "topics": ["topic1", "topic2"],
    "fallbackResponses": ["Swahili encouragement 1", "Swahili encouragement 2"]
  }
}

Generate 8-12 vocabulary items, 3-5 phrases, and 5-7 diverse activities.
Ensure the lesson is appropriate for ${level} level.
Return ONLY valid JSON, no markdown or explanations.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective and fast
    response_format: { type: "json_object" }, // Forces valid JSON
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Create a German lesson for a Swahili speaker. User's request: "${userPrompt}". Target level: ${level}.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000,
  });

  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error("OpenAI returned empty response");
  }

  const lesson = JSON.parse(content);

  // Validate the lesson structure
  if (!lesson.vocabulary || !lesson.activities || !lesson.aiTeacherPrompt) {
    throw new Error("Generated lesson missing required fields");
  }

  // Ensure all activities have IDs
  lesson.activities = lesson.activities.map((act: GeneratedActivity, idx: number) => ({
    ...act,
    id: act.id || `activity-${idx + 1}`,
  }));

  return lesson;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const { userPrompt, level, userId, isPremium }: GenerateLessonRequest =
      await request.json();

    // Validate input
    if (!userPrompt || !level || !userId) {
      return Response.json(
        { error: "Missing required fields: userPrompt, level, userId" },
        { status: 400 }
      );
    }

    // Check usage limits for free users
    if (!isPremium) {
      const weekStart = getWeekStart();
      const { data: usage } = await supabase
        .from("ai_lesson_usage")
        .select("lessons_generated")
        .eq("user_id", userId)
        .eq("week_start", weekStart)
        .single();

      if (usage && usage.lessons_generated >= FREE_WEEKLY_LIMIT) {
        return Response.json(
          {
            error: "Weekly limit reached",
            message:
              "Boresha akaunti yako ya Premium kupata masomo yasiyo na kikomo!",
            limit: FREE_WEEKLY_LIMIT,
            used: usage.lessons_generated,
          },
          { status: 429 }
        );
      }
    }

    // Create prompt hash for caching
    const promptHash = createHash("sha256")
      .update(`${userPrompt}-${level}`)
      .digest("hex");

    // Check cache first (saves API costs!)
    const { data: cached } = await supabase
      .from("ai_lessons")
      .select("lesson_data")
      .eq("user_id", userId)
      .eq("prompt_hash", promptHash)
      .single();

    if (cached) {
      console.log("[AI Lesson] Cache hit for prompt:", userPrompt);
      return Response.json(cached.lesson_data);
    }

    console.log("[AI Lesson] Generating new lesson for:", userPrompt);

    // Generate lesson with OpenAI
    const lesson = await generateLessonWithAI(userPrompt, level);

    // Cache the generated lesson
    await supabase.from("ai_lessons").insert({
      user_id: userId,
      prompt_hash: promptHash,
      user_prompt: userPrompt,
      level,
      lesson_data: lesson,
    });

    // Update usage counter - increment if record exists, insert if not
    const weekStart = getWeekStart();

    // Upsert approach: try to increment existing or insert new
    const { data: currentUsage } = await supabase
      .from("ai_lesson_usage")
      .select("lessons_generated")
      .eq("user_id", userId)
      .eq("week_start", weekStart)
      .single();

    if (currentUsage) {
      await supabase
        .from("ai_lesson_usage")
        .update({ lessons_generated: currentUsage.lessons_generated + 1 })
        .eq("user_id", userId)
        .eq("week_start", weekStart);
    } else {
      await supabase.from("ai_lesson_usage").insert({
        user_id: userId,
        week_start: weekStart,
        lessons_generated: 1,
      });
    }

    return Response.json(lesson);
  } catch (error) {
    console.error("[AI Lesson] Error:", error);
    return Response.json(
      {
        error: "Failed to generate lesson",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}