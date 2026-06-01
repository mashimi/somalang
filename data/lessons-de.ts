import { Lesson } from "@/types/learning";

// German A1 - Beginner
export const GERMAN_A1_LESSONS: Lesson[] = [
  {
    id: "de-a1-lesson-1",
    unitId: "de-a1-unit-1",
    title: "Begrüßungen & Vorstellung",
    description: "Lerne grundlegende Begrüßungen und wie du dich vorstellst",
    icon: "👋",
    xpReward: 20,
    goals: [
      { description: "Grundlegende Begrüßungen beherrschen", xpReward: 10 },
      { description: "Dich selbst vorstellen können", xpReward: 10 },
    ],
    vocabulary: [
      { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh", emoji: "👋" },
      { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen", emoji: "🌅" },
      { word: "Guten Tag", translation: "Good day", pronunciation: "GOO-ten TAHK", emoji: "☀️" },
      { word: "Guten Abend", translation: "Good evening", pronunciation: "GOO-ten AH-bent", emoji: "🌆" },
      { word: "Auf Wiedersehen", translation: "Goodbye", pronunciation: "owf VEE-der-zay-en", emoji: "👋" },
      { word: "Tschüss", translation: "Bye", pronunciation: "choos", emoji: "👋" },
      { word: "Ich heiße", translation: "My name is", pronunciation: "ikh HY-suh", emoji: "📛" },
      { word: "Wie heißt du?", translation: "What's your name?", pronunciation: "vee heyst doo", emoji: "❓" },
    ],
    phrases: [
      {
        text: "Hallo! Ich heiße Anna.",
        translation: "Hello! My name is Anna.",
        pronunciation: "HAH-loh! ikh HY-suh AH-nah.",
      },
      {
        text: "Wie heißt du?",
        translation: "What's your name?",
        pronunciation: "Vee heyst doo?",
      },
      {
        text: "Freut mich!",
        translation: "Nice to meet you!",
        pronunciation: "Froyt mikh!",
      },
      {
        text: "Woher kommst du?",
        translation: "Where are you from?",
        pronunciation: "VOH-hair komst doo?",
      },
    ],
    activities: [
      {
        id: "de-a1-1-act-1",
        type: "multiple-choice",
        question: "Wie sagt man 'Hello' auf Deutsch?",
        correctAnswer: "Hallo",
        options: ["Tschüss", "Hallo", "Danke", "Bitte"],
        hint: "Es ist eine Begrüßung",
      },
      {
        id: "de-a1-1-act-2",
        type: "translate",
        question: "Übersetze: 'My name is Max'",
        correctAnswer: "Ich heiße Max",
        hint: "Benutze 'Ich heiße'",
      },
      {
        id: "de-a1-1-act-3",
        type: "listen",
        question: "Höre zu und wiederhole: 'Guten Morgen!'",
        correctAnswer: "Guten Morgen",
        hint: "Es ist eine Morgen-Begrüßung",
      },
      {
        id: "de-a1-1-act-4",
        type: "flashcard",
        question: "Was bedeutet 'Auf Wiedersehen'?",
        correctAnswer: "Goodbye",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        hint: "Man sagt es beim Abschied",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A1 - Greetings & Introductions.
Current lesson vocabulary: Hallo, Guten Morgen, Guten Tag, Guten Abend, Auf Wiedersehen, Tschüss, Ich heiße, Wie heißt du?
Current lesson phrases: Hallo! Ich heiße Anna. / Wie heißt du? / Freut mich! / Woher kommst du?

TEACHING MODE:
1. Say ONE German word/phrase from the lesson vocabulary
2. Give the English translation
3. Give pronunciation tip
4. Ask: "Can you say that?" or "Try to repeat it!"
STOP after the question.

REACTING MODE:
1. React to what student said (praise or gentle correction)
2. Either ask them to try again OR introduce next word
STOP after one sentence.

INTERACTIVE MODE (when doing activities):
- For multiple choice: Ask the question, wait for answer, give feedback
- For flashcards: Show word, ask for meaning, provide feedback
- For translation: Ask to translate, provide hints if needed

Stay STRICTLY within this lesson's vocabulary and phrases.`,
      introMessage: "Hallo! Willkommen zu deiner ersten Deutschstunde! Bist du bereit?",
      topics: ["greetings", "introductions", "basic phrases"],
    },
  },
  {
    id: "de-a1-lesson-2",
    unitId: "de-a1-unit-1",
    title: "Zahlen 1-20",
    description: "Lerne die Zahlen von 1 bis 20",
    icon: "🔢",
    xpReward: 20,
    goals: [
      { description: "Zahlen 1-10 beherrschen", xpReward: 10 },
      { description: "Zahlen 11-20 beherrschen", xpReward: 10 },
    ],
    vocabulary: [
      { word: "eins", translation: "one", pronunciation: "ayns", emoji: "1️⃣" },
      { word: "zwei", translation: "two", pronunciation: "tsvye", emoji: "2️⃣" },
      { word: "drei", translation: "three", pronunciation: "dry", emoji: "3️⃣" },
      { word: "vier", translation: "four", pronunciation: "feer", emoji: "4️⃣" },
      { word: "fünf", translation: "five", pronunciation: "fuenf", emoji: "5️⃣" },
      { word: "sechs", translation: "six", pronunciation: "zex", emoji: "6️⃣" },
      { word: "sieben", translation: "seven", pronunciation: "ZEE-ben", emoji: "7️⃣" },
      { word: "acht", translation: "eight", pronunciation: "ahkt", emoji: "8️⃣" },
      { word: "neun", translation: "nine", pronunciation: "noyn", emoji: "9️⃣" },
      { word: "zehn", translation: "ten", pronunciation: "tsayn", emoji: "🔟" },
    ],
    phrases: [
      {
        text: "Wie alt bist du?",
        translation: "How old are you?",
        pronunciation: "Vee ahlt bist doo?",
      },
      {
        text: "Ich bin zwanzig Jahre alt.",
        translation: "I am twenty years old.",
        pronunciation: "Ikh bin TSVAN-tsikh YAH-re ahlt.",
      },
    ],
    activities: [
      {
        id: "de-a1-2-act-1",
        type: "multiple-choice",
        question: "Was ist 'five' auf Deutsch?",
        correctAnswer: "fünf",
        options: ["vier", "fünf", "sechs", "drei"],
        hint: "Es kommt nach vier",
      },
      {
        id: "de-a1-2-act-2",
        type: "flashcard",
        question: "Was bedeutet 'sieben'?",
        correctAnswer: "seven",
        options: ["six", "seven", "eight", "nine"],
        hint: "Es ist eine Zahl zwischen 6 und 8",
      },
      {
        id: "de-a1-2-act-3",
        type: "listen",
        question: "Höre und wiederhole: 'Ich bin acht Jahre alt'",
        correctAnswer: "Ich bin acht Jahre alt",
        hint: "Sage dein Alter",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A1 - Numbers 1-20.
Current lesson vocabulary: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn
Current lesson phrases: Wie alt bist du? / Ich bin zwanzig Jahre alt.

TEACHING MODE:
1. Say ONE German number from the lesson
2. Give the English translation
3. Give pronunciation tip
4. Ask: "Can you count to [number]?" or "Say the number!"
STOP after the question.

REACTING MODE:
1. React to student's pronunciation
2. Either correct gently or praise
3. Move to next number or practice counting
STOP after one sentence.

INTERACTIVE MODE:
- For multiple choice: Test number recognition
- For flashcards: Show German number, ask for English
- For listening: Say number, ask student to repeat

Stay STRICTLY within numbers 1-20.`,
      introMessage: "Hallo! Heute lernen wir Zahlen! Kannst du bis zehn zählen?",
      topics: ["numbers", "counting", "age"],
    },
  },
];

// German A2 - Elementary
export const GERMAN_A2_LESSONS: Lesson[] = [
  {
    id: "de-a2-lesson-1",
    unitId: "de-a2-unit-1",
    title: "Im Restaurant",
    description: "Bestelle Essen und Getränke im Restaurant",
    icon: "🍽️",
    xpReward: 25,
    goals: [
      { description: "Essen bestellen können", xpReward: 15 },
      { description: "Nach der Rechnung fragen", xpReward: 10 },
    ],
    vocabulary: [
      { word: "die Speisekarte", translation: "menu", pronunciation: "dee SHPEYE-zuh-kar-tuh", emoji: "📖" },
      { word: "bestellen", translation: "to order", pronunciation: "buh-SHTEL-en", emoji: "📝" },
      { word: "der Kellner", translation: "waiter", pronunciation: "dair KEL-ner", emoji: "👨‍🍳" },
      { word: "die Rechnung", translation: "bill/check", pronunciation: "dee REKH-noong", emoji: "💰" },
      { word: "lecker", translation: "delicious", pronunciation: "LEK-er", emoji: "😋" },
      { word: "Ich hätte gern", translation: "I would like", pronunciation: "ikh HET-uh gairn", emoji: "🙋" },
    ],
    phrases: [
      {
        text: "Ich hätte gern ein Wasser, bitte.",
        translation: "I would like a water, please.",
        pronunciation: "Ikh HET-uh gairn ayn VAH-ser, BIT-uh.",
      },
      {
        text: "Die Speisekarte, bitte.",
        translation: "The menu, please.",
        pronunciation: "Dee SHPEYE-zuh-kar-tuh, BIT-uh.",
      },
      {
        text: "Die Rechnung, bitte.",
        translation: "The bill, please.",
        pronunciation: "Dee REKH-noong, BIT-uh.",
      },
    ],
    activities: [
      {
        id: "de-a2-1-act-1",
        type: "multiple-choice",
        question: "Wie bestellt man Wasser?",
        correctAnswer: "Ich hätte gern ein Wasser",
        options: [
          "Ich will Wasser",
          "Ich hätte gern ein Wasser",
          "Gib mir Wasser",
          "Wasser jetzt",
        ],
        hint: "Benutze die höfliche Form",
      },
      {
        id: "de-a2-1-act-2",
        type: "translate",
        question: "Übersetze: 'The bill, please'",
        correctAnswer: "Die Rechnung, bitte",
        hint: "'Rechnung' bedeutet bill",
      },
      {
        id: "de-a2-1-act-3",
        type: "flashcard",
        question: "Was bedeutet 'lecker'?",
        correctAnswer: "delicious",
        options: ["expensive", "delicious", "cheap", "spicy"],
        hint: "Es beschreibt gutes Essen",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A2 - At the Restaurant.
Current lesson vocabulary: die Speisekarte, bestellen, der Kellner, die Rechnung, lecker, Ich hätte gern
Current lesson phrases: Ich hätte gern ein Wasser, bitte. / Die Speisekarte, bitte. / Die Rechnung, bitte.

TEACHING MODE:
1. Teach ONE restaurant phrase
2. Explain when to use it
3. Ask student to practice ordering something
STOP after the question.

REACTING MODE:
1. React to their order (praise politeness)
2. Correct grammar gently if needed
3. Continue with next phrase or practice
STOP after one sentence.

INTERACTIVE MODE:
- Role-play: You are the waiter, student orders food
- Test vocabulary with flashcards
- Practice polite requests

Stay STRICTLY within restaurant vocabulary.`,
      introMessage: "Willkommen im Restaurant! Ich bin dein Kellner. Was möchtest du bestellen?",
      topics: ["restaurant", "ordering", "polite requests"],
    },
  },
];

// German B1 - Intermediate
export const GERMAN_B1_LESSONS: Lesson[] = [
  {
    id: "de-b1-lesson-1",
    unitId: "de-b1-unit-1",
    title: "Reisen und Urlaub",
    description: "Sprich über Reisen und Urlaubspläne",
    icon: "✈️",
    xpReward: 30,
    goals: [
      { description: "Über vergangene Reisen sprechen", xpReward: 15 },
      { description: "Zukünftige Pläne beschreiben", xpReward: 15 },
    ],
    vocabulary: [
      { word: "die Reise", translation: "trip/journey", pronunciation: "dee REYE-zuh", emoji: "🧳" },
      { word: "der Urlaub", translation: "vacation", pronunciation: "dair OOOR-lowp", emoji: "🏖️" },
      { word: "buchen", translation: "to book", pronunciation: "BOO-khen", emoji: "📅" },
      { word: "das Flugzeug", translation: "airplane", pronunciation: "dahs FLOOK-tsoyk", emoji: "✈️" },
      { word: "das Hotel", translation: "hotel", pronunciation: "dahs ho-TEL", emoji: "🏨" },
      { word: "die Sehenswürdigkeit", translation: "sight/attraction", pronunciation: "dee ZAY-ens-voord-ish-kite", emoji: "🏛️" },
    ],
    phrases: [
      {
        text: "Ich bin letztes Jahr nach Spanien gereist.",
        translation: "I traveled to Spain last year.",
        pronunciation: "Ikh bin LET-stes Yahr nahkh SHPAH-nyen guh-REYST.",
      },
      {
        text: "Wir haben ein Hotel gebucht.",
        translation: "We booked a hotel.",
        pronunciation: "Veer HAH-ben ayn ho-TEL guh-BOKHT.",
      },
      {
        text: "Nächsten Sommer möchte ich nach Italien fahren.",
        translation: "Next summer I would like to go to Italy.",
        pronunciation: "NEKH-sten ZOM-er MERKH-te ikh nahkh ee-TAHL-yen FAH-ren.",
      },
    ],
    activities: [
      {
        id: "de-b1-1-act-1",
        type: "multiple-choice",
        question: "Welche Vergangenheitsform ist korrekt?",
        correctAnswer: "Ich bin gereist",
        options: [
          "Ich habe gereist",
          "Ich bin gereist",
          "Ich reiste",
          "Ich war gereist",
        ],
        hint: "Reisen benutzt 'sein' im Perfekt",
      },
      {
        id: "de-b1-1-act-2",
        type: "translate",
        question: "Übersetze: 'We booked a hotel'",
        correctAnswer: "Wir haben ein Hotel gebucht",
        hint: "Perfekt mit 'haben'",
      },
      {
        id: "de-b1-1-act-3",
        type: "flashcard",
        question: "Was ist 'die Sehenswürdigkeit'?",
        correctAnswer: "sight/attraction",
        options: ["airport", "sight/attraction", "train station", "beach"],
        hint: "Touristische Orte",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B1 - Travel and Vacation.
Current lesson vocabulary: die Reise, der Urlaub, buchen, das Flugzeug, das Hotel, die Sehenswürdigkeit
Current lesson phrases: Ich bin letztes Jahr nach Spanien gereist. / Wir haben ein Hotel gebucht. / Nächsten Sommer möchte ich nach Italien fahren.

TEACHING MODE:
1. Teach travel vocabulary with example sentence
2. Explain grammar (Perfekt with sein/haben)
3. Ask student about their travel experiences
STOP after the question.

REACTING MODE:
1. React to their travel story
2. Correct verb forms gently
3. Ask follow-up questions about their trip
STOP after one sentence.

INTERACTIVE MODE:
- Ask about past trips (Perfekt practice)
- Discuss future plans (möchten + infinitive)
- Vocabulary flashcards

Stay STRICTLY within travel vocabulary.`,
      introMessage: "Hallo! Erzähl mir von deinem letzten Urlaub! Wo warst du?",
      topics: ["travel", "past tense", "future plans"],
    },
  },
];

// German B2 - Upper Intermediate
export const GERMAN_B2_LESSONS: Lesson[] = [
  {
    id: "de-b2-lesson-1",
    unitId: "de-b2-unit-1",
    title: "Beruf und Karriere",
    description: "Sprich über Berufserfahrung und Karriereziele",
    icon: "💼",
    xpReward: 35,
    goals: [
      { description: "Berufserfahrung beschreiben", xpReward: 20 },
      { description: "In Bewerbungsgesprächen sprechen", xpReward: 15 },
    ],
    vocabulary: [
      { word: "die Erfahrung", translation: "experience", pronunciation: "dee air-FAH-roong", emoji: "📊" },
      { word: "die Bewerbung", translation: "application", pronunciation: "dee buh-VER-boong", emoji: "📄" },
      { word: "das Vorstellungsgespräch", translation: "job interview", pronunciation: "dahs FOR-shtel-oongs-guh-shprekh", emoji: "🤝" },
      { word: "die Karriere", translation: "career", pronunciation: "dee ka-REE-uh", emoji: "📈" },
      { word: "sich bewerben", translation: "to apply", pronunciation: "zikh buh-VER-ben", emoji: "✉️" },
      { word: "die Fähigkeit", translation: "skill/ability", pronunciation: "dee FAY-ig-kite", emoji: "💪" },
    ],
    phrases: [
      {
        text: "Ich habe fünf Jahre Erfahrung im Marketing.",
        translation: "I have five years of experience in marketing.",
        pronunciation: "Ikh HAH-buh FOONF YAH-re air-FAH-roong im MAR-ke-ting.",
      },
      {
        text: "Ich bewerbe mich um die Stelle als Manager.",
        translation: "I am applying for the position as manager.",
        pronunciation: "Ikh buh-VER-buh mikh oom dee SHTEL-uh ahls MAH-nay-jer.",
      },
      {
        text: "Meine Stärken sind Teamarbeit und Kommunikation.",
        translation: "My strengths are teamwork and communication.",
        pronunciation: "MEYE-nuh SHTER-ken zint TEEM-ar-bite oont ko-moo-nee-ka-TSYOHN.",
      },
    ],
    activities: [
      {
        id: "de-b2-1-act-1",
        type: "multiple-choice",
        question: "Wie sagt man 'I am applying for the job'?",
        correctAnswer: "Ich bewerbe mich um die Stelle",
        options: [
          "Ich apply für den Job",
          "Ich bewerbe mich um die Stelle",
          "Ich will den Job haben",
          "Ich nehme die Stelle",
        ],
        hint: "Reflexives Verb 'sich bewerben'",
      },
      {
        id: "de-b2-1-act-2",
        type: "translate",
        question: "Übersetze: 'My strengths are teamwork'",
        correctAnswer: "Meine Stärken sind Teamarbeit",
        hint: "'Stärken' = strengths",
      },
      {
        id: "de-b2-1-act-3",
        type: "flashcard",
        question: "Was ist 'das Vorstellungsgespräch'?",
        correctAnswer: "job interview",
        options: ["meeting", "job interview", "presentation", "conference"],
        hint: "Wenn man sich für einen Job bewirbt",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B2 - Career and Profession.
Current lesson vocabulary: die Erfahrung, die Bewerbung, das Vorstellungsgespräch, die Karriere, sich bewerben, die Fähigkeit
Current lesson phrases: Ich habe fünf Jahre Erfahrung im Marketing. / Ich bewerbe mich um die Stelle als Manager. / Meine Stärken sind Teamarbeit und Kommunikation.

TEACHING MODE:
1. Teach professional vocabulary
2. Explain formal language usage
3. Practice job interview phrases
STOP after the question.

REACTING MODE:
1. React to their career description
2. Correct formal/informal usage
3. Ask about their professional goals
STOP after one sentence.

INTERACTIVE MODE:
- Mock job interview practice
- Vocabulary flashcards
- Translate professional phrases

Stay STRICTLY within career vocabulary.`,
      introMessage: "Guten Tag! Willkommen zum Vorstellungsgespräch. Erzählen Sie mir von Ihrer Berufserfahrung.",
      topics: ["career", "job interviews", "professional language"],
    },
  },
];

// German C1 - Advanced
export const GERMAN_C1_LESSONS: Lesson[] = [
  {
    id: "de-c1-lesson-1",
    unitId: "de-c1-unit-1",
    title: "Aktuelle Ereignisse diskutieren",
    description: "Diskutiere komplexe Themen und aktuelle Ereignisse",
    icon: "📰",
    xpReward: 40,
    goals: [
      { description: "Komplexe Meinungen ausdrücken", xpReward: 20 },
      { description: "Argumente strukturiert präsentieren", xpReward: 20 },
    ],
    vocabulary: [
      { word: "die Debatte", translation: "debate", pronunciation: "dee deh-BAH-tuh", emoji: "🗣️" },
      { word: "kontrovers", translation: "controversial", pronunciation: "kon-tro-VERS", emoji: "⚖️" },
      { word: "befürworten", translation: "to support/advocate", pronunciation: "buh-FUUR-vor-ten", emoji: "👍" },
      { word: "ablehnen", translation: "to reject", pronunciation: "AP-lay-nen", emoji: "👎" },
      { word: "die Perspektive", translation: "perspective", pronunciation: "dee per-spek-TEE-vuh", emoji: "👁️" },
      { word: "argumentieren", translation: "to argue/reason", pronunciation: "ar-goo-men-TEE-ren", emoji: "💭" },
    ],
    phrases: [
      {
        text: "Meiner Meinung nach ist das ein kontroverses Thema.",
        translation: "In my opinion, this is a controversial topic.",
        pronunciation: "MEYE-ner MEYE-noong nakh ist dahs ayn kon-tro-VER-zes TOH-mah.",
      },
      {
        text: "Ich befürworte diese Maßnahme, weil sie notwendig ist.",
        translation: "I support this measure because it is necessary.",
        pronunciation: "Ikh buh-FUUR-vor-te DEE-zuh MAHS-nah-me, vail zee NOT-ven-dikh ist.",
      },
      {
        text: "Aus meiner Perspektive gibt es sowohl Vor- als auch Nachteile.",
        translation: "From my perspective, there are both advantages and disadvantages.",
        pronunciation: "Ows MEYE-ner per-spek-TEE-vuh gibt es ZOH-vohl for- ahlss owkh NAHkh-tail-uh.",
      },
    ],
    activities: [
      {
        id: "de-c1-1-act-1",
        type: "multiple-choice",
        question: "Welcher Ausdruck zeigt Unterstützung?",
        correctAnswer: "Ich befürworte",
        options: [
          "Ich lehne ab",
          "Ich befürworte",
          "Ich ignoriere",
          "Ich kritisiere",
        ],
        hint: "Positives Verb für Unterstützung",
      },
      {
        id: "de-c1-1-act-2",
        type: "translate",
        question: "Übersetze: 'In my opinion'",
        correctAnswer: "Meiner Meinung nach",
        hint: "Formelle Meinungsäußerung",
      },
      {
        id: "de-c1-1-act-3",
        type: "flashcard",
        question: "Was bedeutet 'kontrovers'?",
        correctAnswer: "controversial",
        options: ["simple", "controversial", "boring", "easy"],
        hint: "Thema mit verschiedenen Meinungen",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German C1 - Discussing Current Events.
Current lesson vocabulary: die Debatte, kontrovers, befürworten, ablehnen, die Perspektive, argumentieren
Current lesson phrases: Meiner Meinung nach ist das ein kontroverses Thema. / Ich befürworte diese Maßnahme, weil sie notwendig ist. / Aus meiner Perspektive gibt es sowohl Vor- als auch Nachteile.

TEACHING MODE:
1. Introduce advanced vocabulary for debates
2. Teach complex sentence structures
3. Practice expressing nuanced opinions
STOP after the question.

REACTING MODE:
1. Engage with their argument
2. Challenge their perspective respectfully
3. Ask for counterarguments
STOP after one sentence.

INTERACTIVE MODE:
- Debate current topics
- Practice argumentation
- Vocabulary flashcards

Stay STRICTLY within debate and discussion vocabulary.`,
      introMessage: "Willkommen! Heute diskutieren wir ein aktuelles Thema. Bist du bereit zu argumentieren?",
      topics: ["debate", "current events", "argumentation", "complex opinions"],
    },
  },
];

// Combine all German lessons
export const ALL_GERMAN_LESSONS: Lesson[] = [
  ...GERMAN_A1_LESSONS,
  ...GERMAN_A2_LESSONS,
  ...GERMAN_B1_LESSONS,
  ...GERMAN_B2_LESSONS,
  ...GERMAN_C1_LESSONS,
];
