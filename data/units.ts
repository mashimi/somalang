import { Unit } from "@/types/learning";

export const UNITS: Unit[] = [
  {
    id: "de-a1-unit-1",
    languageCode: "de",
    title: "A1 - Mwanzishi",
    description: "Anza safari yako ya Kijerumani na misingi",
    order: 1,
    lessonIds: [
      "de-a1-lesson-1", // Salamu
      "de-a1-lesson-2", // Namba
      "de-a1-lesson-3", // Rangi
      "de-a1-lesson-4", // Familia
      "de-a1-lesson-5", // Chakula
    ],
  },
  {
    id: "de-a2-unit-1",
    languageCode: "de",
    title: "A2 - Msingi",
    description: "Panua ujuzi wako wa Kijerumani katika maisha ya kila siku",
    order: 2,
    lessonIds: [
      "de-a2-lesson-1", // Mgahawa
      "de-a2-lesson-2", // Ununuzi
      "de-a2-lesson-3", // Mazoea
    ],
  },
  {
    id: "de-b1-unit-1",
    languageCode: "de",
    title: "B1 - Wastani",
    description: "Zungumzia mada changamano zaidi",
    order: 3,
    lessonIds: [
      "de-b1-lesson-1", // Safari
      "de-b1-lesson-2", // Afya
    ],
  },
  {
    id: "de-b2-unit-1",
    languageCode: "de",
    title: "B2 - Juuli",
    description: "Miliki mawasiliano ya kitaalamu",
    order: 4,
    lessonIds: ["de-b2-lesson-1"],
  },
  {
    id: "de-c1-unit-1",
    languageCode: "de",
    title: "C1 - Mahari",
    description: "Jadili mada changamano kwa ufasaha",
    order: 5,
    lessonIds: ["de-c1-lesson-1"],
  },
];