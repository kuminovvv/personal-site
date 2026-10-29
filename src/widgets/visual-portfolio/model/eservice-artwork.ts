import {createDictionary} from "@/shared/lib/i18n/dictionary";

export const getCopy = createDictionary("eservice-artwork", {
  ru: {
    university: "УНИВЕРСИТЕТ",
    sketch: "ИНТЕРФЕЙС-СХЕМА",
    title: "Все сервисы рядом.",
    description: "Расписание, учебные задачи и личные сервисы",
    cards: ["РАСПИСАНИЕ", "СЕРВИСЫ", "ЗАДАЧИ"],
    myDay: "МОЙ ДЕНЬ",
    today: "СЕГОДНЯ",
    tasks: ["Работа с расписанием", "Университетские сервисы", "Личный кабинет"],
    concept: "КОНЦЕПТ-ВИЗУАЛИЗАЦИЯ / НЕ РЕАЛЬНЫЙ СКРИНШОТ",
  },
  en: {
    university: "UNIVERSITY",
    sketch: "INTERFACE CONCEPT",
    title: "All services in one place.",
    description: "Timetable, study tasks, and personal services",
    cards: ["TIMETABLE", "SERVICES", "TASKS"],
    myDay: "MY DAY",
    today: "TODAY",
    tasks: ["Timetable", "University services", "My account"],
    concept: "CONCEPT VISUALIZATION / NOT A REAL SCREENSHOT",
  },
});

export const taskTimes = ["09:00", "11:00", "14:00"];

export const moduleColors = [
  "var(--site-preview-text)",
  "var(--site-preview-text-b)",
  "var(--site-preview-text-c)",
];

export const taskColors = [
  "var(--site-preview-text-d)",
  "var(--site-preview-text-e)",
  "var(--site-preview-text-f)",
];
