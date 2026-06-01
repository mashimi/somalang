import { Lesson } from "@/types/learning";

// ============ A1 - BEGINNER (5 Lessons) ============
export const GERMAN_A1_LESSONS: Lesson[] = [
  {
    id: "de-a1-lesson-1",
    unitId: "de-a1-unit-1",
    title: "Begrüßungen & Vorstellung",
    description: "Lerne grundlegende Begrüßungen und wie du dich vorstellst",
    icon: "👋",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 8,
    goals: [
      { description: "Grundlegende Begrüßungen beherrschen", xpReward: 10 },
      { description: "Dich selbst vorstellen können", xpReward: 10 },
    ],
    vocabulary: [
      { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh", emoji: "👋", example: "Hallo! Wie geht's?" },
      { word: "Guten Morgen", translation: "Good morning", pronunciation: "GOO-ten MOR-gen", emoji: "🌅", example: "Guten Morgen! Ich heiße Anna." },
      { word: "Guten Tag", translation: "Good day", pronunciation: "GOO-ten TAHK", emoji: "☀️", example: "Guten Tag, Herr Müller." },
      { word: "Guten Abend", translation: "Good evening", pronunciation: "GOO-ten AH-bent", emoji: "🌆", example: "Guten Abend!" },
      { word: "Auf Wiedersehen", translation: "Goodbye", pronunciation: "owf VEE-der-zay-en", emoji: "👋", example: "Auf Wiedersehen! Bis morgen." },
      { word: "Tschüss", translation: "Bye", pronunciation: "choos", emoji: "👋" },
      { word: "Ich heiße", translation: "My name is", pronunciation: "ikh HY-suh", emoji: "📛", example: "Ich heiße Maria." },
      { word: "Wie heißt du?", translation: "What's your name?", pronunciation: "vee heyst doo", emoji: "❓" },
    ],
    phrases: [
      { text: "Hallo! Ich heiße Anna.", translation: "Hello! My name is Anna.", pronunciation: "HAH-loh! ikh HY-suh AH-nah." },
      { text: "Wie heißt du?", translation: "What's your name?", pronunciation: "Vee heyst doo?" },
      { text: "Freut mich!", translation: "Nice to meet you!", pronunciation: "Froyt mikh!" },
      { text: "Woher kommst du?", translation: "Where are you from?", pronunciation: "VOH-hair komst doo?" },
    ],
    grammar: {
      topic: "Personal Pronouns (ich, du, er/sie/es)",
      explanation: "German uses different pronouns for I, you, he/she/it",
      examples: [
        "Ich bin Student. (I am a student)",
        "Du bist nett. (You are nice)",
        "Er ist Lehrer. (He is a teacher)",
      ],
      commonMistakes: ["Don't confuse 'du' (informal) with 'Sie' (formal)"],
    },
    activities: [
      {
        id: "de-a1-1-act-1",
        type: "multiple-choice",
        question: "Wie sagt man 'Hello' auf Deutsch?",
        correctAnswer: "Hallo",
        options: ["Tschüss", "Hallo", "Danke", "Bitte"],
        hint: "Es ist eine Begrüßung",
        explanation: "'Hallo' is the most common greeting in German",
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
        type: "flashcard",
        question: "Was bedeutet 'Auf Wiedersehen'?",
        correctAnswer: "Goodbye",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        hint: "Man sagt es beim Abschied",
        front: "Auf Wiedersehen",
        back: "Goodbye",
        example: "Auf Wiedersehen! Bis morgen.",
      },
      {
        id: "de-a1-1-act-4",
        type: "match",
        instruction: "Verbinde die Begrüßung mit der Bedeutung",
        pairs: [
          { id: "1", left: "Hallo", right: "Hello" },
          { id: "2", left: "Guten Tag", right: "Good day" },
          { id: "3", left: "Auf Wiedersehen", right: "Goodbye" },
          { id: "4", left: "Wie heißt du?", right: "What's your name?" },
        ],
        shuffle: true,
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
      fallbackResponses: ["Versuche es nochmal!", "Fast richtig!", "Sehr gut!"],
    },
  },
  {
    id: "de-a1-lesson-2",
    unitId: "de-a1-unit-1",
    title: "Zahlen 1-20",
    description: "Lerne die Zahlen von 1 bis 20",
    icon: "🔢",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 10,
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
      { text: "Wie alt bist du?", translation: "How old are you?", pronunciation: "Vee ahlt bist doo?" },
      { text: "Ich bin zehn Jahre alt.", translation: "I am ten years old.", pronunciation: "Ikh bin tsayn YAH-re ahlt." },
    ],
    grammar: {
      topic: "Numbers 1-20",
      explanation: "Numbers 1-12 are unique words. 13-19 are formed with number + zehn (e.g., drei + zehn = dreizehn)",
      examples: [
        "eins, zwei, drei, vier, fünf (1-5)",
        "sechs, sieben, acht, neun, zehn (6-10)",
      ],
      commonMistakes: ["'sechs' is pronounced 'zex', not 'seks'"],
    },
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
        front: "sieben",
        back: "seven",
      },
      {
        id: "de-a1-2-act-3",
        type: "order-sentence",
        instruction: "Ordne die Wörter zu einem Satz",
        correctOrder: ["Ich", "bin", "zehn", "Jahre", "alt"],
        scrambled: ["alt", "Ich", "Jahre", "zehn", "bin"],
        hint: "Beginne mit 'Ich'",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A1 - Numbers 1-20.
Current lesson vocabulary: eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun, zehn
Current lesson phrases: Wie alt bist du? / Ich bin zehn Jahre alt.

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

Stay STRICTLY within numbers 1-20.`,
      introMessage: "Hallo! Heute lernen wir Zahlen! Kannst du bis zehn zählen?",
      topics: ["numbers", "counting", "age"],
      fallbackResponses: ["Zähl nochmal!", "Fast!", "Perfekt gezählt!"],
    },
  },
  {
    id: "de-a1-lesson-3",
    unitId: "de-a1-unit-1",
    title: "Farben & Gegenstände",
    description: "Lerne Farben und alltägliche Gegenstände",
    icon: "🎨",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [
      { description: "Farben auf Deutsch erkennen", xpReward: 12 },
      { description: "Alltagsgegenstände benennen", xpReward: 13 },
    ],
    vocabulary: [
      { word: "rot", translation: "red", pronunciation: "roht", emoji: "🟥" },
      { word: "blau", translation: "blue", pronunciation: "blow", emoji: "🟦" },
      { word: "grün", translation: "green", pronunciation: "groon", emoji: "🟩" },
      { word: "gelb", translation: "yellow", pronunciation: "gelp", emoji: "🟨" },
      { word: "schwarz", translation: "black", pronunciation: "shvarts", emoji: "⬛" },
      { word: "weiß", translation: "white", pronunciation: "vyss", emoji: "⬜" },
      { word: "das Buch", translation: "the book", pronunciation: "dahs BOOKH", emoji: "📖" },
      { word: "der Stift", translation: "the pen", pronunciation: "dair SHTIFT", emoji: "🖊️" },
      { word: "der Tisch", translation: "the table", pronunciation: "dair TISH", emoji: "🪑" },
    ],
    phrases: [
      { text: "Das Buch ist rot.", translation: "The book is red.", pronunciation: "Dahs BOOKH ist roht." },
      { text: "Der Tisch ist braun.", translation: "The table is brown.", pronunciation: "Dair TISH ist brown." },
    ],
    grammar: {
      topic: "Articles (der, die, das)",
      explanation: "German nouns have gender: masculine (der), feminine (die), neuter (das)",
      examples: [
        "der Tisch (masculine)",
        "die Lampe (feminine)",
        "das Buch (neuter)",
      ],
      commonMistakes: ["Learn each noun with its article from the start!"],
    },
    activities: [
      {
        id: "de-a1-3-act-1",
        type: "match",
        instruction: "Verbinde den Gegenstand mit dem Artikel",
        pairs: [
          { id: "1", left: "Tisch", right: "der" },
          { id: "2", left: "Lampe", right: "die" },
          { id: "3", left: "Buch", right: "das" },
          { id: "4", left: "Stuhl", right: "der" },
        ],
      },
      {
        id: "de-a1-3-act-2",
        type: "fill-blank",
        sentence: "Das ist ___ rotes Buch.",
        blank: "___",
        correctAnswer: "ein",
        options: ["ein", "eine", "einen", "einem"],
        hint: "Buch ist neutral (das)",
      },
      {
        id: "de-a1-3-act-3",
        type: "multiple-choice",
        question: "Welche Farbe hat die Sonne?",
        correctAnswer: "gelb",
        options: ["blau", "grün", "gelb", "rot"],
        hint: "Die Sonne ist yellow",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A1 - Colors & Objects.
Current lesson vocabulary: rot, blau, grün, gelb, schwarz, weiß, das Buch, der Stift, der Tisch
Current lesson phrases: Das Buch ist rot. / Der Tisch ist braun.

TEACHING MODE:
1. Teach ONE color or object word
2. Show the article (der/die/das)
3. Ask student to identify objects by color
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Schau mal! Welche Farben siehst du?",
      topics: ["colors", "objects", "articles"],
      fallbackResponses: ["Schöne Farbe!", "Richtig, das ist der Tisch!", "Fast - denk an den Artikel!"],
    },
  },
  {
    id: "de-a1-lesson-4",
    unitId: "de-a1-unit-1",
    title: "Familie & Personen",
    description: "Lerne Wörter über Familie und Menschen",
    icon: "👨‍👩‍👧‍👦",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [
      { description: "Familienmitglieder benennen", xpReward: 12 },
      { description: "Über Familie sprechen", xpReward: 13 },
    ],
    vocabulary: [
      { word: "die Mutter", translation: "mother", pronunciation: "dee MOO-ter", emoji: "👩" },
      { word: "der Vater", translation: "father", pronunciation: "dair FAH-ter", emoji: "👨" },
      { word: "die Schwester", translation: "sister", pronunciation: "dee SHVES-ter", emoji: "👧" },
      { word: "der Bruder", translation: "brother", pronunciation: "dair BROO-der", emoji: "👦" },
      { word: "die Großmutter", translation: "grandmother", pronunciation: "dee GROHS-moo-ter", emoji: "👵" },
      { word: "der Großvater", translation: "grandfather", pronunciation: "dair GROHS-fah-ter", emoji: "👴" },
      { word: "die Familie", translation: "family", pronunciation: "dee fah-MEE-lyeh", emoji: "👨‍👩‍👧‍👦" },
    ],
    phrases: [
      { text: "Das ist meine Mutter.", translation: "This is my mother.", pronunciation: "Dahs ist MEYE-nuh MOO-ter." },
      { text: "Ich habe eine Schwester.", translation: "I have a sister.", pronunciation: "Ikh HAH-buh EYE-nuh SHVES-ter." },
    ],
    activities: [
      {
        id: "de-a1-4-act-1",
        type: "dialogue",
        context: "Du triffst einen neuen Freund und sprichst über Familie",
        lines: [
          { speaker: "ai", text: "Hallo! Wie heißt du?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ich heiße Max", "Ich bin Student", "Ich komme aus Tansania"], correctAnswer: "Ich heiße Max" },
          { speaker: "ai", text: "Freut mich, Max! Hast du Geschwister?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ich habe eine Schwester", "Nein, ich bin allein", "Ich habe einen Hund"], correctAnswer: "Ja, ich habe eine Schwester" },
          { speaker: "ai", text: "Wie heißt deine Schwester?" },
        ],
      },
      {
        id: "de-a1-4-act-2",
        type: "multiple-choice",
        question: "Was bedeutet 'die Schwester'?",
        correctAnswer: "sister",
        options: ["mother", "sister", "daughter", "aunt"],
        hint: "Weibliches Geschwisterkind",
      },
      {
        id: "de-a1-4-act-3",
        type: "translate",
        question: "Übersetze: 'I have a brother'",
        correctAnswer: "Ich habe einen Bruder",
        hint: "'einen' für maskulin Akkusativ",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A1 - Family & People.
Current lesson vocabulary: die Mutter, der Vater, die Schwester, der Bruder, die Großmutter, der Großvater, die Familie
Current lesson phrases: Das ist meine Mutter. / Ich habe eine Schwester.

TEACHING MODE:
1. Teach ONE family member word
2. Show the article (der/die)
3. Ask: "Wer ist das in deiner Familie?"
STOP after the question.

Stay STRICTLY within family vocabulary.`,
      introMessage: "Erzähl mir von deiner Familie! Hast du Geschwister?",
      topics: ["family", "people", "possessives"],
      fallbackResponses: ["Interessant!", "Erzähl mehr!", "Sehr schön!"],
    },
  },
  {
    id: "de-a1-lesson-5",
    unitId: "de-a1-unit-1",
    title: "Einfache Sätze bilden",
    description: "Lerne, einfache Sätze auf Deutsch zu bilden",
    icon: "📝",
    level: "A1",
    xpReward: 30,
    estimatedMinutes: 15,
    goals: [
      { description: "Satzstruktur verstehen", xpReward: 15 },
      { description: "Einfache Sätze schreiben", xpReward: 15 },
    ],
    vocabulary: [
      { word: "und", translation: "and", pronunciation: "oont", emoji: "➕" },
      { word: "aber", translation: "but", pronunciation: "AH-ber", emoji: "🔄" },
      { word: "oder", translation: "or", pronunciation: "OH-der", emoji: "🔀" },
      { word: "nicht", translation: "not", pronunciation: "nisht", emoji: "🚫" },
      { word: "auch", translation: "also/too", pronunciation: "owkh", emoji: "➕" },
    ],
    phrases: [
      { text: "Ich lerne Deutsch.", translation: "I learn German.", pronunciation: "Ikh LER-nuh DOYTSH." },
      { text: "Er spricht gut Deutsch.", translation: "He speaks German well.", pronunciation: "Ayr shprikht goot DOYTSH." },
    ],
    grammar: {
      topic: "Basic Sentence Structure (SVO)",
      explanation: "German basic word order: Subject-Verb-Object, like English",
      examples: [
        "Ich lerne Deutsch. (I learn German)",
        "Du sprichst gut. (You speak well)",
        "Er ist nett. (He is nice)",
      ],
      commonMistakes: ["Verb always in second position in main clauses"],
    },
    activities: [
      {
        id: "de-a1-5-act-1",
        type: "order-sentence",
        instruction: "Ordne die Wörter zu einem korrekten Satz",
        correctOrder: ["Ich", "lerne", "Deutsch"],
        scrambled: ["Deutsch", "Ich", "lerne"],
        hint: "Das Verb kommt an Position 2",
      },
      {
        id: "de-a1-5-act-2",
        type: "grammar-drill",
        rule: "Das Verb steht an zweiter Position im Satz",
        examples: ["Ich lerne Deutsch.", "Heute lerne ich Deutsch (Heute is at position 1)"],
        exercises: [
          {
            prompt: "___ (lernen) ich Deutsch.",
            correctAnswer: "Lerne",
            hint: "Verb an Position 2",
          },
        ],
      },
      {
        id: "de-a1-5-act-3",
        type: "translate",
        question: "Übersetze: 'I also learn German'",
        correctAnswer: "Ich lerne auch Deutsch",
        hint: "'auch' kommt nach dem Verb",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A1 - Basic Sentence Structure.
Current lesson vocabulary: und, aber, oder, nicht, auch
Current lesson phrases: Ich lerne Deutsch. / Er spricht gut Deutsch.

TEACHING MODE:
1. Teach basic SVO word order
2. Show how 'und'/'aber'/'oder' connect ideas
3. Ask student to build a sentence
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Lass uns Sätze bauen! Das Verb kommt immer an zweiter Stelle.",
      topics: ["sentence structure", "word order", "conjunctions"],
      fallbackResponses: ["Gut versucht!", "Denk an die Verb-Position!", "Perfekt gebaut!"],
    },
  },
];

// ============ A2 - ELEMENTARY (4 Lessons) ============
export const GERMAN_A2_LESSONS: Lesson[] = [
  {
    id: "de-a2-lesson-1",
    unitId: "de-a2-unit-1",
    title: "Im Restaurant",
    description: "Bestelle Essen und Getränke im Restaurant",
    icon: "🍽️",
    level: "A2",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [
      { description: "Essen bestellen können", xpReward: 15 },
      { description: "Nach der Rechnung fragen", xpReward: 10 },
    ],
    vocabulary: [
      { word: "die Speisekarte", translation: "menu", pronunciation: "dee SHPEYE-zuh-kar-tuh", emoji: "📖", example: "Kann ich die Speisekarte haben?" },
      { word: "bestellen", translation: "to order", pronunciation: "buh-SHTEL-en", emoji: "📝", example: "Ich möchte bestellen." },
      { word: "der Kellner", translation: "waiter", pronunciation: "dair KEL-ner", emoji: "👨‍🍳" },
      { word: "die Rechnung", translation: "bill/check", pronunciation: "dee REKH-noong", emoji: "💰", example: "Die Rechnung, bitte." },
      { word: "lecker", translation: "delicious", pronunciation: "LEK-er", emoji: "😋", example: "Das Essen ist lecker!" },
      { word: "Ich hätte gern", translation: "I would like", pronunciation: "ikh HET-uh gairn", emoji: "🙋" },
    ],
    phrases: [
      { text: "Ich hätte gern ein Wasser, bitte.", translation: "I would like a water, please.", pronunciation: "Ikh HET-uh gairn ayn VAH-ser, BIT-uh." },
      { text: "Die Speisekarte, bitte.", translation: "The menu, please.", pronunciation: "Dee SHPEYE-zuh-kar-tuh, BIT-uh." },
      { text: "Die Rechnung, bitte.", translation: "The bill, please.", pronunciation: "Dee REKH-noong, BIT-uh." },
    ],
    grammar: {
      topic: "Modal Verbs: möchten (would like)",
      explanation: "'möchten' is used to politely express what you want. It's the subjunctive form of 'mögen'",
      examples: [
        "Ich möchte ein Wasser. (I would like a water)",
        "Möchten Sie bestellen? (Would you like to order?)",
        "Er möchte zahlen. (He would like to pay)",
      ],
    },
    culturalNote: {
      title: "Restaurant Etiquette in Germany",
      content: "In Germany, it's polite to say 'Prost!' before drinking. Wait for the bill - it's not brought automatically.",
    },
    activities: [
      {
        id: "de-a2-1-act-1",
        type: "multiple-choice",
        question: "Wie bestellt man höflich ein Wasser?",
        correctAnswer: "Ich möchte ein Wasser, bitte",
        options: [
          "Ich will Wasser",
          "Ich möchte ein Wasser, bitte",
          "Gib mir Wasser",
          "Wasser jetzt",
        ],
        hint: "Benutze die höfliche Form mit 'möchte'",
        explanation: "'möchte' is more polite than 'will'",
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
        type: "dialogue",
        context: "Du bist im Restaurant und möchtest bestellen",
        lines: [
          { speaker: "ai", text: "Guten Abend! Haben Sie schon gewählt?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ich hätte gern die Suppe", "Nein, ich gehe", "Das ist teuer"], correctAnswer: "Ja, ich hätte gern die Suppe" },
          { speaker: "ai", text: "Sehr gerne. Möchten Sie etwas zu trinken?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ein Wasser, bitte", "Nein, danke", "Ich bin satt"], correctAnswer: "Ja, ein Wasser, bitte" },
          { speaker: "ai", text: "Kommt sofort!" },
        ],
      },
      {
        id: "de-a2-1-act-4",
        type: "flashcard",
        question: "Was bedeutet 'lecker'?",
        correctAnswer: "delicious",
        options: ["expensive", "delicious", "cheap", "spicy"],
        hint: "Es beschreibt gutes Essen",
        front: "lecker",
        back: "delicious",
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
3. Continue with next phrase or practice with dialogue
STOP after one sentence.

Stay STRICTLY within restaurant vocabulary.`,
      introMessage: "Willkommen im Restaurant! Ich bin dein Kellner. Was möchtest du bestellen?",
      topics: ["restaurant", "ordering", "polite requests", "dialogue"],
      fallbackResponses: ["Sehr höflich!", "Fast perfekt!", "Ausgezeichnet!"],
    },
  },
  {
    id: "de-a2-lesson-2",
    unitId: "de-a2-unit-1",
    title: "Einkaufen & Preise",
    description: "Lerne, auf dem Markt und im Geschäft zu sprechen",
    icon: "🛒",
    level: "A2",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [
      { description: "Nach Preisen fragen", xpReward: 12 },
      { description: "Einkaufsgespräche führen", xpReward: 13 },
    ],
    vocabulary: [
      { word: "der Markt", translation: "market", pronunciation: "dair MARKT", emoji: "🏪" },
      { word: "kaufen", translation: "to buy", pronunciation: "KOW-fen", emoji: "🛍️" },
      { word: "teuer", translation: "expensive", pronunciation: "TOY-er", emoji: "💰" },
      { word: "billig", translation: "cheap", pronunciation: "BILL-ikh", emoji: "🏷️" },
      { word: "Wie viel kostet das?", translation: "How much does this cost?", pronunciation: "vee feel KOS-tet dahs", emoji: "❓" },
      { word: "das Geld", translation: "money", pronunciation: "dahs GELT", emoji: "💵" },
    ],
    phrases: [
      { text: "Wie viel kostet dieser Apfel?", translation: "How much does this apple cost?", pronunciation: "Vee feel KOS-tet DEE-zer AP-fel?" },
      { text: "Das ist aber teuer!", translation: "That's expensive!", pronunciation: "Dahs ist ah-ber TOY-er!" },
    ],
    activities: [
      {
        id: "de-a2-2-act-1",
        type: "multiple-choice",
        question: "Was bedeutet 'teuer'?",
        correctAnswer: "expensive",
        options: ["cheap", "expensive", "free", "on sale"],
        hint: "Das Gegenteil von billig",
      },
      {
        id: "de-a2-2-act-2",
        type: "translate",
        question: "Übersetze: 'How much does this cost?'",
        correctAnswer: "Wie viel kostet das?",
        hint: "Frage nach dem Preis",
      },
      {
        id: "de-a2-2-act-3",
        type: "dialogue",
        context: "Du bist auf dem Markt und kaufst Obst",
        lines: [
          { speaker: "ai", text: "Guten Morgen! Kann ich dir helfen?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, wie viel kosten diese Äpfel?", "Nein, danke", "Ich mag Bananen"], correctAnswer: "Ja, wie viel kosten diese Äpfel?" },
          { speaker: "ai", text: "Drei Euro pro Kilo. Möchtest du?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ich möchte ein Kilo, bitte", "Das ist teuer", "Ich habe kein Geld"], correctAnswer: "Ja, ich möchte ein Kilo, bitte" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A2 - Shopping & Prices.
Current lesson vocabulary: der Markt, kaufen, teuer, billig, Wie viel kostet das?, das Geld
Current lesson phrases: Wie viel kostet dieser Apfel? / Das ist aber teuer!

TEACHING MODE:
1. Teach ONE shopping phrase
2. Practice numbers with prices
3. Role-play a shopping scenario
STOP after the question.

Stay STRICTLY within shopping vocabulary.`,
      introMessage: "Willkommen auf dem Markt! Was möchtest du kaufen?",
      topics: ["shopping", "prices", "numbers", "currency"],
      fallbackResponses: ["Guter Preis!", "Versuche zu verhandeln!", "Perfekt gefragt!"],
    },
  },
  {
    id: "de-a2-lesson-3",
    unitId: "de-a2-unit-1",
    title: "Tagesablauf & Uhrzeit",
    description: "Sprich über deine tägliche Routine und die Uhrzeit",
    icon: "⏰",
    level: "A2",
    xpReward: 30,
    estimatedMinutes: 12,
    goals: [
      { description: "Uhrzeit verstehen und sagen", xpReward: 15 },
      { description: "Tagesablauf beschreiben", xpReward: 15 },
    ],
    vocabulary: [
      { word: "aufstehen", translation: "to get up", pronunciation: "OWF-shtay-en", emoji: "🛏️", example: "Ich stehe um 7 Uhr auf." },
      { word: "frühstücken", translation: "to have breakfast", pronunciation: "FRUE-shtue-ken", emoji: "🥐" },
      { word: "arbeiten", translation: "to work", pronunciation: "AR-bite-en", emoji: "💼" },
      { word: "essen", translation: "to eat", pronunciation: "ES-en", emoji: "🍽️" },
      { word: "schlafen", translation: "to sleep", pronunciation: "SHLAH-fen", emoji: "😴" },
      { word: "um ... Uhr", translation: "at ... o'clock", pronunciation: "oom ... OOR", emoji: "🕐" },
    ],
    phrases: [
      { text: "Ich stehe um 7 Uhr auf.", translation: "I get up at 7 o'clock.", pronunciation: "Ikh SHTAY-uh oom ZEE-ben OOR OWF." },
      { text: "Um 12 Uhr esse ich zu Mittag.", translation: "At 12 I have lunch.", pronunciation: "Oom TSWELF OOR ES-uh ikh tsoo MIT-ahk." },
    ],
    grammar: {
      topic: "Separable Verbs",
      explanation: "Some German verbs split: prefix goes to end in main clause",
      examples: [
        "Ich stehe um 7 Uhr auf. (I get up at 7)",
        "Er ruft mich an. (He calls me)",
        "Wir machen das Licht aus. (We turn off the light)",
      ],
    },
    activities: [
      {
        id: "de-a2-3-act-1",
        type: "order-sentence",
        instruction: "Ordne die Wörter zu einem Satz mit trennbarem Verb",
        correctOrder: ["Ich", "stehe", "um sieben Uhr", "auf"],
        scrambled: ["auf", "Ich", "um sieben Uhr", "stehe"],
        hint: "Das trennbare Verb 'aufstehen' - 'auf' geht ans Ende",
      },
      {
        id: "de-a2-3-act-2",
        type: "multiple-choice",
        question: "Wann stehst du auf?",
        correctAnswer: "Ich stehe um 7 Uhr auf",
        options: [
          "Ich aufstehe um 7 Uhr",
          "Ich stehe um 7 Uhr auf",
          "Ich stehe auf um 7 Uhr",
          "Auf ich stehe um 7 Uhr",
        ],
        hint: "Separable prefix 'auf' goes to end of clause",
        explanation: "Separable prefix 'auf' goes to end of clause",
      },
      {
        id: "de-a2-3-act-3",
        type: "dialogue",
        context: "Du sprichst über deinen Tagesablauf mit einem Freund",
        lines: [
          { speaker: "ai", text: "Wann stehst du normalerweise auf?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ich stehe um 6 Uhr auf", "Ich arbeite", "Ich esse Frühstück"], correctAnswer: "Ich stehe um 6 Uhr auf" },
          { speaker: "ai", text: "Und wann gehst du schlafen?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ich schlafe um 22 Uhr", "Ich esse Abendessen", "Ich sehe fern"], correctAnswer: "Ich schlafe um 22 Uhr" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A2 - Daily Routine & Time.
Current lesson vocabulary: aufstehen, frühstücken, arbeiten, essen, schlafen, um ... Uhr
Current lesson phrases: Ich stehe um 7 Uhr auf. / Um 12 Uhr esse ich zu Mittag.

TEACHING MODE:
1. Teach separable verb with time
2. Practice daily routine sentences
3. Ask student about their day
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Erzähl mir von deinem Tag! Wann stehst du auf?",
      topics: ["daily routine", "time", "separable verbs"],
      fallbackResponses: ["Guter Zeitplan!", "Denk an das trennbare Verb!", "Perfekt erzählt!"],
    },
  },
  {
    id: "de-a2-lesson-4",
    unitId: "de-a2-unit-1",
    title: "Wetter & Jahreszeiten",
    description: "Sprich über das Wetter und die vier Jahreszeiten",
    icon: "🌤️",
    level: "A2",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [
      { description: "Wetter beschreiben", xpReward: 12 },
      { description: "Jahreszeiten benennen", xpReward: 13 },
    ],
    vocabulary: [
      { word: "die Sonne", translation: "sun", pronunciation: "dee ZON-eh", emoji: "☀️" },
      { word: "der Regen", translation: "rain", pronunciation: "dair REH-gen", emoji: "🌧️" },
      { word: "der Schnee", translation: "snow", pronunciation: "dair SHNAY", emoji: "❄️" },
      { word: "der Wind", translation: "wind", pronunciation: "dair VINT", emoji: "💨" },
      { word: "warm", translation: "warm", pronunciation: "varm", emoji: "🌡️" },
      { word: "kalt", translation: "cold", pronunciation: "kahlt", emoji: "🥶" },
      { word: "der Frühling", translation: "spring", pronunciation: "dair FRUE-ling", emoji: "🌸" },
      { word: "der Sommer", translation: "summer", pronunciation: "dair ZOM-mer", emoji: "🏖️" },
      { word: "der Herbst", translation: "autumn", pronunciation: "dair HAIRBST", emoji: "🍂" },
      { word: "der Winter", translation: "winter", pronunciation: "dair VIN-ter", emoji: "⛄" },
    ],
    phrases: [
      { text: "Heute scheint die Sonne.", translation: "The sun is shining today.", pronunciation: "HOY-teh shaynt dee ZON-eh." },
      { text: "Im Winter ist es kalt.", translation: "In winter it is cold.", pronunciation: "Im VIN-ter ist es kahlt." },
    ],
    activities: [
      {
        id: "de-a2-4-act-1",
        type: "match",
        instruction: "Verbinde die Jahreszeit mit dem typischen Wetter",
        pairs: [
          { id: "1", left: "Frühling", right: "blühende Blumen" },
          { id: "2", left: "Sommer", right: "heiß und sonnig" },
          { id: "3", left: "Herbst", right: "bunte Blätter" },
          { id: "4", left: "Winter", right: "Schnee und Kälte" },
        ],
      },
      {
        id: "de-a2-4-act-2",
        type: "translate",
        question: "Übersetze: 'In winter it is cold'",
        correctAnswer: "Im Winter ist es kalt",
        hint: "'im' = in dem (in the)",
      },
      {
        id: "de-a2-4-act-3",
        type: "multiple-choice",
        question: "Welche Jahreszeit kommt nach dem Sommer?",
        correctAnswer: "der Herbst",
        options: ["der Winter", "der Frühling", "der Herbst", "der Sommer"],
        hint: "Es ist die dritte Jahreszeit",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German A2 - Weather & Seasons.
Current lesson vocabulary: die Sonne, der Regen, der Schnee, der Wind, warm, kalt, der Frühling, der Sommer, der Herbst, der Winter
Current lesson phrases: Heute scheint die Sonne. / Im Winter ist es kalt.

TEACHING MODE:
1. Teach weather vocabulary
2. Practice describing current weather
3. Ask about favorite season
STOP after the question.

Stay STRICTLY within weather vocabulary.`,
      introMessage: "Wie ist das Wetter heute bei dir? Ist es sonnig?",
      topics: ["weather", "seasons", "adjectives", "preferences"],
      fallbackResponses: ["Schönes Wetter!", "Ich mag auch den Sommer!", "Gut beschrieben!"],
    },
  },
];

// ============ B1 - INTERMEDIATE (4 Lessons) ============
export const GERMAN_B1_LESSONS: Lesson[] = [
  {
    id: "de-b1-lesson-1",
    unitId: "de-b1-unit-1",
    title: "Reisen und Urlaub",
    description: "Sprich über Reisen und Urlaubspläne",
    icon: "✈️",
    level: "B1",
    xpReward: 30,
    estimatedMinutes: 15,
    goals: [
      { description: "Über vergangene Reisen sprechen", xpReward: 15 },
      { description: "Zukünftige Pläne beschreiben", xpReward: 15 },
    ],
    vocabulary: [
      { word: "die Reise", translation: "trip/journey", pronunciation: "dee REYE-zuh", emoji: "🧳", example: "Die Reise war wunderschön." },
      { word: "der Urlaub", translation: "vacation", pronunciation: "dair OOOR-lowp", emoji: "🏖️", example: "Ich mache Urlaub in Spanien." },
      { word: "buchen", translation: "to book", pronunciation: "BOO-khen", emoji: "📅", example: "Ich habe ein Hotel gebucht." },
      { word: "das Flugzeug", translation: "airplane", pronunciation: "dahs FLOOK-tsoyk", emoji: "✈️", example: "Das Flugzeug landet um 15 Uhr." },
      { word: "das Hotel", translation: "hotel", pronunciation: "dahs ho-TEL", emoji: "🏨", example: "Das Hotel war sehr komfortabel." },
      { word: "die Sehenswürdigkeit", translation: "sight/attraction", pronunciation: "dee ZAY-ens-voord-ish-kite", emoji: "🏛️", example: "Wir besuchen viele Sehenswürdigkeiten." },
    ],
    phrases: [
      { text: "Ich bin letztes Jahr nach Spanien gereist.", translation: "I traveled to Spain last year.", pronunciation: "Ikh bin LET-stes Yahr nahkh SHPAH-nyen guh-REYST." },
      { text: "Wir haben ein Hotel gebucht.", translation: "We booked a hotel.", pronunciation: "Veer HAH-ben ayn ho-TEL guh-BOKHT." },
      { text: "Nächsten Sommer möchte ich nach Italien fahren.", translation: "Next summer I would like to go to Italy.", pronunciation: "NEKH-sten ZOM-er MERKH-te ikh nahkh ee-TAHL-yen FAH-ren." },
    ],
    grammar: {
      topic: "Perfekt Tense (Past)",
      explanation: "German uses 'haben' or 'sein' + past participle for past tense",
      examples: [
        "Ich bin nach Berlin gereist. (I traveled to Berlin)",
        "Wir haben ein Hotel gebucht. (We booked a hotel)",
        "Er ist mit dem Zug gefahren. (He traveled by train)",
      ],
      commonMistakes: ["Verbs of movement use 'sein', most others use 'haben'"],
    },
    culturalNote: {
      title: "Travel Culture in German-Speaking Countries",
      content: "Germans love to travel! 'Reisefieber' (travel fever) is the excitement before a trip. Always validate your train ticket before boarding.",
    },
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
        explanation: "'reisen' uses 'sein' in Perfekt tense because it's a verb of movement",
      },
      {
        id: "de-b1-1-act-2",
        type: "translate",
        question: "Übersetze: 'We booked a hotel'",
        correctAnswer: "Wir haben ein Hotel gebucht",
        hint: "Perfekt mit 'haben' + Partizip II",
      },
      {
        id: "de-b1-1-act-3",
        type: "flashcard",
        question: "Was ist 'die Sehenswürdigkeit'?",
        correctAnswer: "sight/attraction",
        options: ["airport", "sight/attraction", "train station", "beach"],
        hint: "Touristische Orte",
        front: "die Sehenswürdigkeit",
        back: "sight/attraction",
        example: "Der Eiffelturm ist eine berühmte Sehenswürdigkeit.",
      },
      {
        id: "de-b1-1-act-4",
        type: "order-sentence",
        instruction: "Ordne die Wörter zu einem Satz im Perfekt",
        correctOrder: ["Ich", "bin", "nach", "Berlin", "gereist"],
        scrambled: ["gereist", "Ich", "Berlin", "nach", "bin"],
        hint: "Perfekt mit 'sein' + Partizip",
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

Stay STRICTLY within travel vocabulary.`,
      introMessage: "Hallo! Erzähl mir von deinem letzten Urlaub! Wo warst du?",
      topics: ["travel", "past tense", "future plans", "Perfekt"],
      fallbackResponses: ["Tolle Reise!", "Erzähl mehr!", "Das klingt spannend!"],
    },
  },
  {
    id: "de-b1-lesson-2",
    unitId: "de-b1-unit-1",
    title: "Gesundheit & Körper",
    description: "Sprich über Gesundheit, Krankheit und den menschlichen Körper",
    icon: "🏥",
    level: "B1",
    xpReward: 30,
    estimatedMinutes: 12,
    goals: [
      { description: "Körperteile benennen", xpReward: 15 },
      { description: "Über Gesundheit sprechen", xpReward: 15 },
    ],
    vocabulary: [
      { word: "der Kopf", translation: "head", pronunciation: "dair KOPF", emoji: "🧠" },
      { word: "der Bauch", translation: "stomach", pronunciation: "dair BOWKH", emoji: "🤰" },
      { word: "der Arm", translation: "arm", pronunciation: "dair ARM", emoji: "💪" },
      { word: "das Bein", translation: "leg", pronunciation: "dahs BYNE", emoji: "🦵" },
      { word: "der Arzt", translation: "doctor", pronunciation: "dair ARTST", emoji: "👨‍⚕️" },
      { word: "die Apotheke", translation: "pharmacy", pronunciation: "dee ah-po-TAY-keh", emoji: "💊" },
      { word: "gesund", translation: "healthy", pronunciation: "geh-ZOONT", emoji: "✅" },
      { word: "krank", translation: "sick", pronunciation: "krahngk", emoji: "🤒" },
    ],
    phrases: [
      { text: "Mir tut der Kopf weh.", translation: "My head hurts.", pronunciation: "Meer toot dair KOPF veh." },
      { text: "Ich muss zum Arzt gehen.", translation: "I have to go to the doctor.", pronunciation: "Ikh moos tsoom ARTST GAY-en." },
    ],
    grammar: {
      topic: "Dative Case with Body Parts",
      explanation: "When talking about body parts that hurt, use dative: 'Mir tut der Kopf weh'",
      examples: [
        "Mir tut der Kopf weh. (My head hurts)",
        "Ihm schmerzt der Bauch. (His stomach hurts)",
        "Wir gehen zum Arzt. (We go to the doctor)",
      ],
    },
    activities: [
      {
        id: "de-b1-2-act-1",
        type: "dialogue",
        context: "Du fühlst dich nicht wohl und sprichst mit einem Freund",
        lines: [
          { speaker: "ai", text: "Hallo! Wie geht es dir heute?" },
          { speaker: "user", text: "", isBlank: true, options: ["Mir geht es nicht gut", "Ich bin glücklich", "Das Wetter ist schön"], correctAnswer: "Mir geht es nicht gut" },
          { speaker: "ai", text: "Oh nein! Was fehlt dir?" },
          { speaker: "user", text: "", isBlank: true, options: ["Mir tut der Kopf weh", "Ich habe Hunger", "Ich möchte reisen"], correctAnswer: "Mir tut der Kopf weh" },
          { speaker: "ai", text: "Du solltest zum Arzt gehen oder in die Apotheke." },
        ],
      },
      {
        id: "de-b1-2-act-2",
        type: "grammar-drill",
        rule: "Bei Körperteilen im Dativ: 'Mir tut [der Körperteil] weh'",
        examples: ["Mir tut der Kopf weh.", "Ihm schmerzt der Bauch."],
        exercises: [
          {
            prompt: "___ tut der Bauch weh.",
            correctAnswer: "Mir",
            options: ["Mir", "Mich", "Ich", "Mein"],
            hint: "Dativ für die Person, deren Körperteil schmerzt",
          },
        ],
      },
      {
        id: "de-b1-2-act-3",
        type: "multiple-choice",
        question: "Was bedeutet 'der Arzt'?",
        correctAnswer: "doctor",
        options: ["teacher", "doctor", "lawyer", "nurse"],
        hint: "Man geht zu ihm, wenn man krank ist",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B1 - Health & Body.
Current lesson vocabulary: der Kopf, der Bauch, der Arm, das Bein, der Arzt, die Apotheke, gesund, krank
Current lesson phrases: Mir tut der Kopf weh. / Ich muss zum Arzt gehen.

TEACHING MODE:
1. Teach body parts with Dativ
2. Practice 'Mir tut ... weh' structure
3. Ask about symptoms
STOP after the question.

Stay STRICTLY within health vocabulary.`,
      introMessage: "Wie fühlst du dich heute? Hast du Schmerzen?",
      topics: ["health", "body parts", "dative case", "giving advice"],
      fallbackResponses: ["Gute Besserung!", "Das ist wichtig!", "Sehr gut erklärt!"],
    },
  },
  {
    id: "de-b1-lesson-3",
    unitId: "de-b1-unit-1",
    title: "Meinungen & Gefühle ausdrücken",
    description: "Lerne, deine Meinung und Gefühle auf Deutsch zu äußern",
    icon: "💬",
    level: "B1",
    xpReward: 35,
    estimatedMinutes: 15,
    goals: [
      { description: "Meinungen äußern", xpReward: 18 },
      { description: "Gefühle beschreiben", xpReward: 17 },
    ],
    vocabulary: [
      { word: "meiner Meinung nach", translation: "in my opinion", pronunciation: "MEYE-ner MEYE-noong nakh", emoji: "🗣️" },
      { word: "ich finde", translation: "I think/find", pronunciation: "ikh FIN-deh", emoji: "💭" },
      { word: "ich glaube", translation: "I believe", pronunciation: "ikh GLOW-beh", emoji: "🤔" },
      { word: "glücklich", translation: "happy", pronunciation: "GLUEK-lish", emoji: "😊" },
      { word: "traurig", translation: "sad", pronunciation: "TROW-rig", emoji: "😢" },
      { word: "aufgeregt", translation: "excited", pronunciation: "OWF-geh-regt", emoji: "🤩" },
      { word: "enttäuscht", translation: "disappointed", pronunciation: "ent-TOYSH-t", emoji: "😞" },
    ],
    phrases: [
      { text: "Meiner Meinung nach ist Deutsch interessant.", translation: "In my opinion, German is interesting.", pronunciation: "MEYE-ner MEYE-noong nakh ist DOYTSH in-te-reh-SANT." },
      { text: "Ich finde, dass Lernen Spaß macht.", translation: "I think learning is fun.", pronunciation: "Ikh FIN-deh, dahs LER-nen shpahs makht." },
    ],
    grammar: {
      topic: "Subordinate Clauses with 'dass'",
      explanation: "'dass' introduces a subordinate clause - verb goes to end",
      examples: [
        "Ich finde, dass Deutsch interessant ist. (I think that German is interesting)",
        "Er glaubt, dass es regnen wird. (He believes that it will rain)",
        "Wir hoffen, dass du kommst. (We hope that you come)",
      ],
    },
    activities: [
      {
        id: "de-b1-3-act-1",
        type: "order-sentence",
        instruction: "Ordne die Wörter zu einem Satz mit 'dass'",
        correctOrder: ["Ich", "finde", "dass", "Deutsch", "interessant", "ist"],
        scrambled: ["ist", "Ich", "dass", "interessant", "finde", "Deutsch"],
        hint: "Nach 'dass' geht das Verb ans Ende",
      },
      {
        id: "de-b1-3-act-2",
        type: "multiple-choice",
        question: "Welcher Satz ist korrekt?",
        correctAnswer: "Ich finde, dass Deutsch interessant ist",
        options: [
          "Ich finde dass Deutsch ist interessant",
          "Ich finde, dass Deutsch interessant ist",
          "Ich finde dass interessant Deutsch ist",
          "Ich finde, ist Deutsch interessant dass",
        ],
        hint: "Comma before 'dass', verb at end of subordinate clause",
        explanation: "Comma before 'dass', verb at end of subordinate clause",
      },
      {
        id: "de-b1-3-act-3",
        type: "dialogue",
        context: "Du diskutierst mit einem Freund über ein Thema",
        lines: [
          { speaker: "ai", text: "Was denkst du über das Lernen von Sprachen?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Ich finde, dass Sprachen lernen wichtig ist",
            "Ich esse gern",
            "Das Wetter ist schön"
          ], correctAnswer: "Ich finde, dass Sprachen lernen wichtig ist" },
          { speaker: "ai", text: "Warum glaubst du das?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Weil man neue Kulturen verstehen kann",
            "Weil ich müde bin",
            "Weil es regnet"
          ], correctAnswer: "Weil man neue Kulturen verstehen kann" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B1 - Expressing Opinions & Feelings.
Current lesson vocabulary: meiner Meinung nach, ich finde, ich glaube, glücklich, traurig, aufgeregt, enttäuscht
Current lesson phrases: Meiner Meinung nach ist Deutsch interessant. / Ich finde, dass Lernen Spaß macht.

TEACHING MODE:
1. Teach opinion phrases
2. Explain 'dass' clause structure
3. Ask student's opinion on a topic
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Was denkst du über das Deutschlernen? Ich finde es spannend!",
      topics: ["opinions", "feelings", "subordinate clauses", "discussion"],
      fallbackResponses: ["Interessante Meinung!", "Das verstehe ich!", "Sehr gut ausgedrückt!"],
    },
  },
  {
    id: "de-b1-lesson-4",
    unitId: "de-b1-unit-1",
    title: "Arbeit & Beruf",
    description: "Sprich über Berufe, Arbeitsplätze und Karriere",
    icon: "💼",
    level: "B1",
    xpReward: 35,
    estimatedMinutes: 15,
    goals: [
      { description: "Berufe benennen", xpReward: 18 },
      { description: "Über Arbeit sprechen", xpReward: 17 },
    ],
    vocabulary: [
      { word: "der Beruf", translation: "profession/job", pronunciation: "dair beh-ROOF", emoji: "💼" },
      { word: "die Arbeit", translation: "work", pronunciation: "dee AR-bite", emoji: "🏢" },
      { word: "der Chef", translation: "boss", pronunciation: "dair SHEF", emoji: "👔" },
      { word: "der Kollege", translation: "colleague", pronunciation: "dair ko-LEH-geh", emoji: "👥" },
      { word: "die Pause", translation: "break", pronunciation: "dee POW-zeh", emoji: "☕" },
      { word: "verdienen", translation: "to earn", pronunciation: "fer-DEE-nen", emoji: "💰" },
    ],
    phrases: [
      { text: "Was ist dein Beruf?", translation: "What is your profession?", pronunciation: "Vas ist dine beh-ROOF?" },
      { text: "Ich arbeite als Lehrer.", translation: "I work as a teacher.", pronunciation: "Ikh AR-bite-te ahls LAY-rer." },
    ],
    grammar: {
      topic: "Genitive Case (Possession)",
      explanation: "Genitive shows possession: 'das Auto meines Vaters' (my father's car)",
      examples: [
        "Das ist das Büro meines Chefs. (That's my boss's office)",
        "Die Idee meines Kollegen ist gut. (My colleague's idea is good)",
      ],
    },
    activities: [
      {
        id: "de-b1-4-act-1",
        type: "grammar-drill",
        rule: "Genitiv für Besitz: 'das [Ding] des/der [Person]'",
        examples: ["das Auto meines Vaters", "die Tasche meiner Mutter"],
        exercises: [
          {
            prompt: "Das ist das Büro ___ Chefs.",
            correctAnswer: "meines",
            options: ["meines", "meiner", "mein", "mich"],
            hint: "Chef ist maskulin -> Genitiv: meines",
          },
        ],
      },
      {
        id: "de-b1-4-act-2",
        type: "multiple-choice",
        question: "Was bedeutet 'der Kollege'?",
        correctAnswer: "colleague",
        options: ["boss", "colleague", "employee", "customer"],
        hint: "Jemand, mit dem man arbeitet",
      },
      {
        id: "de-b1-4-act-3",
        type: "translate",
        question: "Übersetze: 'I work as a teacher'",
        correctAnswer: "Ich arbeite als Lehrer",
        hint: "'als' = as",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B1 - Work & Profession.
Current lesson vocabulary: der Beruf, die Arbeit, der Chef, der Kollege, die Pause, verdienen
Current lesson phrases: Was ist dein Beruf? / Ich arbeite als Lehrer.

TEACHING MODE:
1. Teach job vocabulary
2. Practice Genitiv for possession
3. Ask about student's profession
STOP after the question.

Stay STRICTLY within work vocabulary.`,
      introMessage: "Was ist dein Beruf? Oder was möchtest du werden?",
      topics: ["work", "professions", "genitive case", "workplace"],
      fallbackResponses: ["Toller Beruf!", "Das ist interessant!", "Sehr gut beschrieben!"],
    },
  },
];

// ============ B2 - UPPER INTERMEDIATE (3 Lessons) ============
export const GERMAN_B2_LESSONS: Lesson[] = [
  {
    id: "de-b2-lesson-1",
    unitId: "de-b2-unit-1",
    title: "Beruf und Karriere",
    description: "Sprich über Berufserfahrung und Karriereziele",
    icon: "🏆",
    level: "B2",
    xpReward: 35,
    estimatedMinutes: 18,
    goals: [
      { description: "Berufserfahrung beschreiben", xpReward: 20 },
      { description: "In Bewerbungsgesprächen sprechen", xpReward: 15 },
    ],
    vocabulary: [
      { word: "die Erfahrung", translation: "experience", pronunciation: "dee air-FAH-roong", emoji: "📊", example: "Ich habe fünf Jahre Erfahrung." },
      { word: "die Bewerbung", translation: "application", pronunciation: "dee buh-VER-boong", emoji: "📄", example: "Ich schicke meine Bewerbung." },
      { word: "das Vorstellungsgespräch", translation: "job interview", pronunciation: "dahs FOR-shtel-oongs-guh-shprekh", emoji: "🤝", example: "Morgen habe ich ein Vorstellungsgespräch." },
      { word: "die Karriere", translation: "career", pronunciation: "dee ka-REE-uh", emoji: "📈", example: "Sie macht Karriere im Marketing." },
      { word: "sich bewerben", translation: "to apply", pronunciation: "zikh buh-VER-ben", emoji: "✉️", example: "Ich bewerbe mich um die Stelle." },
      { word: "die Fähigkeit", translation: "skill/ability", pronunciation: "dee FAY-ig-kite", emoji: "💪", example: "Teamarbeit ist eine wichtige Fähigkeit." },
    ],
    phrases: [
      { text: "Ich bewerbe mich um die Stelle als Manager.", translation: "I am applying for the position as manager.", pronunciation: "Ikh buh-VER-buh mikh oom dee SHTEL-uh ahls MAH-nay-jer." },
      { text: "Meine Stärken sind Teamarbeit und Kommunikation.", translation: "My strengths are teamwork and communication.", pronunciation: "MEYE-nuh SHTER-ken zint TEEM-ar-bite oont ko-moo-nee-ka-TSYOHN." },
    ],
    grammar: {
      topic: "Reflexive Verbs",
      explanation: "Some German verbs require a reflexive pronoun (mich, dich, sich)",
      examples: [
        "Ich bewerbe mich. (I apply)",
        "Er interessiert sich für Technik. (He is interested in technology)",
        "Wir freuen uns auf das Wochenende. (We look forward to the weekend)",
      ],
      commonMistakes: ["Don't forget the reflexive pronoun! 'Ich bewerbe' is incomplete"],
    },
    culturalNote: {
      title: "Job Applications in Germany",
      content: "German applications often include a 'Lebenslauf' (CV) and 'Anschreiben' (cover letter). Photos on CVs are still common but becoming optional.",
    },
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
        explanation: "'sich bewerben' is a reflexive verb requiring 'mich'",
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
        type: "dialogue",
        context: "Vorstellungsgespräch - Du bewirbst dich auf eine Stelle",
        lines: [
          { speaker: "ai", text: "Guten Tag! Erzählen Sie mir von Ihrer Berufserfahrung." },
          { speaker: "user", text: "", isBlank: true, options: [
            "Ich habe fünf Jahre Erfahrung im Marketing",
            "Ich mag Pizza",
            "Das Wetter ist schön"
          ], correctAnswer: "Ich habe fünf Jahre Erfahrung im Marketing" },
          { speaker: "ai", text: "Warum möchten Sie bei uns arbeiten?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Weil ich mich für Ihre Firma interessiere",
            "Weil ich hungrig bin",
            "Weil es regnet"
          ], correctAnswer: "Weil ich mich für Ihre Firma interessiere" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B2 - Career & Profession.
Current lesson vocabulary: die Erfahrung, die Bewerbung, das Vorstellungsgespräch, die Karriere, sich bewerben, die Fähigkeit
Current lesson phrases: Ich bewerbe mich um die Stelle als Manager. / Meine Stärken sind Teamarbeit und Kommunikation.

TEACHING MODE:
1. Teach professional vocabulary
2. Explain reflexive verbs
3. Practice job interview questions
STOP after the question.

REACTING MODE:
1. React to their career description
2. Correct formal/informal usage
3. Ask about professional goals
STOP after one sentence.

Stay STRICTLY within career vocabulary.`,
      introMessage: "Guten Tag! Willkommen zum Vorstellungsgespräch. Erzählen Sie mir von Ihrer Berufserfahrung.",
      topics: ["career", "job interviews", "professional language", "reflexive verbs"],
      fallbackResponses: ["Sehr professionell!", "Gute Antwort!", "Ausgezeichnet formuliert!"],
    },
  },
  {
    id: "de-b2-lesson-2",
    unitId: "de-b2-unit-1",
    title: "Medien & Technologie",
    description: "Diskutiere über soziale Medien, Nachrichten und Technologie",
    icon: "📱",
    level: "B2",
    xpReward: 40,
    estimatedMinutes: 15,
    goals: [
      { description: "Über Medien sprechen", xpReward: 20 },
      { description: "Technologie diskutieren", xpReward: 20 },
    ],
    vocabulary: [
      { word: "das soziale Netzwerk", translation: "social network", pronunciation: "dahs so-TSYAH-leh NETS-verk", emoji: "🌐" },
      { word: "die Nachricht", translation: "news/message", pronunciation: "dee NAHKH-rikht", emoji: "📰" },
      { word: "der Algorithmus", translation: "algorithm", pronunciation: "dair al-go-RIT-moos", emoji: "🔢" },
      { word: "die Privatsphäre", translation: "privacy", pronunciation: "dee pree-vaht-SFAY-reh", emoji: "🔒" },
      { word: "verbreiten", translation: "to spread", pronunciation: "fer-BRY-ten", emoji: "📡" },
      { word: "die Meinung", translation: "opinion", pronunciation: "dee MEYE-noong", emoji: "💭" },
    ],
    phrases: [
      { text: "Soziale Medien verbreiten Nachrichten schnell.", translation: "Social media spreads news quickly.", pronunciation: "Zo-TSYAH-leh MEH-dee-en fer-BRY-ten NAHKH-rikh-ten shnel." },
      { text: "Technologie verändert unsere Welt.", translation: "Technology is changing our world.", pronunciation: "TEKH-no-lo-gee fer-EN-dert OON-zeh-re VELT." },
    ],
    grammar: {
      topic: "Passive Voice",
      explanation: "Passive: 'werden' + past participle. Focus on action, not actor",
      examples: [
        "Das Buch wird gelesen. (The book is being read)",
        "Die Nachrichten werden verbreitet. (The news is spread)",
        "Hier wird Deutsch gesprochen. (German is spoken here)",
      ],
    },
    activities: [
      {
        id: "de-b2-2-act-1",
        type: "grammar-drill",
        rule: "Passiv: 'werden' + Partizip II",
        examples: ["Das Buch wird gelesen.", "Die Tür wird geöffnet."],
        exercises: [
          {
            prompt: "Die Nachricht ___ (verbreiten) im Internet.",
            correctAnswer: "wird verbreitet",
            hint: "Passiv Präsens: wird + Partizip II",
          },
        ],
      },
      {
        id: "de-b2-2-act-2",
        type: "multiple-choice",
        question: "Welcher Satz ist im Passiv?",
        correctAnswer: "Das Buch wird gelesen",
        options: [
          "Ich lese das Buch",
          "Das Buch wird gelesen",
          "Ich habe das Buch gelesen",
          "Das Buch ist interessant",
        ],
        hint: "Passiv uses 'werden' + past participle",
        explanation: "Passiv uses 'werden' + past participle",
      },
      {
        id: "de-b2-2-act-3",
        type: "translate",
        question: "Übersetze: 'German is spoken here'",
        correctAnswer: "Hier wird Deutsch gesprochen",
        hint: "Passiv: wird + gesprochen",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B2 - Media & Technology.
Current lesson vocabulary: das soziale Netzwerk, die Nachricht, der Algorithmus, die Privatsphäre, verbreiten, die Meinung
Current lesson phrases: Soziale Medien verbreiten Nachrichten schnell. / Technologie verändert unsere Welt.

TEACHING MODE:
1. Teach media vocabulary
2. Explain Passiv (werden + Partizip)
3. Ask student's opinion on technology
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Was denkst du über soziale Medien? Sind sie nützlich oder gefährlich?",
      topics: ["media", "technology", "passive voice", "digital society"],
      fallbackResponses: ["Guter Punkt!", "Das ist eine wichtige Frage!", "Sehr differenziert!"],
    },
  },
  {
    id: "de-b2-lesson-3",
    unitId: "de-b2-unit-1",
    title: "Umwelt & Nachhaltigkeit",
    description: "Sprich über Umweltschutz, Klimawandel und nachhaltiges Leben",
    icon: "🌍",
    level: "B2",
    xpReward: 40,
    estimatedMinutes: 18,
    goals: [
      { description: "Umweltthemen diskutieren", xpReward: 20 },
      { description: "Nachhaltigkeit beschreiben", xpReward: 20 },
    ],
    vocabulary: [
      { word: "die Umwelt", translation: "environment", pronunciation: "dee OOM-velt", emoji: "🌿", example: "Wir müssen die Umwelt schützen." },
      { word: "der Klimawandel", translation: "climate change", pronunciation: "dair KLEE-mah-van-del", emoji: "🌡️" },
      { word: "nachhaltig", translation: "sustainable", pronunciation: "NAHKH-hal-tikh", emoji: "♻️" },
      { word: "recyceln", translation: "to recycle", pronunciation: "ree-TSY-keln", emoji: "🔄" },
      { word: "der Müll", translation: "trash/garbage", pronunciation: "dair MUEL", emoji: "🗑️" },
      { word: "die Energie", translation: "energy", pronunciation: "dee eh-ner-GEE", emoji: "⚡" },
      { word: "schützen", translation: "to protect", pronunciation: "SHUET-zen", emoji: "🛡️" },
    ],
    phrases: [
      { text: "Wir müssen die Umwelt schützen.", translation: "We must protect the environment.", pronunciation: "Veer MUES-en dee OOM-velt SHUET-sen." },
      { text: "Ich würde gerne mehr recyceln.", translation: "I would like to recycle more.", pronunciation: "Ikh VUUR-deh GAYR-neh mayr ree-TSY-keln." },
    ],
    grammar: {
      topic: "Subjunctive II (Konjunktiv II) for Hypotheticals",
      explanation: "Used for hypothetical situations, polite requests, and wishes",
      examples: [
        "Ich würde mehr recyceln, wenn ich könnte. (I would recycle more if I could)",
        "Könntest du das bitte erklären? (Could you please explain that?)",
      ],
    },
    activities: [
      {
        id: "de-b2-3-act-1",
        type: "multiple-choice",
        question: "Welcher Satz verwendet Konjunktiv II korrekt?",
        correctAnswer: "Ich würde mehr recyceln, wenn ich könnte",
        options: [
          "Ich recycel mehr",
          "Ich würde mehr recyceln, wenn ich könnte",
          "Ich habe mehr recycelt",
          "Ich recycle mehr",
        ],
        hint: "'würde' + infinitive expresses hypothetical action",
        explanation: "'würde' + infinitive expresses hypothetical action",
      },
      {
        id: "de-b2-3-act-2",
        type: "translate",
        question: "Übersetze: 'We must protect the environment'",
        correctAnswer: "Wir müssen die Umwelt schützen",
        hint: "'müssen' = must, 'schützen' = protect",
      },
      {
        id: "de-b2-3-act-3",
        type: "dialogue",
        context: "Du diskutierst mit einem Freund über Umweltschutz",
        lines: [
          { speaker: "ai", text: "Was würdest du tun, um die Umwelt zu schützen?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Ich würde weniger Plastik verwenden",
            "Ich würde mehr essen",
            "Ich würde schlafen"
          ], correctAnswer: "Ich würde weniger Plastik verwenden" },
          { speaker: "ai", text: "Gute Idee! Was könnten wir noch machen?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Wir könnten mehr recyceln",
            "Wir könnten fernsehen",
            "Wir könnten einkaufen"
          ], correctAnswer: "Wir könnten mehr recyceln" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German B2 - Environment & Sustainability.
Current lesson vocabulary: die Umwelt, der Klimawandel, nachhaltig, recyceln, der Müll, die Energie, schützen
Current lesson phrases: Wir müssen die Umwelt schützen. / Ich würde gerne mehr recyceln.

TEACHING MODE:
1. Teach environment vocabulary
2. Explain Konjunktiv II for hypotheticals
3. Ask student what they would do for the environment
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Was würdest du tun, um unsere Umwelt zu schützen? Ich habe einige Ideen...",
      topics: ["environment", "sustainability", "Konjunktiv II", "problem-solving"],
      fallbackResponses: ["Tolle Idee!", "Das würde wirklich helfen!", "Sehr durchdacht!"],
    },
  },
];

// ============ C1 - ADVANCED (3 Lessons) ============
export const GERMAN_C1_LESSONS: Lesson[] = [
  {
    id: "de-c1-lesson-1",
    unitId: "de-c1-unit-1",
    title: "Aktuelle Ereignisse diskutieren",
    description: "Diskutiere komplexe Themen und aktuelle Ereignisse",
    icon: "📰",
    level: "C1",
    xpReward: 40,
    estimatedMinutes: 20,
    goals: [
      { description: "Komplexe Meinungen ausdrücken", xpReward: 20 },
      { description: "Argumente strukturiert präsentieren", xpReward: 20 },
    ],
    vocabulary: [
      { word: "die Debatte", translation: "debate", pronunciation: "dee deh-BAH-tuh", emoji: "🗣️", example: "Die Debatte war sehr kontrovers." },
      { word: "kontrovers", translation: "controversial", pronunciation: "kon-tro-VERS", emoji: "⚖️", example: "Das ist ein kontroverses Thema." },
      { word: "befürworten", translation: "to support/advocate", pronunciation: "buh-FUUR-vor-ten", emoji: "👍", example: "Ich befürworte diese Maßnahme." },
      { word: "ablehnen", translation: "to reject", pronunciation: "AP-lay-nen", emoji: "👎", example: "Er lehnt den Vorschlag ab." },
      { word: "die Perspektive", translation: "perspective", pronunciation: "dee per-spek-TEE-vuh", emoji: "👁️", example: "Aus meiner Perspektive ist das richtig." },
      { word: "argumentieren", translation: "to argue/reason", pronunciation: "ar-goo-men-TEE-ren", emoji: "💭", example: "Sie argumentiert sehr überzeugend." },
    ],
    phrases: [
      { text: "Meiner Meinung nach ist das ein kontroverses Thema.", translation: "In my opinion, this is a controversial topic.", pronunciation: "MEYE-ner MEYE-noong nakh ist dahs ayn kon-tro-VER-zes TOH-mah." },
      { text: "Ich befürworte diese Maßnahme, weil sie notwendig ist.", translation: "I support this measure because it is necessary.", pronunciation: "Ikh buh-FUUR-vor-te DEE-zuh MAHS-nah-me, vail zee NOT-ven-dikh ist." },
    ],
    grammar: {
      topic: "Advanced Connectors & Discourse Markers",
      explanation: "Use sophisticated connectors for nuanced argumentation",
      examples: [
        "Einerseits... andererseits... (On one hand... on the other hand...)",
        "Zwar... aber... (Admittedly... but...)",
        "Nicht nur..., sondern auch... (Not only..., but also...)",
      ],
    },
    culturalNote: {
      title: "Debate Culture in German",
      content: "German discourse values precision and thoroughness. 'Sachlichkeit' (objectivity) is prized over emotional appeals.",
    },
    activities: [
      {
        id: "de-c1-1-act-1",
        type: "multiple-choice",
        question: "Welcher Ausdruck zeigt differenzierte Argumentation?",
        correctAnswer: "Einerseits hat er recht, andererseits übersieht er wichtige Aspekte",
        options: [
          "Das ist einfach falsch",
          "Einerseits hat er recht, andererseits übersieht er wichtige Aspekte",
          "Ich stimme nicht zu",
          "Das ist meine Meinung",
        ],
        hint: "Shows nuanced thinking",
        explanation: "Shows nuanced thinking by acknowledging multiple perspectives",
      },
      {
        id: "de-c1-1-act-2",
        type: "translate",
        question: "Übersetze: 'In my opinion, this is a controversial topic'",
        correctAnswer: "Meiner Meinung nach ist das ein kontroverses Thema",
        hint: "Use formal opinion phrases",
      },
      {
        id: "de-c1-1-act-3",
        type: "dialogue",
        context: "Du diskutierst ein kontroverses Thema in einer Debatte",
        lines: [
          { speaker: "ai", text: "Was ist Ihre Perspektive zu diesem Thema?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Meiner Meinung nach ist das ein komplexes Thema mit verschiedenen Perspektiven",
            "Ich weiß nicht",
            "Das ist langweilig"
          ], correctAnswer: "Meiner Meinung nach ist das ein komplexes Thema mit verschiedenen Perspektiven" },
          { speaker: "ai", text: "Könnten Sie Ihre Argumente etwas differenzierter darlegen?" },
          { speaker: "user", text: "", isBlank: true, options: [
            "Einerseits... andererseits...",
            "Ich mag Pizza",
            "Es regnet"
          ], correctAnswer: "Einerseits... andererseits..." },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German C1 - Discussing Current Events.
Current lesson vocabulary: die Debatte, kontrovers, befürworten, ablehnen, die Perspektive, argumentieren
Current lesson phrases: Meiner Meinung nach ist das ein kontroverses Thema. / Ich befürworte diese Maßnahme, weil sie notwendig ist.

TEACHING MODE:
1. Teach debate vocabulary
2. Explain discourse markers
3. Practice nuanced argumentation
STOP after the question.

REACTING MODE:
1. Engage with their argument
2. Challenge their perspective respectfully
3. Ask for counterarguments
STOP after one sentence.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Willkommen! Heute diskutieren wir ein aktuelles Thema. Bist du bereit zu argumentieren?",
      topics: ["debate", "current events", "argumentation", "nuanced language"],
      fallbackResponses: ["Sehr differenziert!", "Das ist ein wichtiger Aspekt!", "Ausgezeichnete Argumentation!"],
    },
  },
  {
    id: "de-c1-lesson-2",
    unitId: "de-c1-unit-1",
    title: "Literatur & Kultur verstehen",
    description: "Analysiere deutsche Literatur, Kunst und kulturelle Themen",
    icon: "📚",
    level: "C1",
    xpReward: 45,
    estimatedMinutes: 20,
    goals: [
      { description: "Literarische Texte analysieren", xpReward: 22 },
      { description: "Kulturelle Kontexte verstehen", xpReward: 23 },
    ],
    vocabulary: [
      { word: "das Werk", translation: "work (of art/literature)", pronunciation: "dahs VERK", emoji: "📖" },
      { word: "interpretieren", translation: "to interpret", pronunciation: "in-ter-pre-TEE-ren", emoji: "🔍" },
      { word: "die Symbolik", translation: "symbolism", pronunciation: "dee zym-bo-LEEK", emoji: "🔣" },
      { word: "der Kontext", translation: "context", pronunciation: "dair KON-tekst", emoji: "🖼️" },
      { word: "die Epoche", translation: "era/period", pronunciation: "dee eh-POH-kheh", emoji: "📅" },
      { word: "bedeutsam", translation: "significant", pronunciation: "beh-DOYT-zahm", emoji: "⭐" },
    ],
    phrases: [
      { text: "Die Analyse des Werkes zeigt dessen Bedeutung.", translation: "The analysis of the work shows its significance.", pronunciation: "Dee ah-nah-LEE-zeh des VER-kes tsaygt DES-en beh-DOY-tsahm-kite." },
      { text: "Die Symbolik im historischen Kontext interpretieren.", translation: "Interpreting the symbolism in historical context.", pronunciation: "Dee zym-bo-LEEK im his-TOH-ri-shen KON-tekst in-ter-pre-TEE-ren." },
    ],
    grammar: {
      topic: "Nominalization & Academic Style",
      explanation: "German academic writing often nominalizes verbs for formal tone",
      examples: [
        "Die Analyse des Werkes zeigt... (The analysis of the work shows...)",
        "Die Interpretation der Symbolik ist bedeutsam. (The interpretation of the symbolism is significant)",
      ],
    },
    activities: [
      {
        id: "de-c1-2-act-1",
        type: "grammar-drill",
        rule: "Nominalisierung: Verb -> Substantiv für formellen Stil",
        examples: ["analysieren -> die Analyse", "interpretieren -> die Interpretation"],
        exercises: [
          {
            prompt: "___ (analysieren) des Textes zeigt wichtige Muster.",
            correctAnswer: "Die Analyse",
            hint: "Nominalisiere das Verb für akademischen Stil",
          },
        ],
      },
      {
        id: "de-c1-2-act-2",
        type: "multiple-choice",
        question: "Welcher Ausdruck ist akademisch/formell?",
        correctAnswer: "Die Analyse des Werkes zeigt dessen Bedeutung",
        options: [
          "Ich denke, das Buch ist gut",
          "Die Analyse des Werkes zeigt dessen Bedeutung",
          "Das Buch ist cool",
          "Ich mag die Geschichte",
        ],
        hint: "Uses nominalization and formal structure",
        explanation: "Uses nominalization and formal structure",
      },
      {
        id: "de-c1-2-act-3",
        type: "translate",
        question: "Übersetze: 'The interpretation of the symbolism is significant'",
        correctAnswer: "Die Interpretation der Symbolik ist bedeutsam",
        hint: "Use nominalized forms",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German C1 - Literature & Culture.
Current lesson vocabulary: das Werk, interpretieren, die Symbolik, der Kontext, die Epoche, bedeutsam
Current lesson phrases: Die Analyse des Werkes zeigt dessen Bedeutung. / Die Symbolik im historischen Kontext interpretieren.

TEACHING MODE:
1. Teach literary analysis vocabulary
2. Explain nominalization
3. Ask student to interpret a work
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Lass uns ein deutsches literarisches Werk analysieren. Welche Epoche interessiert dich?",
      topics: ["literature", "culture", "academic language", "analysis"],
      fallbackResponses: ["Sehr insightful!", "Das ist eine tiefgründige Beobachtung!", "Ausgezeichnete Analyse!"],
    },
  },
  {
    id: "de-c1-lesson-3",
    unitId: "de-c1-unit-1",
    title: "Wissenschaft & Forschung",
    description: "Diskutiere wissenschaftliche Themen und Forschungsergebnisse",
    icon: "🔬",
    level: "C1",
    xpReward: 45,
    estimatedMinutes: 22,
    goals: [
      { description: "Wissenschaftliche Sprache verstehen", xpReward: 22 },
      { description: "Forschung diskutieren", xpReward: 23 },
    ],
    vocabulary: [
      { word: "die Hypothese", translation: "hypothesis", pronunciation: "dee hoo-po-TEH-zeh", emoji: "🔬" },
      { word: "die Methode", translation: "method", pronunciation: "dee meh-TOH-deh", emoji: "📋" },
      { word: "empirisch", translation: "empirical", pronunciation: "em-PEE-rish", emoji: "📊" },
      { word: "die Evidenz", translation: "evidence", pronunciation: "dee eh-vee-DENTS", emoji: "📄" },
      { word: "validieren", translation: "to validate", pronunciation: "va-lee-DEE-ren", emoji: "✅" },
      { word: "replizieren", translation: "to replicate", pronunciation: "reh-plee-TSEE-ren", emoji: "🔄" },
    ],
    phrases: [
      { text: "Die Hypothese wurde durch empirische Methoden validiert.", translation: "The hypothesis was validated through empirical methods.", pronunciation: "Dee hoo-po-TEH-zeh VUUR-deh doorch em-PEE-ree-sheh meh-TOH-den va-lee-DEERT." },
      { text: "Die Evidenz deutet auf eine Korrelation hin.", translation: "The evidence points to a correlation.", pronunciation: "Dee eh-vee-DENTS DOY-tet owf EYE-neh ko-reh-la-TSYOHN hin." },
    ],
    grammar: {
      topic: "Complex Sentence Structures & Parentheticals",
      explanation: "Use subordinate clauses, parenthetical phrases, and precise modifiers",
      examples: [
        "Die Studie, die 2023 veröffentlicht wurde, zeigt einen Zusammenhang...",
        "Die Evidenz (obwohl begrenzt) deutet darauf hin, dass...",
      ],
    },
    activities: [
      {
        id: "de-c1-3-act-1",
        type: "order-sentence",
        instruction: "Ordne die komplexen Satzteile logisch",
        correctOrder: [
          "Die Studie,",
          "die 2023 veröffentlicht wurde,",
          "zeigt einen kausalen Zusammenhang,",
          "obwohl weitere Replikation nötig ist."
        ],
        scrambled: [
          "obwohl weitere Replikation nötig ist.",
          "zeigt einen kausalen Zusammenhang,",
          "die 2023 veröffentlicht wurde,",
          "Die Studie,"
        ],
        hint: "Relativsatz nach Komma, Hauptsatz dann Nebensatz",
      },
      {
        id: "de-c1-3-act-2",
        type: "multiple-choice",
        question: "Welcher Satz verwendet wissenschaftliche Sprache korrekt?",
        correctAnswer: "Die empirische Evidenz deutet auf eine Korrelation hin",
        options: [
          "Die Studie zeigt, dass es vielleicht einen Zusammenhang gibt",
          "Die empirische Evidenz deutet auf eine Korrelation hin",
          "Ich glaube, das ist so",
          "Das ist wahrscheinlich richtig",
        ],
        hint: "Uses precise scientific terminology",
        explanation: "Uses precise scientific terminology and hedging language",
      },
      {
        id: "de-c1-3-act-3",
        type: "translate",
        question: "Übersetze: 'The hypothesis was validated through empirical methods'",
        correctAnswer: "Die Hypothese wurde durch empirische Methoden validiert",
        hint: "Use passive voice + scientific connectors",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `You are teaching German C1 - Science & Research.
Current lesson vocabulary: die Hypothese, die Methode, empirisch, die Evidenz, validieren, replizieren
Current lesson phrases: Die Hypothese wurde durch empirische Methoden validiert. / Die Evidenz deutet auf eine Korrelation hin.

TEACHING MODE:
1. Teach scientific vocabulary
2. Explain complex sentence structures
3. Ask about research methods
STOP after the question.

Stay STRICTLY within lesson vocabulary.`,
      introMessage: "Lass uns über ein wissenschaftliches Thema diskutieren. Welche Forschung interessiert dich?",
      topics: ["science", "research", "academic writing", "critical thinking"],
      fallbackResponses: ["Sehr präzise formuliert!", "Das ist eine wichtige methodische Überlegung!", "Ausgezeichnete wissenschaftliche Argumentation!"],
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