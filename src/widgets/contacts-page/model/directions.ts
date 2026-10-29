import type { Locale } from "@/shared/lib/i18n/locale";

const russianDirections = [
  {
    number: "01",
    title: "Frontend-разработка",
    description: "Сложные интерфейсы, SPA, React и TypeScript.",
  },
  {
    number: "02",
    title: "Архитектура и качество",
    description: "Структура приложения, производительность и развитие продукта.",
  },
  {
    number: "03",
    title: "Совместные",
    description: "Продуктовые идеи, инженерные задачи и сотрудничество.",
  },
] as const;

const englishDirections = [
    { number: "01", title: "Frontend development", description: "Complex interfaces, SPAs, React and TypeScript." },
    { number: "02", title: "Architecture and quality", description: "Application structure, performance and product growth." },
    { number: "03", title: "Collaboration", description: "Product ideas, engineering tasks and partnerships." },
  ];

export const getContactDirections = (locale: Locale) => locale === "en" ? englishDirections : russianDirections;
