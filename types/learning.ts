export type LanguageCode = "es" | "fr" | "ja" | "ko" | "de" | "zh";

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
  learners: string;
}

export type ActivityType =
  | "vocabulary"
  | "translate"
  | "multiple-choice"
  | "listen"
  | "flashcard"
  | "fill-blank"
  | "match"
  | "order-sentence"
  | "dialogue"
  | "pronunciation"
  | "image-vocab"
  | "grammar-drill"
  | "listening-comprehension";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation: string;
  emoji?: string;
  imageUrl?: string;
  audioUrl?: string;
  example?: string;
}

export interface Phrase {
  text: string;
  translation: string;
  pronunciation: string;
}

export interface MultipleChoiceActivity {
  id: string;
  type: "multiple-choice";
  question: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
  explanation?: string;
  audioUrl?: string;
}

export interface FlashcardActivity {
  id: string;
  type: "flashcard";
  question: string;
  correctAnswer: string;
  options?: string[];
  hint?: string;
  front?: string;
  back?: string;
  audioUrl?: string;
  example?: string;
  imageUrl?: string;
}

export interface TranslateActivity {
  id: string;
  type: "translate";
  question: string;
  correctAnswer: string;
  hint?: string;
}

export interface ListenActivity {
  id: string;
  type: "listen";
  question: string;
  correctAnswer: string;
  hint?: string;
}

export interface FillBlankActivity {
  id: string;
  type: "fill-blank";
  sentence: string;
  blank: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
}

export interface MatchActivity {
  id: string;
  type: "match";
  instruction: string;
  pairs: Array<{ id: string; left: string; right: string; audioUrl?: string }>;
  shuffle?: boolean;
}

export interface OrderSentenceActivity {
  id: string;
  type: "order-sentence";
  instruction: string;
  correctOrder: string[];
  scrambled: string[];
  hint?: string;
}

export interface DialogueActivity {
  id: string;
  type: "dialogue";
  context: string;
  lines: Array<{
    speaker: "user" | "ai" | "character";
    text: string;
    isBlank?: boolean;
    options?: string[];
    correctAnswer?: string;
  }>;
}

export interface PronunciationActivity {
  id: string;
  type: "pronunciation";
  targetPhrase: string;
  phoneticHint?: string;
  difficulty: "easy" | "medium" | "hard";
  tolerance: "strict" | "normal" | "lenient";
}

export interface ImageVocabActivity {
  id: string;
  type: "image-vocab";
  imageUrl: string;
  question: string;
  options: string[];
  correctAnswer: string;
  audioUrl?: string;
}

export interface GrammarDrillActivity {
  id: string;
  type: "grammar-drill";
  rule: string;
  examples: string[];
  exercises: Array<{
    prompt: string;
    correctAnswer: string;
    options?: string[];
    hint?: string;
  }>;
}

export interface ListeningComprehensionActivity {
  id: string;
  type: "listening-comprehension";
  audioUrl: string;
  transcript: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: string;
  }>;
}

// Union type for all activities
export type Activity =
  | MultipleChoiceActivity
  | FlashcardActivity
  | TranslateActivity
  | ListenActivity
  | FillBlankActivity
  | MatchActivity
  | OrderSentenceActivity
  | DialogueActivity
  | PronunciationActivity
  | ImageVocabActivity
  | GrammarDrillActivity
  | ListeningComprehensionActivity;

export interface LessonGoal {
  description: string;
  xpReward: number;
}

export interface AITeacherPrompt {
  systemPrompt: string;
  introMessage: string;
  topics: string[];
  fallbackResponses?: string[];
}

export interface GrammarTopic {
  topic: string;
  explanation: string;
  examples: string[];
  commonMistakes?: string[];
}

export interface CulturalNote {
  title: string;
  content: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  icon: string;
  level?: "A1" | "A2" | "B1" | "B2" | "C1";
  xpReward: number;
  estimatedMinutes?: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  activities: Activity[];
  aiTeacherPrompt: AITeacherPrompt;
  grammar?: GrammarTopic;
  culturalNote?: CulturalNote;
  prerequisites?: string[];
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
}