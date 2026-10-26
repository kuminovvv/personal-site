import type { Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";

type Localized<T> = Record<Locale, T>;

export const visualText: Localized<{
  home: string;
  work: string;
  about: string;
  language: string;
  heroLines: [string, string];
  heroDescription: string;
  projects: string;
  galleryAria: string;
  approach: string;
  approachTitle: string;
  interfaceTitle: [string, string];
  model: string;
  modelValues: [string, string, string];
  modelDescriptions: [string, string, string];
  result: string;
  side: [[string, string], [string, string], [string, string]];
  lab: string;
  labTitle: string;
  labEyebrow: string;
  labDescription: string;
  aboutLabel: string;
  aboutRole: string;
  aboutTitle: string;
  aboutName: string;
  aboutDescription: string;
  years: string;
  career: string;
  now: string;
  contactLabel: string;
  contactTitle: [string, string];
  contactDescription: string;
  discuss: string;
  top: string;
}> = {
  ru: {
    home: "Главная", work: "работы", about: "обо мне", language: "Язык", heroLines: ["Соединяю идеи", "и технологии."], heroDescription: "Илья Куминов — frontend-разработчик с 6+ годами опыта. Создаю сложные интерфейсы на стыке инженерии и дизайна.", projects: "Проекты и эксперименты.", galleryAria: "Галерея проектов. Прокручивайте горизонтально стрелками, мышью или свайпом", approach: "МОЙ ПОДХОД", approachTitle: "Сложное — понятным.", interfaceTitle: ["НЕ ПРОСТО", "ИНТЕРФЕЙС."], model: "МОДЕЛЬ ИНТЕРФЕЙСА", modelValues: ["ДАННЫЕ", "ЛОГИКА", "ИНТЕРФЕЙС"], modelDescriptions: ["Структура и источники", "Состояния и сценарии", "Ясное взаимодействие"], result: "РЕЗУЛЬТАТ / ПОНЯТНОЕ ПОВЕДЕНИЕ", side: [["АРХИТЕКТУРА", "Системность с первого шага."], ["УДОБСТВО", "Сложность остаётся внутри."], ["ДЕТАЛИ", "Каждое действие — осмысленно."]], lab: "CREATIVE LAB", labTitle: "Идеи в движении.", labEyebrow: "ИССЛЕДОВАНИЯ / ПРОТОТИПЫ / ВОЗМОЖНОСТИ ВЕБА", labDescription: "Графика, движение и глубина — в одном визуальном эксперименте.", aboutLabel: "ОБО МНЕ", aboutRole: "ИЛЬЯ КУМИНОВ / FRONTEND-РАЗРАБОТЧИК", aboutTitle: "За кодом — человек.", aboutName: "Я — Илья Куминов.", aboutDescription: "С 2020 года создаю React-интерфейсы и собственные full-stack продукты.", years: "лет в разработке.", career: "РАЗРАБОТКА → ПРОДУКТ", now: "СЕЙЧАС", contactLabel: "НА СВЯЗИ", contactTitle: ["Есть идея?", "Давайте обсудим."], contactDescription: "Есть задача или идея? Напиши — обсудим.", discuss: "Обсудить проект", top: "НАВЕРХ",
  },
  en: {
    home: "Home", work: "work", about: "about", language: "Language", heroLines: ["I connect ideas", "and technology."], heroDescription: "Ilya Kuminov — frontend developer with 6+ years of experience. I build complex interfaces where engineering meets design.", projects: "Projects and experiments.", galleryAria: "Project gallery. Scroll horizontally with arrows, mouse, or swipe", approach: "MY APPROACH", approachTitle: "Complex, made clear.", interfaceTitle: ["MORE THAN AN", "INTERFACE."], model: "INTERFACE MODEL", modelValues: ["DATA", "LOGIC", "INTERFACE"], modelDescriptions: ["Structure and sources", "States and scenarios", "Clear interaction"], result: "OUTCOME / CLEAR BEHAVIOR", side: [["ARCHITECTURE", "Systems from the first step."], ["USABILITY", "Complexity stays inside."], ["DETAILS", "Every action has intent."]], lab: "CREATIVE LAB", labTitle: "Ideas in motion.", labEyebrow: "RESEARCH / PROTOTYPES / WEB POSSIBILITIES", labDescription: "Graphics, motion, and depth in one visual experiment.", aboutLabel: "ABOUT", aboutRole: "ILYA KUMINOV / FRONTEND DEVELOPER", aboutTitle: "Behind the code is a person.", aboutName: "I’m Ilya Kuminov.", aboutDescription: "Since 2020, I’ve built React interfaces and full-stack products of my own.", years: "years in development.", career: "DEVELOPMENT → PRODUCT", now: "NOW", contactLabel: "LET’S TALK", contactTitle: ["Have an idea?", "Let’s discuss."], contactDescription: "Have a task or an idea? Write to me — let’s talk.", discuss: "Discuss a project", top: "BACK TO TOP",
  },
};

export const projectText: Localized<Record<string, { category: string; aria: string; alt: string }>> = {
  ru: { soobota: { category: "СОБСТВЕННЫЙ ПРОДУКТ", aria: "Подробнее о проекте Soobota", alt: "Концептуальная композиция проекта Soobota" }, "spb-rent": { category: "FULL-STACK", aria: "Подробнее о проекте SPB Rent", alt: "Концептуальная композиция проекта SPB Rent" }, "canvas-api": { category: "ТЕХНИЧЕСКИЙ КЕЙС", aria: "Подробнее о проекте Canvas API", alt: "Концептуальная композиция проекта Canvas API" }, "enterprise-ui": { category: "КОММЕРЧЕСКИЙ", aria: "Подробнее о проекте Enterprise UI", alt: "Концептуальная композиция проекта Enterprise UI" }, eservice: { category: "ОМГУ / 2020–24", aria: "Подробнее о проекте eService", alt: "Концептуальная композиция проекта eService" } },
  en: { soobota: { category: "OWN PRODUCT", aria: "Learn more about Soobota", alt: "Concept composition for the Soobota project" }, "spb-rent": { category: "FULL-STACK", aria: "Learn more about SPB Rent", alt: "Concept composition for the SPB Rent project" }, "canvas-api": { category: "TECHNICAL CASE", aria: "Learn more about Canvas API", alt: "Concept composition for the Canvas API project" }, "enterprise-ui": { category: "COMMERCIAL", aria: "Learn more about Enterprise UI", alt: "Concept composition for the Enterprise UI project" }, eservice: { category: "OMSU / 2020–24", aria: "Learn more about eService", alt: "Concept composition for the eService project" } },
};

export const getVisualText = createDictionary("visual-portfolio", visualText);
export const getProjectText = createDictionary("visual-project-cards", projectText);

export const getVisualExtraText = createDictionary("visual-portfolio-extra", {
  ru: {
    homeNav: "Навигация по главной",
    labProgress: "● В РАЗРАБОТКЕ",
    labLines: ["Движение.", "Форма.", "Отклик."],
    labFootnote: "КОНЦЕПЦИЯ ДЛЯ БУДУЩИХ ИНТЕРАКТИВНЫХ ПРОТОТИПОВ",
    labImage: "Абстрактная орбитальная композиция из оригинального макета Figma",
    motion: "Анимации",
    motionAria: "Анимации на сайте",
  },
  en: {
    homeNav: "Home page navigation",
    labProgress: "● IN PROGRESS",
    labLines: ["Motion.", "Form.", "Response."],
    labFootnote: "A CONCEPT FOR FUTURE INTERACTIVE PROTOTYPES",
    labImage: "Abstract orbital composition from the original Figma design",
    motion: "Animations",
    motionAria: "Website animations",
  },
});
