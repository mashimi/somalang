import { Unit } from '@/types/learning';

export const UNITS: Unit[] = [
  {
    id: 'es-unit-1',
    languageCode: 'es',
    title: 'Greetings & Basics',
    description: 'Start your Spanish journey with everyday phrases',
    order: 1,
    lessonIds: ['es-lesson-1', 'es-lesson-2', 'es-lesson-3'],
  },
  {
    id: 'fr-unit-1',
    languageCode: 'fr',
    title: 'Bonjour! Greetings',
    description: 'Learn how to greet and introduce yourself in French',
    order: 1,
    lessonIds: ['fr-lesson-1', 'fr-lesson-2', 'fr-lesson-3', 'fr-lesson-4', 'fr-lesson-5'],
  },
  {
    id: 'ja-unit-1',
    languageCode: 'ja',
    title: 'はじめまして — First Steps',
    description: 'Learn essential Japanese phrases for meeting people',
    order: 1,
    lessonIds: ['ja-lesson-1', 'ja-lesson-2', 'ja-lesson-3', 'ja-lesson-4', 'ja-lesson-5'],
  },
  // German A1 - Beginner
  {
    id: 'de-a1-unit-1',
    languageCode: 'de',
    title: 'A1 - Grundlagen',
    description: 'Beginne deine Deutschreise mit den Basics',
    order: 1,
    lessonIds: ['de-a1-lesson-1', 'de-a1-lesson-2'],
  },
  // German A2 - Elementary
  {
    id: 'de-a2-unit-1',
    languageCode: 'de',
    title: 'A2 - Elementar',
    description: 'Erweitere deine Deutschkenntnisse im Alltag',
    order: 2,
    lessonIds: ['de-a2-lesson-1'],
  },
  // German B1 - Intermediate
  {
    id: 'de-b1-unit-1',
    languageCode: 'de',
    title: 'B1 - Mittelstufe',
    description: 'Sprich über komplexere Themen',
    order: 3,
    lessonIds: ['de-b1-lesson-1'],
  },
  // German B2 - Upper Intermediate
  {
    id: 'de-b2-unit-1',
    languageCode: 'de',
    title: 'B2 - Obere Mittelstufe',
    description: 'Beherrsche professionelle Kommunikation',
    order: 4,
    lessonIds: ['de-b2-lesson-1'],
  },
  // German C1 - Advanced
  {
    id: 'de-c1-unit-1',
    languageCode: 'de',
    title: 'C1 - Fortgeschritten',
    description: 'Diskutiere komplexe Themen fließend',
    order: 5,
    lessonIds: ['de-c1-lesson-1'],
  },
];
