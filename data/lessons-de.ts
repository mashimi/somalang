import { Lesson } from "@/types/learning";

// ═══════════════════════════════════════════════════════════
// 🇩🇪 A1 - BEGINNER (MWANZISHI) - 5 Lessons
// ═══════════════════════════════════════════════════════════

export const GERMAN_A1_LESSONS: Lesson[] = [
  {
    id: "de-a1-lesson-1",
    unitId: "de-a1-unit-1",
    title: "Begrüßungen - Salamu",
    description: "Jifunze salamu za msingi za Kijerumani",
    icon: "👋",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 8,
    goals: [
      { description: "Kujua salamu za kila siku", xpReward: 10 },
      { description: "Kujitambulisha kwa Kijerumani", xpReward: 10 },
    ],
    vocabulary: [
      { word: "Hallo", translation: "Hujambo / Habari", pronunciation: "HAH-loh", emoji: "👋", example: "Hallo! Wie geht's? (Habari! U hali gani?)" },
      { word: "Guten Morgen", translation: "Habari za asubuhi", pronunciation: "GOO-ten MOR-gen", emoji: "🌅", example: "Guten Morgen! (Habari za asubuhi!)" },
      { word: "Guten Tag", translation: "Habari za mchana", pronunciation: "GOO-ten TAHK", emoji: "☀️", example: "Guten Tag, Herr Müller." },
      { word: "Guten Abend", translation: "Habari za jioni", pronunciation: "GOO-ten AH-bent", emoji: "🌆", example: "Guten Abend! (Habari za jioni!)" },
      { word: "Auf Wiedersehen", translation: "Kwaheri", pronunciation: "owf VEE-der-zay-en", emoji: "👋", example: "Auf Wiedersehen! Bis morgen." },
      { word: "Tschüss", translation: "Kwaheri (ya kirafiki)", pronunciation: "choos", emoji: "✌️", example: "Tschüss! Bis bald!" },
      { word: "Ich heiße...", translation: "Naitwa...", pronunciation: "ikh HY-suh", emoji: "📛", example: "Ich heiße Amina." },
      { word: "Wie heißt du?", translation: "Unaitwa nani?", pronunciation: "vee heyst doo", emoji: "❓", example: "Hallo! Wie heißt du?" },
    ],
    phrases: [
      { text: "Hallo! Ich heiße Anna.", translation: "Habari! Naitwa Anna.", pronunciation: "HAH-loh! ikh HY-suh AH-nah." },
      { text: "Wie heißt du?", translation: "Unaitwa nani?", pronunciation: "Vee heyst doo?" },
      { text: "Freut mich!", translation: "Nafurahi kukutana nawe!", pronunciation: "Froyt mikh!" },
      { text: "Woher kommst du?", translation: "Unatoka wapi?", pronunciation: "VOH-hair komst doo?" },
    ],
    grammar: {
      topic: "Vivumishi vya nafsi (Personalpronomen)",
      explanation: "Kijerumani kina vivumishi tofauti kwa 'mimi', 'wewe', 'yeye' - kama Kiswahili lakini na matamshi tofauti.",
      examples: [
        "Ich bin Student. (Mimi ni mwanafunzi.)",
        "Du bist nett. (Wewe ni mpole.)",
        "Er ist Lehrer. (Yeye ni mwalimu - mwanaume).",
        "Sie ist Lehrerin. (Yeye ni mwalimu - mwanamke).",
      ],
      commonMistakes: [
        "Usichanganye 'du' (rafiki) na 'Sie' (rasmi/heshima) - kama 'wewe' vs 'Shikamoo'",
      ],
    },
    culturalNote: {
      title: "Utamaduni wa Ujerumani 🇩🇪",
      content: "Wajerumani husema 'Hallo' kwa marafiki, lakini 'Guten Tag' kwa watu wasiowajua au wazee. Hii ni kama tofauti ya 'Habari' na 'Shikamoo' katika Kiswahili!",
    },
    activities: [
      {
        id: "de-a1-1-mc1",
        type: "multiple-choice",
        question: "Unasemaje 'Hello' kwa Kijerumani?",
        correctAnswer: "Hallo",
        options: ["Tschüss", "Hallo", "Danke", "Bitte"],
        hint: "Ni salamu ya kawaida",
      },
      {
        id: "de-a1-1-fc1",
        type: "flashcard",
        question: "Guten Morgen inamaanisha nini?",
        correctAnswer: "Habari za asubuhi",
        options: ["Habari za jioni", "Habari za asubuhi", "Habari za mchana", "Kwaheri"],
      },
      {
        id: "de-a1-1-match1",
        type: "match",
        instruction: "Unganisha salamu ya Kijerumani na maana yake ya Kiswahili",
        pairs: [
          { id: "1", left: "Hallo", right: "Habari" },
          { id: "2", left: "Tschüss", right: "Kwaheri" },
          { id: "3", left: "Guten Morgen", right: "Habari za asubuhi" },
          { id: "4", left: "Ich heiße", right: "Naitwa" },
        ],
      },
      {
        id: "de-a1-1-pron1",
        type: "pronunciation",
        targetPhrase: "Ich heiße Anna",
        phoneticHint: "ikh HY-suh AH-nah",
        difficulty: "easy",
        tolerance: "lenient",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: `Wewe ni mwalimu wa Kijerumani anayezungumza Kiswahili. Fundisha somo la A1 - Salamu.
Maelekezo:
- Zungumza KISWAHILI zaidi, fundisha maneno ya Kijerumani polepole
- Linganisha na Kiswahili: "Kama 'habari' kwa Kiswahili, 'Hallo' kwa Kijerumani"
- Toa matamshi ya Kiswahili kwa maneno ya Kijerumani
- Sikiliza majibu ya mwanafunzi na urekebishe kwa upole

Mfano: "Karibu! Leo tutajifunza salamu za Kijerumani. Neno la kwanza ni 'Hallo' - linamaanisha 'habari'. Unaweza kusema 'Hallo'?"`,
      introMessage: "Habari! Karibu kwenye somo lako la kwanza la Kijerumani! Uko tayari kuanza?",
      topics: ["salamu", "kujitambulisha", "msingi"],
      fallbackResponses: ["Jaribu tena!", "Karibu sahihi!", "Vizuri sana!"],
    },
  },
  {
    id: "de-a1-lesson-2",
    unitId: "de-a1-unit-1",
    title: "Zahlen 1-20 - Namba",
    description: "Jifunze namba kutoka 1 hadi 20 kwa Kijerumani",
    icon: "🔢",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 10,
    goals: [{ description: "Kuhesabu hadi 20 kwa Kijerumani", xpReward: 20 }],
    vocabulary: [
      { word: "eins", translation: "moja", pronunciation: "ayns", emoji: "1️⃣" },
      { word: "zwei", translation: "mbili", pronunciation: "tsvye", emoji: "2️⃣" },
      { word: "drei", translation: "tatu", pronunciation: "dry", emoji: "3️⃣" },
      { word: "vier", translation: "nne", pronunciation: "feer", emoji: "4️⃣" },
      { word: "fünf", translation: "tano", pronunciation: "fuenf", emoji: "5️⃣" },
      { word: "sechs", translation: "sita", pronunciation: "zex", emoji: "6️⃣" },
      { word: "sieben", translation: "saba", pronunciation: "ZEE-ben", emoji: "7️⃣" },
      { word: "acht", translation: "nane", pronunciation: "ahkt", emoji: "8️⃣" },
      { word: "neun", translation: "tisa", pronunciation: "noyn", emoji: "9️⃣" },
      { word: "zehn", translation: "kumi", pronunciation: "tsayn", emoji: "🔟" },
    ],
    phrases: [
      { text: "Wie alt bist du?", translation: "Una umri gani?", pronunciation: "Vee ahlt bist doo?" },
      { text: "Ich bin zwanzig Jahre alt.", translation: "Nina miaka ishirini.", pronunciation: "Ikh bin TSVAN-tsikh YAH-re ahlt." },
    ],
    grammar: {
      topic: "Namba katika sentensi",
      explanation: "Namba za Kijerumani hutumika kama za Kiswahili - zinakuja kabla ya nomino.",
      examples: [
        "Ich habe drei Brüder. (Nina kaka watatu.)",
        "Sie ist acht Jahre alt. (Ana miaka minane.)",
      ],
    },
    culturalNote: {
      title: "Kuhesabu kwa Kijerumani 🇩🇪",
      content: "Kumbuka: Kijerumani 'zwei' (mbili) inasikika kama 'tsvye', si 'zway'. Hii ni tofauti kubwa na Kiswahili!",
    },
    activities: [
      {
        id: "de-a1-2-mc1",
        type: "multiple-choice",
        question: "'Tano' kwa Kijerumani ni nini?",
        options: ["vier", "fünf", "sechs", "drei"],
        correctAnswer: "fünf",
      },
      {
        id: "de-a1-2-order1",
        type: "order-sentence",
        instruction: "Panga namba hizi kwa mpangilio sahihi",
        correctOrder: ["eins", "zwei", "drei", "vier", "fünf"],
        scrambled: ["drei", "eins", "fünf", "zwei", "vier"],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha namba za Kijerumani 1-20 kwa Kiswahili. Linganisha: 'Kama moja kwa Kiswahili, eins kwa Kijerumani (inasemeka ayns)'.",
      introMessage: "Habari! Leo tutajifunza kuhesabu kwa Kijerumani! Unaweza kuhesabu hadi kumi?",
      topics: ["namba", "kuhesabu", "umri"],
    },
  },
  {
    id: "de-a1-lesson-3",
    unitId: "de-a1-unit-1",
    title: "Farben & Gegenstände - Rangi na Vitu",
    description: "Jifunze rangi na vitu vya kila siku",
    icon: "🎨",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [
      { description: "Kujua rangi za msingi kwa Kijerumani", xpReward: 12 },
      { description: "Kujua vitu vya kila siku", xpReward: 13 },
    ],
    vocabulary: [
      { word: "rot", translation: "nyekundu", pronunciation: "roht", emoji: "🔴" },
      { word: "blau", translation: "bluu", pronunciation: "blow", emoji: "🔵" },
      { word: "grün", translation: "kijani", pronunciation: "groon", emoji: "🟢" },
      { word: "gelb", translation: "njano", pronunciation: "gelb", emoji: "🟡" },
      { word: "das Buch", translation: "kitabu", pronunciation: "dahs BOOKH", emoji: "📖" },
      { word: "der Tisch", translation: "meza", pronunciation: "dair TISH", emoji: "🪑" },
      { word: "die Lampe", translation: "taa", pronunciation: "dee LAM-peh", emoji: "💡" },
    ],
    phrases: [
      { text: "Das Buch ist rot.", translation: "Kitabu ni chekundu.", pronunciation: "Dahs BOOKH ist roht." },
      { text: "Welche Farbe ist das?", translation: "Hii ni rangi gani?", pronunciation: "VEL-kheh FAR-beh ist dahs?" },
    ],
    grammar: {
      topic: "Vifungu vya jinsia (Artikel: der, die, das)",
      explanation: "Kijerumani kina jinsia tatu za nomino: der (kiume), die (kike), das (kisicho na jinsia). Hii ni tofauti na Kiswahili ambacho hakina jinsia za nomino!",
      examples: [
        "der Tisch (meza) - kiume",
        "die Lampe (taa) - kike",
        "das Buch (kitabu) - kisicho na jinsia",
      ],
      commonMistakes: ["Lazima ukariri jinsia ya kila neno - hakuna kanuni kamili!"],
    },
    activities: [
      {
        id: "de-a1-3-mc1",
        type: "multiple-choice",
        question: "'Nyekundu' kwa Kijerumani ni nini?",
        options: ["blau", "grün", "rot", "gelb"],
        correctAnswer: "rot",
      },
      {
        id: "de-a1-3-match1",
        type: "match",
        instruction: "Unganisha neno na kifungu chake sahihi",
        pairs: [
          { id: "1", left: "Tisch", right: "der" },
          { id: "2", left: "Lampe", right: "die" },
          { id: "3", left: "Buch", right: "das" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha rangi na vitu vya Kijerumani kwa Kiswahili. Eleza dhana ya 'der/die/das' - jinsia tatu za Kijerumani, tofauti na Kiswahili.",
      introMessage: "Habari! Leo tutajifunza rangi na vitu. Tayari?",
      topics: ["rangi", "vitu", "artikel"],
    },
  },
  {
    id: "de-a1-lesson-4",
    unitId: "de-a1-unit-1",
    title: "Familie - Familia",
    description: "Maneno ya familia kwa Kijerumani",
    icon: "👨‍👩‍👧",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [
      { description: "Kujua wanachama wa familia kwa Kijerumani", xpReward: 15 },
      { description: "Kuzungumza kuhusu familia yako", xpReward: 10 },
    ],
    vocabulary: [
      { word: "die Mutter", translation: "mama", pronunciation: "dee MOO-ter", emoji: "👩" },
      { word: "der Vater", translation: "baba", pronunciation: "dair FAH-ter", emoji: "👨" },
      { word: "die Schwester", translation: "dada", pronunciation: "dee SHVES-ter", emoji: "👧" },
      { word: "der Bruder", translation: "kaka", pronunciation: "dair BROO-der", emoji: "👦" },
      { word: "das Kind", translation: "mtoto", pronunciation: "dahs KINT", emoji: "👶" },
      { word: "die Familie", translation: "familia", pronunciation: "dee fah-MEE-lyeh", emoji: "👨‍👩‍👧‍👦" },
      { word: "die Großmutter", translation: "bibi", pronunciation: "dee GROHS-moo-ter", emoji: "👵" },
      { word: "der Großvater", translation: "babu", pronunciation: "dair GROHS-fah-ter", emoji: "👴" },
    ],
    phrases: [
      { text: "Das ist meine Mutter.", translation: "Huyu ni mama yangu.", pronunciation: "Dahs ist MEYE-neh MOO-ter." },
      { text: "Ich habe zwei Brüder.", translation: "Nina kaka wawili.", pronunciation: "Ikh HAH-beh tsvye BROO-der." },
    ],
    grammar: {
      topic: "Vivumishi vya kumiliki (Possessivartikel)",
      explanation: "Kijerumani hutumia 'mein' (wangu), 'dein' (wako) - vinabadilika kulingana na jinsia ya nomino.",
      examples: [
        "mein Vater (baba yangu)",
        "meine Mutter (mama yangu)",
        "mein Bruder (kaka yangu)",
      ],
    },
    activities: [
      {
        id: "de-a1-4-mc1",
        type: "multiple-choice",
        question: "'Mama' kwa Kijerumani ni nini?",
        options: ["der Vater", "die Mutter", "die Schwester", "das Kind"],
        correctAnswer: "die Mutter",
      },
      {
        id: "de-a1-4-dialogue1",
        type: "dialogue",
        context: "Unakutana na rafiki mpya na kuzungumzia familia",
        lines: [
          { speaker: "ai", text: "Hallo! Wie heißt du?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ich heiße Juma", "Ich bin Student", "Ich komme aus Tansania"], correctAnswer: "Ich heiße Juma" },
          { speaker: "ai", text: "Hast du Geschwister?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ich habe eine Schwester", "Nein", "Ich habe einen Hund"], correctAnswer: "Ja, ich habe eine Schwester" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha familia ya Kijerumani kwa Kiswahili. Linganisha: 'Kama mama kwa Kiswahili, Mutter kwa Kijerumani'.",
      introMessage: "Habari! Leo tutajifunza maneno ya familia. Una ndugu?",
      topics: ["familia", "ndugu", "wazazi"],
    },
  },
  {
    id: "de-a1-lesson-5",
    unitId: "de-a1-unit-1",
    title: "Essen & Trinken - Chakula na Vinywaji",
    description: "Agiza chakula kwa Kijerumani",
    icon: "🍽️",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [
      { description: "Kujua maneno ya chakula na vinywaji", xpReward: 15 },
      { description: "Kuagiza chakula kwa Kijerumani", xpReward: 10 },
    ],
    vocabulary: [
      { word: "das Wasser", translation: "maji", pronunciation: "dahs VAH-ser", emoji: "💧" },
      { word: "der Kaffee", translation: "kahawa", pronunciation: "dair KAF-ee", emoji: "☕" },
      { word: "das Brot", translation: "mkate", pronunciation: "dahs BROHT", emoji: "🍞" },
      { word: "der Apfel", translation: "tofaa", pronunciation: "dair AP-fel", emoji: "🍎" },
      { word: "die Milch", translation: "maziwa", pronunciation: "dee MILKH", emoji: "🥛" },
      { word: "lecker", translation: "tamu/nzuri", pronunciation: "LEK-er", emoji: "😋" },
    ],
    phrases: [
      { text: "Ich möchte Wasser, bitte.", translation: "Ningependa maji, tafadhali.", pronunciation: "Ikh MERKH-te VAH-ser, BIT-eh." },
      { text: "Das ist lecker!", translation: "Hii ni tamu!", pronunciation: "Dahs ist LEK-er!" },
    ],
    grammar: {
      topic: "Kitenzi 'möchten' (kungependa)",
      explanation: "'möchten' hutumika kuomba kwa upole - kama 'ningependa' kwa Kiswahili.",
      examples: [
        "Ich möchte Wasser. (Ningependa maji.)",
        "Ich möchte Kaffee. (Ningependa kahawa.)",
      ],
    },
    activities: [
      {
        id: "de-a1-5-mc1",
        type: "multiple-choice",
        question: "'Maji' kwa Kijerumani ni nini?",
        options: ["Kaffee", "Wasser", "Milch", "Brot"],
        correctAnswer: "Wasser",
      },
      {
        id: "de-a1-5-match1",
        type: "match",
        instruction: "Unganisha neno la Kijerumani na maana yake ya Kiswahili",
        pairs: [
          { id: "1", left: "Wasser", right: "maji" },
          { id: "2", left: "Kaffee", right: "kahawa" },
          { id: "3", left: "Brot", right: "mkate" },
          { id: "4", left: "Apfel", right: "tofaa" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha chakula na vinywaji vya Kijerumani kwa Kiswahili. Mfano wa mazungumzo ya mgahawa.",
      introMessage: "Habari! Leo tutajifunza kuagiza chakula kwa Kijerumani!",
      topics: ["chakula", "vinywaji", "mgahawa"],
    },
  },
];

// ═══════════════════════════════════════════════════════════
// 🇩🇪 A2 - ELEMENTARY (MSINGI) - 3 Lessons
// ═══════════════════════════════════════════════════════════

export const GERMAN_A2_LESSONS: Lesson[] = [
  {
    id: "de-a2-lesson-1",
    unitId: "de-a2-unit-1",
    title: "Im Restaurant - Mgahawani",
    description: "Agiza chakula na vinywaji kwa urahisi",
    icon: "🍽️",
    level: "A2",
    xpReward: 30,
    estimatedMinutes: 12,
    goals: [
      { description: "Kuagiza chakula kwa ujasiri", xpReward: 15 },
      { description: "Kulipa bili kwa Kijerumani", xpReward: 15 },
    ],
    vocabulary: [
      { word: "die Speisekarte", translation: "menyu", pronunciation: "dee SHPEYE-zuh-kar-tuh", emoji: "📖" },
      { word: "bestellen", translation: "kuagiza", pronunciation: "buh-SHTEL-en", emoji: "📝" },
      { word: "der Kellner", translation: "mhudumu", pronunciation: "dair KEL-ner", emoji: "👨‍🍳" },
      { word: "die Rechnung", translation: "bili", pronunciation: "dee REKH-noong", emoji: "💰" },
      { word: "Ich hätte gern", translation: "Ningependa (polite)", pronunciation: "ikh HET-uh gairn", emoji: "🙋" },
    ],
    phrases: [
      { text: "Die Speisekarte, bitte.", translation: "Menyu, tafadhali.", pronunciation: "Dee SHPEYE-zuh-kar-tuh, BIT-eh." },
      { text: "Die Rechnung, bitte.", translation: "Bili, tafadhali.", pronunciation: "Dee REKH-noong, BIT-eh." },
    ],
    grammar: {
      topic: "Kitenzi 'möchten' (kungependa) - A2",
      explanation: "'möchten' hutumika kuomba kwa upole - kama 'ningependa' kwa Kiswahili.",
      examples: [
        "Ich möchte Wasser. (Ningependa maji.)",
        "Möchten Sie bestellen? (Ungependa kuagiza?)",
      ],
    },
    culturalNote: {
      title: "Desturi ya Mgahawa Ujerumani 🇩🇪",
      content: "Ujerumani, mhudumu hakupeleki bili moja kwa moja - lazima uombe 'Die Rechnung, bitte'. Tofauti na Tanzania ambapo bili huletwa mara moja!",
    },
    activities: [
      {
        id: "de-a2-1-dialogue1",
        type: "dialogue",
        context: "Uko mgahawani na ungependa kuagiza",
        lines: [
          { speaker: "ai", text: "Guten Abend! Haben Sie schon gewählt?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ich hätte gern die Suppe", "Nein", "Das ist teuer"], correctAnswer: "Ja, ich hätte gern die Suppe" },
          { speaker: "ai", text: "Möchten Sie etwas zu trinken?" },
          { speaker: "user", text: "", isBlank: true, options: ["Ja, ein Wasser, bitte", "Nein, danke"], correctAnswer: "Ja, ein Wasser, bitte" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Jifanya ni mhudumu wa Kijerumani. Mwanafunzi aagize chakula. Fundisha maneno ya mgahawa kwa Kiswahili.",
      introMessage: "Karibu mgahawani! Ningependa kukusaidia kuagiza. Umechagua?",
      topics: ["mgahawa", "kuagiza", "polite"],
    },
  },
  {
    id: "de-a2-lesson-2",
    unitId: "de-a2-unit-1",
    title: "Einkaufen - Ununuzi",
    description: "Nunua vitu sokoni na dukani",
    icon: "🛍️",
    level: "A2",
    xpReward: 30,
    estimatedMinutes: 12,
    goals: [
      { description: "Kuuliza bei kwa Kijerumani", xpReward: 15 },
      { description: "Kununua vitu sokoni", xpReward: 15 },
    ],
    vocabulary: [
      { word: "der Markt", translation: "soko", pronunciation: "dair MARKT", emoji: "🏪" },
      { word: "kaufen", translation: "kununua", pronunciation: "KOW-fen", emoji: "🛒" },
      { word: "teuer", translation: "ghali", pronunciation: "TOY-er", emoji: "💸" },
      { word: "billig", translation: "rahisi", pronunciation: "BILL-ikh", emoji: "💰" },
      { word: "Wie viel kostet das?", translation: "Hii inagharimu kiasi gani?", pronunciation: "vee feel KOS-tet dahs", emoji: "❓" },
    ],
    phrases: [
      { text: "Wie viel kostet das?", translation: "Hii inagharimu kiasi gani?", pronunciation: "Vee feel KOS-tet dahs?" },
      { text: "Das ist zu teuer!", translation: "Hii ni ghali sana!", pronunciation: "Dahs ist tsoo TOY-er!" },
    ],
    activities: [
      {
        id: "de-a2-2-tr1",
        type: "translate",
        question: "Tafsiri: 'Hii inagharimu kiasi gani?'",
        correctAnswer: "Wie viel kostet das?",
      },
      {
        id: "de-a2-2-mc1",
        type: "multiple-choice",
        question: "'Soko' kwa Kijerumani ni nini?",
        options: ["der Laden", "der Markt", "das Geschäft", "die Straße"],
        correctAnswer: "der Markt",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha ununuzi kwa Kijerumani. Linganisha na soko la Tanzania.",
      introMessage: "Karibu sokoni! Leo tutajifunza kununua kwa Kijerumani.",
      topics: ["ununuzi", "bei", "soko"],
    },
  },
  {
    id: "de-a2-lesson-3",
    unitId: "de-a2-unit-1",
    title: "Tagesablauf - Mazoea ya Kila Siku",
    description: "Eleza siku yako kwa Kijerumani",
    icon: "🌅",
    level: "A2",
    xpReward: 30,
    estimatedMinutes: 12,
    goals: [
      { description: "Kueleza mazoea ya kila siku", xpReward: 15 },
      { description: "Kutumia vitenzi vinavyotenganishwa", xpReward: 15 },
    ],
    vocabulary: [
      { word: "aufstehen", translation: "kuamka", pronunciation: "OWF-shtay-en", emoji: "⏰" },
      { word: "arbeiten", translation: "kufanya kazi", pronunciation: "AR-bite-en", emoji: "💼" },
      { word: "essen", translation: "kula", pronunciation: "ES-en", emoji: "🍽️" },
      { word: "schlafen", translation: "kulala", pronunciation: "SHLAH-fen", emoji: "😴" },
    ],
    phrases: [
      { text: "Ich stehe um 7 Uhr auf.", translation: "Naamka saa 7.", pronunciation: "Ikh SHTEY-uh oom ZEE-ben OOR owf." },
      { text: "Er arbeitet bis 17 Uhr.", translation: "Anafanya kazi hadi saa 5 jioni.", pronunciation: "Air AR-bite-et bis zeek-tsayn OOR." },
    ],
    grammar: {
      topic: "Vitenzi vinavyotenganishwa (Trennbare Verben)",
      explanation: "Baadhi ya vitenzi vya Kijerumani vinatenganishwa: sehemu moja mwanzo, sehemu nyingine mwisho!",
      examples: [
        "Ich stehe um 7 Uhr auf. (Naamka saa 7.)",
        "Er ruft mich an. (Ananipigia simu.)",
      ],
      commonMistakes: ["Usisahau sehemu ya mwisho ya kitenzi!"],
    },
    activities: [
      {
        id: "de-a2-3-order1",
        type: "order-sentence",
        instruction: "Panga sentensi hii kwa mpangilio sahihi",
        correctOrder: ["Ich", "stehe", "um sieben Uhr", "auf"],
        scrambled: ["auf", "Ich", "um sieben Uhr", "stehe"],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha mazoea ya kila siku kwa Kijerumani kwa Kiswahili.",
      introMessage: "Habari za asubuhi! Eleza siku yako kwa Kijerumani.",
      topics: ["mazoea", "saa", "kila siku"],
    },
  },
];

// ═══════════════════════════════════════════════════════════
// 🇩🇪 B1 - INTERMEDIATE (WASTANI) - 2 Lessons
// ═══════════════════════════════════════════════════════════

export const GERMAN_B1_LESSONS: Lesson[] = [
  {
    id: "de-b1-lesson-1",
    unitId: "de-b1-unit-1",
    title: "Reisen und Urlaub - Kusafiri",
    description: "Zungumzia safari na likizo",
    icon: "✈️",
    level: "B1",
    xpReward: 35,
    estimatedMinutes: 15,
    goals: [
      { description: "Kueleza safari zako kwa Kijerumani", xpReward: 20 },
      { description: "Kutumia wakati uliopita (Perfekt)", xpReward: 15 },
    ],
    vocabulary: [
      { word: "die Reise", translation: "safari", pronunciation: "dee REYE-zuh", emoji: "🧳" },
      { word: "der Urlaub", translation: "likizo", pronunciation: "dair OOOR-lowp", emoji: "🏖️" },
      { word: "buchen", translation: "kuhifadhi", pronunciation: "BOO-khen", emoji: "📅" },
      { word: "das Flugzeug", translation: "ndege", pronunciation: "dahs FLOOK-tsoyk", emoji: "✈️" },
      { word: "das Hotel", translation: "hoteli", pronunciation: "dahs ho-TEL", emoji: "🏨" },
    ],
    phrases: [
      { text: "Ich bin nach Berlin gereist.", translation: "Nimesafiri kwenda Berlin.", pronunciation: "Ikh bin nakh BER-leen guh-REYST." },
      { text: "Wir haben ein Hotel gebucht.", translation: "Tumehifadhi hoteli.", pronunciation: "Veer HAH-ben ayn ho-TEL guh-BOOKHT." },
    ],
    grammar: {
      topic: "Wakati Uliopita (Perfekt)",
      explanation: "Kijerumani hutumia 'haben' au 'sein' + kitenzi kwa wakati uliopita.",
      examples: [
        "Ich bin nach Berlin gereist. (Nimesafiri kwenda Berlin.)",
        "Wir haben ein Hotel gebucht. (Tumehifadhi hoteli.)",
      ],
    },
    culturalNote: {
      title: "Utamaduni wa Kusafiri 🇩🇪",
      content: "Wajerumani wanapenda kusafiri sana! 'Reisefieber' (homa ya safari) ni msisimko kabla ya safari. Kumbuka: lazima uthibitishe tiketi ya treni kabla ya kupanda!",
    },
    activities: [
      {
        id: "de-b1-1-tr1",
        type: "translate",
        question: "Tafsiri: 'Tumehifadhi hoteli'",
        correctAnswer: "Wir haben ein Hotel gebucht",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha safari za Kijerumani kwa Kiswahili. Linganisha na safari za Tanzania.",
      introMessage: "Habari! Eleza safari yako ya mwisho kwa Kijerumani!",
      topics: ["safari", "likizo", "wakati uliopita"],
    },
  },
  {
    id: "de-b1-lesson-2",
    unitId: "de-b1-unit-1",
    title: "Gesundheit - Afya",
    description: "Zungumzia afya na mwili",
    icon: "🏥",
    level: "B1",
    xpReward: 35,
    estimatedMinutes: 15,
    goals: [
      { description: "Kueleza sehemu za mwili kwa Kijerumani", xpReward: 15 },
      { description: "Kuzungumza kuhusu afya", xpReward: 20 },
    ],
    vocabulary: [
      { word: "der Kopf", translation: "kichwa", pronunciation: "dair KOPF", emoji: "🗣️" },
      { word: "der Bauch", translation: "tumbo", pronunciation: "dair BOWKH", emoji: "🤢" },
      { word: "schmerzen", translation: "kuuma", pronunciation: "SHMERTS-en", emoji: "😣" },
      { word: "der Arzt", translation: "daktari", pronunciation: "dair ARTST", emoji: "👨‍⚕️" },
      { word: "die Apotheke", translation: "duka la dawa", pronunciation: "dee ah-po-TAY-keh", emoji: "💊" },
    ],
    phrases: [
      { text: "Mir tut der Kopf weh.", translation: "Kichwa kinauma.", pronunciation: "Meer toot dair KOPF vay." },
      { text: "Ich muss zum Arzt.", translation: "Lazima niende kwa daktari.", pronunciation: "Ikh moos tsoom ARTST." },
    ],
    grammar: {
      topic: "Sehemu ya tatu (Dativ) na sehemu za mwili",
      explanation: "Unapozungumzia sehemu ya mwili inayouma, tumia 'Mir tut der Kopf weh' (Kichwa kinauma).",
      examples: [
        "Mir tut der Kopf weh. (Kichwa kinauma.)",
        "Ihm schmerzt der Bauch. (Tumbo linamuuma.)",
      ],
    },
    activities: [
      {
        id: "de-b1-2-dialogue1",
        type: "dialogue",
        context: "Unajisikia vibaya na unazungumza na rafiki",
        lines: [
          { speaker: "ai", text: "Wie geht es dir heute?" },
          { speaker: "user", text: "", isBlank: true, options: ["Mir geht es nicht gut", "Ich bin glücklich"], correctAnswer: "Mir geht es nicht gut" },
          { speaker: "ai", text: "Was fehlt dir?" },
          { speaker: "user", text: "", isBlank: true, options: ["Mir tut der Kopf weh", "Ich habe Hunger"], correctAnswer: "Mir tut der Kopf weh" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha afya ya Kijerumani kwa Kiswahili. Eleza Dativ na sehemu za mwili.",
      introMessage: "Habari! U hali gani leo?",
      topics: ["afya", "mwili", "daktari"],
    },
  },
];

// ═══════════════════════════════════════════════════════════
// 🇩🇪 B2 - UPPER INTERMEDIATE (JUULI) - 1 Lesson
// ═══════════════════════════════════════════════════════════

export const GERMAN_B2_LESSONS: Lesson[] = [
  {
    id: "de-b2-lesson-1",
    unitId: "de-b2-unit-1",
    title: "Beruf - Kazi",
    description: "Zungumzia kazi na taaluma",
    icon: "💼",
    level: "B2",
    xpReward: 40,
    estimatedMinutes: 15,
    goals: [
      { description: "Kuzungumza kuhusu kazi kwa Kijerumani", xpReward: 20 },
      { description: "Kuandika maombi ya kazi", xpReward: 20 },
    ],
    vocabulary: [
      { word: "die Erfahrung", translation: "uzoefu", pronunciation: "dee air-FAH-roong", emoji: "📊" },
      { word: "die Bewerbung", translation: "maombi ya kazi", pronunciation: "dee buh-VER-boong", emoji: "📄" },
      { word: "das Vorstellungsgespräch", translation: "mahojiano ya kazi", pronunciation: "dahs FOR-shtel-oongs-guh-shprekh", emoji: "🤝" },
      { word: "sich bewerben", translation: "kuomba kazi", pronunciation: "zikh buh-VER-ben", emoji: "✉️" },
    ],
    phrases: [
      { text: "Ich habe fünf Jahre Erfahrung.", translation: "Nina uzoefu wa miaka mitano.", pronunciation: "Ikh HAH-beh fuenf YAH-reh air-FAH-roong." },
      { text: "Ich möchte mich bewerben.", translation: "Ningependa kuomba kazi.", pronunciation: "Ikh MERKH-te mikh buh-VER-ben." },
    ],
    grammar: {
      topic: "Vitenzi vya kujirejelea (Reflexive Verben)",
      explanation: "Baadhi ya vitenzi huhitaji kivumishi cha kujirejelea (mich, dich, sich).",
      examples: [
        "Ich bewerbe mich. (Ninaomba kazi.)",
        "Er interessiert sich für Technik. (Anavutiwa na teknolojia.)",
      ],
    },
    culturalNote: {
      title: "Maombi ya Kazi Ujerumani 🇩🇪",
      content: "Maombi ya Kijerumani huhitaji 'Lebenslauf' (CV) na 'Anschreiben' (barua ya maombi). Picha kwenye CV bado ni za kawaida!",
    },
    activities: [
      {
        id: "de-b2-1-dialogue1",
        type: "dialogue",
        context: "Mahojiano ya kazi",
        lines: [
          { speaker: "ai", text: "Erzählen Sie mir von Ihrer Berufserfahrung." },
          { speaker: "user", text: "", isBlank: true, options: ["Ich habe fünf Jahre Erfahrung im Marketing", "Ich mag Pizza"], correctAnswer: "Ich habe fünf Jahre Erfahrung im Marketing" },
        ],
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha lugha ya kazi ya Kijerumani kwa Kiswahili. Jifanya ni mwajiri.",
      introMessage: "Guten Tag! Karibu kwenye mahojiano. Eleza uzoefu wako.",
      topics: ["kazi", "taaluma", "mahojiano"],
    },
  },
];

// ═══════════════════════════════════════════════════════════
// 🇩🇪 C1 - ADVANCED (MAHARI) - 1 Lesson
// ═══════════════════════════════════════════════════════════

export const GERMAN_C1_LESSONS: Lesson[] = [
  {
    id: "de-c1-lesson-1",
    unitId: "de-c1-unit-1",
    title: "Aktuelle Ereignisse - Matukio ya Sasa",
    description: "Jadili mada changamano kwa Kijerumani",
    icon: "📰",
    level: "C1",
    xpReward: 45,
    estimatedMinutes: 18,
    goals: [
      { description: "Kujadili mada za sasa kwa Kijerumani", xpReward: 25 },
      { description: "Kutumia viunganishi vya hali ya juu", xpReward: 20 },
    ],
    vocabulary: [
      { word: "die Debatte", translation: "mdahalo", pronunciation: "dee deh-BAH-tuh", emoji: "🗣️" },
      { word: "kontrovers", translation: "mzozo", pronunciation: "kon-tro-VERS", emoji: "⚖️" },
      { word: "befürworten", translation: "kuunga mkono", pronunciation: "buh-FUUR-vor-ten", emoji: "👍" },
      { word: "ablehnen", translation: "kukataa", pronunciation: "AP-lay-nen", emoji: "👎" },
      { word: "die Perspektive", translation: "mtazamo", pronunciation: "dee per-spek-TEE-vuh", emoji: "👁️" },
    ],
    phrases: [
      { text: "Meiner Meinung nach ist das wichtig.", translation: "Kwa mtazamo wangu, hili ni muhimu.", pronunciation: "MEYE-ner MEYE-noong nakh ist dahs VIKH-tikh." },
      { text: "Einerseits... andererseits...", translation: "Kwa upande mmoja... kwa upande mwingine...", pronunciation: "EYE-ner-zyts... AN-der-zyts..." },
    ],
    grammar: {
      topic: "Viunganishi vya hali ya juu",
      explanation: "Tumia viunganishi changamano kwa hoja bora.",
      examples: [
        "Einerseits... andererseits... (Kwa upande mmoja... kwa upande mwingine...)",
        "Angesichts der Tatsache, dass... (Kwa kuzingatia ukweli kwamba...)",
      ],
    },
    culturalNote: {
      title: "Utamaduni wa Mdahalo Ujerumani 🇩🇪",
      content: "Wajerumani wanathamini usahihi na hoja nzito. 'Sachlichkeit' (usawa) ni muhimu zaidi kuliko hisia. Ukosoaji wa moja kwa moja ni wa kawaida!",
    },
    activities: [
      {
        id: "de-c1-1-tr1",
        type: "translate",
        question: "Tafsiri: 'Kwa mtazamo wangu, hili ni suala la mzozo'",
        correctAnswer: "Meiner Meinung nach ist das ein kontroverses Thema",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "Jadili mada changamano za sasa kwa Kijerumani. Tumia lugha ya kitaalamu.",
      introMessage: "Karibu! Leo tutajadili suala la sasa. Uko tayari?",
      topics: ["mdahalo", "siasa", "jamii"],
    },
  },
];

// Export all German lessons
export const ALL_GERMAN_LESSONS: Lesson[] = [
  ...GERMAN_A1_LESSONS,
  ...GERMAN_A2_LESSONS,
  ...GERMAN_B1_LESSONS,
  ...GERMAN_B2_LESSONS,
  ...GERMAN_C1_LESSONS,
];