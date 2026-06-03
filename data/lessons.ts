import { Lesson } from "@/types/learning";
import { ALL_GERMAN_LESSONS } from "./lessons-de";

export const LESSONS: Lesson[] = [...ALL_GERMAN_LESSONS];

export function getLessonsByLanguage(langCode: string): Lesson[] {
  return LESSONS.filter((l) => l.id.startsWith(langCode));
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}