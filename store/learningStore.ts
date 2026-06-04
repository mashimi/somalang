import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface VocabularyItem {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
  nextReviewAt: string; // ISO string
}

interface LearningState {
  xpToday: number;
  dailyGoal: number;
  streak: number;
  completedLessonIds: string[];
  vocabularySRS: VocabularyItem[];

  // Actions
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  addVocabularyToSRS: (word: string, translation: string, pronunciation?: string, example?: string) => void;
  reviewVocabulary: (word: string, quality: number) => void; // 1-5 scale
  getDueVocabulary: () => VocabularyItem[];
  resetSRS: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      xpToday: 15,
      dailyGoal: 20,
      streak: 12,
      completedLessonIds: [],
      vocabularySRS: [],

      addXP: (amount) =>
        set((state) => ({
          xpToday: Math.min(state.xpToday + amount, state.dailyGoal),
        })),

      completeLesson: (lessonId) =>
        set((state) => ({
          completedLessonIds: state.completedLessonIds.includes(lessonId)
            ? state.completedLessonIds
            : [...state.completedLessonIds, lessonId],
        })),

      addVocabularyToSRS: (word, translation, pronunciation, example) => {
        const exists = get().vocabularySRS.find((v) => v.word === word);
        if (exists) return;

        const newVocab: VocabularyItem = {
          word,
          translation,
          pronunciation,
          example,
          easeFactor: 2.5,
          intervalDays: 1,
          repetitions: 0,
          nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        };

        set((state) => ({
          vocabularySRS: [...state.vocabularySRS, newVocab],
        }));
      },

      reviewVocabulary: (word, quality) => {
        // SM-2 Algorithm
        const vocab = get().vocabularySRS.find((v) => v.word === word);
        if (!vocab) return;

        let { easeFactor, intervalDays, repetitions } = vocab;

        if (quality < 3) {
          repetitions = 0;
          intervalDays = 1;
        } else {
          repetitions += 1;
          if (repetitions === 1) {
            intervalDays = 1;
          } else if (repetitions === 2) {
            intervalDays = 6;
          } else {
            intervalDays = Math.round(intervalDays * easeFactor);
          }
        }

        easeFactor = Math.max(
          1.3,
          easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        );

        const updatedVocab: VocabularyItem = {
          ...vocab,
          easeFactor,
          intervalDays,
          repetitions,
          nextReviewAt: new Date(
            Date.now() + intervalDays * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        set((state) => ({
          vocabularySRS: state.vocabularySRS.map((v) =>
            v.word === word ? updatedVocab : v
          ),
        }));
      },

      getDueVocabulary: () => {
        const now = new Date();
        return get().vocabularySRS.filter(
          (v) => new Date(v.nextReviewAt) <= now
        );
      },

      resetSRS: () => set({ vocabularySRS: [] }),
    }),
    {
      name: "learning-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);