import { Lesson } from "@/types/learning";

// ═══════════════════════════════════════════════════════════
// 🇩🇪 A1 - BEGINNER (MWANZISHI) - 15 Lessons
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
    goals: [{ description: "Kujua salamu za kila siku", xpReward: 10 }, { description: "Kujitambulisha", xpReward: 10 }],
    vocabulary: [
      { word: "Hallo", translation: "Habari / Hujambo", pronunciation: "HAH-loh", emoji: "👋" },
      { word: "Guten Morgen", translation: "Habari za asubuhi", pronunciation: "GOO-ten MOR-gen", emoji: "🌅" },
      { word: "Guten Tag", translation: "Habari za mchana", pronunciation: "GOO-ten TAHK", emoji: "☀️" },
      { word: "Auf Wiedersehen", translation: "Kwaheri", pronunciation: "owf VEE-der-zay-en", emoji: "👋" },
      { word: "Ich heiße", translation: "Naitwa", pronunciation: "ikh HY-suh", emoji: "📛" },
    ],
    phrases: [{ text: "Hallo! Ich heiße Anna.", translation: "Habari! Naitwa Anna.", pronunciation: "HAH-loh! ikh HY-suh AH-nah." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Wewe ni mwalimu wa Kijerumani anayezungumza Kiswahili. Fundisha salamu. Linganisha: 'Kama Habari kwa Kiswahili, Hallo kwa Kijerumani'. Uliza mwanafunzi ajaribu kusema neno.",
      introMessage: "Habari! Karibu kwenye somo lako la kwanza la Kijerumani! Uko tayari?",
      topics: ["salamu", "kujitambulisha"],
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
    goals: [{ description: "Kuhesabu hadi 20", xpReward: 20 }],
    vocabulary: [
      { word: "eins", translation: "moja", pronunciation: "ayns", emoji: "1️⃣" },
      { word: "zwei", translation: "mbili", pronunciation: "tsvye", emoji: "2️⃣" },
      { word: "drei", translation: "tatu", pronunciation: "dry", emoji: "3️⃣" },
      { word: "vier", translation: "nne", pronunciation: "feer", emoji: "4️⃣" },
      { word: "fünf", translation: "tano", pronunciation: "fuenf", emoji: "5️⃣" },
    ],
    phrases: [{ text: "Wie alt bist du?", translation: "Una umri gani?", pronunciation: "Vee ahlt bist doo?" }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha namba za Kijerumani kwa Kiswahili. Linganisha: 'Kama moja kwa Kiswahili, eins (inasemeka ayns) kwa Kijerumani'.",
      introMessage: "Habari! Leo tutajifunza kuhesabu kwa Kijerumani! Unaweza kuhesabu hadi tano?",
      topics: ["namba", "kuhesabu", "umri"],
    },
  },
  {
    id: "de-a1-lesson-3",
    unitId: "de-a1-unit-1",
    title: "Farben - Rangi",
    description: "Jifunze rangi za msingi kwa Kijerumani",
    icon: "🎨",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 8,
    goals: [{ description: "Kutaja rangi 5", xpReward: 20 }],
    vocabulary: [
      { word: "rot", translation: "nyekundu", pronunciation: "roht", emoji: "🔴" },
      { word: "blau", translation: "bluu", pronunciation: "blow", emoji: "🔵" },
      { word: "grün", translation: "kijani", pronunciation: "groon", emoji: "🟢" },
      { word: "gelb", translation: "njano", pronunciation: "gelb", emoji: "🟡" },
      { word: "schwarz", translation: "nyeusi", pronunciation: "shvarts", emoji: "⚫" },
    ],
    phrases: [{ text: "Das Auto ist rot.", translation: "Gari ni nyekundu.", pronunciation: "Dahs OW-toh ist roht." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha rangi kwa Kijerumani. Eleza matamshi kwa Kiswahili. Uliza mwanafunzi arudie rangi ya kitu fulani.",
      introMessage: "Habari! Leo tutajifunza rangi. Rangi ya tofaa ni 'rot' (nyekundu). Unaweza kusema 'rot'?",
      topics: ["rangi", "vitu"],
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
    goals: [{ description: "Kutaja wanafamilia", xpReward: 25 }],
    vocabulary: [
      { word: "die Mutter", translation: "mama", pronunciation: "dee MOO-ter", emoji: "👩" },
      { word: "der Vater", translation: "baba", pronunciation: "dair FAH-ter", emoji: "👨" },
      { word: "die Schwester", translation: "dada", pronunciation: "dee SHVES-ter", emoji: "👧" },
      { word: "der Bruder", translation: "kaka", pronunciation: "dair BROO-der", emoji: "👦" },
      { word: "das Kind", translation: "mtoto", pronunciation: "dahs KINT", emoji: "👶" },
    ],
    phrases: [{ text: "Das ist meine Mutter.", translation: "Huyu ni mama yangu.", pronunciation: "Dahs ist MEYE-neh MOO-ter." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha familia ya Kijerumani kwa Kiswahili. Linganisha: 'Kama mama kwa Kiswahili, Mutter kwa Kijerumani'.",
      introMessage: "Habari! Leo tutajifunza maneno ya familia. Una kaka au dada?",
      topics: ["familia", "ndugu", "wazazi"],
    },
  },
  {
    id: "de-a1-lesson-5",
    unitId: "de-a1-unit-1",
    title: "Essen & Trinken - Chakula",
    description: "Jifunze maneno ya chakula na vinywaji",
    icon: "🍽️",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [{ description: "Kuagiza chakula kwa urahisi", xpReward: 25 }],
    vocabulary: [
      { word: "das Wasser", translation: "maji", pronunciation: "dahs VAH-ser", emoji: "💧" },
      { word: "der Kaffee", translation: "kahawa", pronunciation: "dair KAF-ee", emoji: "☕" },
      { word: "das Brot", translation: "mkate", pronunciation: "dahs BROHT", emoji: "🍞" },
      { word: "der Apfel", translation: "tofaa", pronunciation: "dair AP-fel", emoji: "🍎" },
      { word: "lecker", translation: "tamu/nzuri", pronunciation: "LEK-er", emoji: "😋" },
    ],
    phrases: [{ text: "Ich möchte Wasser, bitte.", translation: "Ningependa maji, tafadhali.", pronunciation: "Ikh MERKH-te VAH-ser, BIT-eh." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha chakula na vinywaji vya Kijerumani kwa Kiswahili. Mfano wa mazungumzo ya mgahawa.",
      introMessage: "Habari! Leo tutajifunza kuagiza chakula kwa Kijerumani! Unapenda kahawa?",
      topics: ["chakula", "vinywaji", "mgahawa"],
    },
  },
  {
    id: "de-a1-lesson-6",
    unitId: "de-a1-unit-1",
    title: "Wochentage - Siku za Wiki",
    description: "Jifunze siku za wiki kwa Kijerumani",
    icon: "📅",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 10,
    goals: [{ description: "Kutaja siku 7 za wiki", xpReward: 20 }],
    vocabulary: [
      { word: "Montag", translation: "Jumatatu", pronunciation: "MOHN-tahk", emoji: "1️⃣" },
      { word: "Dienstag", translation: "Jumanne", pronunciation: "DEENS-tahk", emoji: "2️⃣" },
      { word: "Mittwoch", translation: "Jumatano", pronunciation: "MIT-vokh", emoji: "3️⃣" },
      { word: "Donnerstag", translation: "Alhamisi", pronunciation: "DOH-ners-tahk", emoji: "4️⃣" },
      { word: "Freitag", translation: "Ijumaa", pronunciation: "FRY-tahk", emoji: "5️⃣" },
    ],
    phrases: [{ text: "Heute ist Montag.", translation: "Leo ni Jumatatu.", pronunciation: "HOY-teh ist MOHN-tahk." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha siku za wiki. Eleza kwamba 'Tag' inamaanisha 'siku'. Uliza mwanafunzi ni siku gani leo.",
      introMessage: "Habari! Leo ni siku gani? Kwa Kijerumani, 'Heute' inamaanisha 'leo'.",
      topics: ["siku za wiki", "muda"],
    },
  },
  {
    id: "de-a1-lesson-7",
    unitId: "de-a1-unit-1",
    title: "Hobbys - Mambo ya Kufurahia",
    description: "Jifunze kuzungumzia mambo unayoyapenda",
    icon: "⚽",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [{ description: "Kusema unachokipenda", xpReward: 25 }],
    vocabulary: [
      { word: "lesen", translation: "kusoma", pronunciation: "LAY-zen", emoji: "📖" },
      { word: "spielen", translation: "kucheza", pronunciation: "SHPEE-len", emoji: "⚽" },
      { word: "musikhören", translation: "kusikiliza muziki", pronunciation: "moo-ZIK-hur-en", emoji: "🎧" },
      { word: "schwimmen", translation: "kuogelea", pronunciation: "SHVIM-men", emoji: "🏊" },
      { word: "gern", translation: "kwa furaha / napenda", pronunciation: "gairn", emoji: "😊" },
    ],
    phrases: [{ text: "Ich spiele gern Fußball.", translation: "Napenda kucheza mpira.", pronunciation: "Ikh SHPEE-leh gairn FOOS-bal." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha mambo ya kufurahia. Eleza 'gern' inamaanisha 'napenda kufanya'. Uliza mwanafunzi anachokipenda.",
      introMessage: "Habari! Unapenda kufanya nini? Kwa Kijerumani, 'Ich spiele gern' inamaanisha 'Napenda kucheza'.",
      topics: ["hobbies", "mambo ya kufurahia"],
    },
  },
  {
    id: "de-a1-lesson-8",
    unitId: "de-a1-unit-1",
    title: "Im Supermarkt - Kwenye Duka",
    description: "Jifunze maneno ya kununua dukani",
    icon: "🛒",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [{ description: "Kununuwa vitu dukani", xpReward: 25 }],
    vocabulary: [
      { word: "kaufen", translation: "kununua", pronunciation: "KOW-fen", emoji: "🛍️" },
      { word: "teuer", translation: "ghali", pronunciation: "TOY-er", emoji: "💸" },
      { word: "billig", translation: "rahisi", pronunciation: "BILL-ikh", emoji: "💰" },
      { word: "die Milch", translation: "maziwa", pronunciation: "dee MILKH", emoji: "🥛" },
      { word: "das Ei", translation: "yai", pronunciation: "dahs EYE", emoji: "🥚" },
    ],
    phrases: [{ text: "Ich kaufe Milch.", translation: "Ninanunua maziwa.", pronunciation: "Ikh KOW-feh MILKH." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha ununuzi kwa Kijerumani. Linganisha na duka la Tanzania. Eleza 'kaufen' ni 'kununua'.",
      introMessage: "Habari! Tuko dukani. 'Kaufen' inamaanisha 'kununua'. Unanunua nini leo?",
      topics: ["ununuzi", "duka", "bei"],
    },
  },
  {
    id: "de-a1-lesson-9",
    unitId: "de-a1-unit-1",
    title: "Kleidung - Nguo",
    description: "Jifunze maneno ya nguo na kuvaa",
    icon: "👕",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [{ description: "Kutaja nguo za msingi", xpReward: 25 }],
    vocabulary: [
      { word: "das Hemd", translation: "shati", pronunciation: "dahs HEMT", emoji: "👔" },
      { word: "die Hose", translation: "suruali", pronunciation: "dee HOH-zuh", emoji: "👖" },
      { word: "die Schuhe", translation: "viatu", pronunciation: "dee SHOO-eh", emoji: "👟" },
      { word: "tragen", translation: "kuvaa", pronunciation: "TRAH-gen", emoji: "👗" },
      { word: "neu", translation: "mpya", pronunciation: "noy", emoji: "✨" },
    ],
    phrases: [{ text: "Ich trage eine neue Hose.", translation: "Ninavaa suruali mpya.", pronunciation: "Ikh TRAH-geh EYE-neh NOY-eh HOH-zuh." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha nguo kwa Kijerumani. Eleza 'tragen' inamaanisha 'kuvaa'. Uliza mwanafunzi anavaa nini.",
      introMessage: "Habari! Unavaa nini leo? 'Tragen' inamaanisha 'kuvaa'.",
      topics: ["nguo", "kuvaa", "mtindo"],
    },
  },
  {
    id: "de-a1-lesson-10",
    unitId: "de-a1-unit-1",
    title: "Der Körper - Mwili",
    description: "Jifunze sehemu za msingi za mwili",
    icon: "🧍",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [{ description: "Kutaja sehemu 5 za mwili", xpReward: 25 }],
    vocabulary: [
      { word: "der Kopf", translation: "kichwa", pronunciation: "dair KOPF", emoji: "🗣️" },
      { word: "die Hand", translation: "mkono", pronunciation: "dee HANT", emoji: "✋" },
      { word: "das Auge", translation: "jicho", pronunciation: "dahs OW-geh", emoji: "👁️" },
      { word: "das Ohr", translation: "sikio", pronunciation: "dahs OHR", emoji: "👂" },
      { word: "der Fuß", translation: "mguu", pronunciation: "dair FOOS", emoji: "🦶" },
    ],
    phrases: [{ text: "Mein Kopf tut weh.", translation: "Kichwa kinauma.", pronunciation: "MYN KOPF toot vay." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha sehemu za mwili. Eleza 'tut weh' inamaanisha 'kinauma'.",
      introMessage: "Habari! Leo tutajifunza sehemu za mwili. 'Kopf' inamaanisha 'kichwa'. Gusa kichwa chako!",
      topics: ["mwili", "afya", "sehemu za mwili"],
    },
  },
  {
    id: "de-a1-lesson-11",
    unitId: "de-a1-unit-1",
    title: "Wetter - Hali ya Hewa",
    description: "Jifunze kuzungumzia hali ya hewa",
    icon: "🌤️",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 10,
    goals: [{ description: "Kuelezea hali ya hewa", xpReward: 25 }],
    vocabulary: [
      { word: "die Sonne", translation: "jua", pronunciation: "dee ZON-eh", emoji: "☀️" },
      { word: "der Regen", translation: "mvua", pronunciation: "dair REH-gen", emoji: "🌧️" },
      { word: "warm", translation: "joto", pronunciation: "varm", emoji: "🌡️" },
      { word: "kalt", translation: "baridi", pronunciation: "kahlt", emoji: "❄️" },
      { word: "der Schnee", translation: "theluji", pronunciation: "dair SHNAY", emoji: "⛄" },
    ],
    phrases: [{ text: "Heute ist es warm.", translation: "Leo kuna joto.", pronunciation: "HOY-teh ist es varm." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha hali ya hewa. Linganisha na hali ya hewa Tanzania. 'Warm' ni joto, 'kalt' ni baridi.",
      introMessage: "Habari! Hali ya hewa leo ni gani? 'Warm' inamaanisha 'joto'.",
      topics: ["hali ya hewa", "muda", "asili"],
    },
  },
  {
    id: "de-a1-lesson-12",
    unitId: "de-a1-unit-1",
    title: "Tiere - Wanyama",
    description: "Jifunze majina ya wanyama wa kawaida",
    icon: "🐶",
    level: "A1",
    xpReward: 20,
    estimatedMinutes: 8,
    goals: [{ description: "Kutaja wanyama 5", xpReward: 20 }],
    vocabulary: [
      { word: "der Hund", translation: "mbwa", pronunciation: "dair HOONT", emoji: "🐶" },
      { word: "die Katze", translation: "paka", pronunciation: "dee KAT-seh", emoji: "🐱" },
      { word: "der Vogel", translation: "ndege", pronunciation: "dair FOH-gel", emoji: "🐦" },
      { word: "das Pferd", translation: "farasi", pronunciation: "dahs PFAIRT", emoji: "🐴" },
      { word: "die Kuh", translation: "ng'ombe", pronunciation: "dee KOO", emoji: "🐄" },
    ],
    phrases: [{ text: "Ich habe einen Hund.", translation: "Nina mbwa.", pronunciation: "Ikh HAH-buh EYE-nen HOONT." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha wanyama kwa Kijerumani. Eleza matamshi kwa Kiswahili. Uliza mwanafunzi ana mnyama gani.",
      introMessage: "Habari! Unapenda wanyama? 'Hund' inamaanisha 'mbwa'. Una mbwa?",
      topics: ["wanyama", "asili"],
    },
  },
  {
    id: "de-a1-lesson-13",
    unitId: "de-a1-unit-1",
    title: "Wohnen - Makazi",
    description: "Jifunze maneno ya nyumba na vyumba",
    icon: "🏠",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [{ description: "Kutaja vyumba vya nyumba", xpReward: 25 }],
    vocabulary: [
      { word: "das Haus", translation: "nyumba", pronunciation: "dahs HOWS", emoji: "🏠" },
      { word: "die Wohnung", translation: "ghorofa/fleti", pronunciation: "dee VOH-noong", emoji: "🏢" },
      { word: "das Zimmer", translation: "chumba", pronunciation: "dahs TSI-mer", emoji: "🚪" },
      { word: "die Küche", translation: "jiko", pronunciation: "dee KUE-kheh", emoji: "🍳" },
      { word: "das Bad", translation: "bafu", pronunciation: "dahs BAHT", emoji: "🛁" },
    ],
    phrases: [{ text: "Die Küche ist groß.", translation: "Jiko ni kubwa.", pronunciation: "Dee KUE-kheh ist grohs." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha makazi na vyumba. Eleza 'Zimmer' ni 'chumba'. Uliza mwanafunzi ana vyumba vingapi.",
      introMessage: "Habari! Tuko nyumbani. 'Haus' inamaanisha 'nyumba'. Nyumba yako ni kubwa?",
      topics: ["makazi", "nyumba", "vyumba"],
    },
  },
  {
    id: "de-a1-lesson-14",
    unitId: "de-a1-unit-1",
    title: "Transport - Usafiri",
    description: "Jifunze maneno ya usafiri na kusafiri",
    icon: "🚌",
    level: "A1",
    xpReward: 25,
    estimatedMinutes: 12,
    goals: [{ description: "Kutaja njia za usafiri", xpReward: 25 }],
    vocabulary: [
      { word: "der Bus", translation: "basi", pronunciation: "dair BOOS", emoji: "🚌" },
      { word: "das Auto", translation: "gari", pronunciation: "dahs OW-toh", emoji: "🚗" },
      { word: "das Fahrrad", translation: "baiskeli", pronunciation: "dahs FAHR-raht", emoji: "🚲" },
      { word: "fahren", translation: "kusafiri/kuendesha", pronunciation: "FAH-ren", emoji: "🛣️" },
      { word: "der Bahnhof", translation: "kituo cha treni", pronunciation: "dair BAHN-hof", emoji: "🚉" },
    ],
    phrases: [{ text: "Ich fahre mit dem Bus.", translation: "Ninasafiri kwa basi.", pronunciation: "Ikh FAH-reh mit dem BOOS." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Fundisha usafiri. Linganisha na usafiri wa Tanzania (dala dala, bodaboda). 'Bus' ni basi.",
      introMessage: "Habari! Unasafiri vipi? 'Bus' inamaanisha 'basi'. Unasafiri kwa basi?",
      topics: ["usafiri", "kusafiri", "mji"],
    },
  },
  {
    id: "de-a1-lesson-15",
    unitId: "de-a1-unit-1",
    title: "Wiederholung A1 - Mazoezi",
    description: "Jaribu kila ulichojifunza katika A1",
    icon: "🏆",
    level: "A1",
    xpReward: 50,
    estimatedMinutes: 15,
    goals: [{ description: "Kukamilisha mazoezi ya A1", xpReward: 50 }],
    vocabulary: [
      { word: "wiederholen", translation: "kurudia/kujifunza tena", pronunciation: "VEE-der-ho-len", emoji: "🔄" },
      { word: "verstehen", translation: "kuelewa", pronunciation: "fair-SHTAY-en", emoji: "🧠" },
      { word: "sprechen", translation: "kuzungumza", pronunciation: "SHPREKH-en", emoji: "🗣️" },
    ],
    phrases: [{ text: "Ich verstehe gut.", translation: "Ninaelewa vizuri.", pronunciation: "Ikh fair-SHTAY-eh goot." }],
    activities: [],
    aiTeacherPrompt: {
      systemPrompt: "Hili ni somo la mazoezi. Uliza maswali yanayochanganya maneno ya A1. Sifu mwanafunzi kwa juhudi zake.",
      introMessage: "Habari! Umeimaliza A1! Hebu tujaribu kila ulichojifunza. Uko tayari?",
      topics: ["mazoezi", "A1", "kukumbuka"],
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