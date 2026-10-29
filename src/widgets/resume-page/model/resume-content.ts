import { createDictionary } from "@/shared/lib/i18n/dictionary";
import type { Locale } from "@/shared/lib/i18n/locale";

const resumeCopy = createDictionary("resume", {
  ru: {
    highlights: [
  { value: "6+ лет", label: "Коммерческой разработки" },
  { value: "React + TS", label: "Основная специализация" },
  { value: "Архитектура", label: "От интерфейсов до процессов" },
    ],
    career: {
      gazprom: { focus: "Корпоративные SPA и интерфейсы данных", role: "Ведущий специалист · Frontend / React", lead: "Разрабатываю интерфейсы корпоративных систем: от сложных пользовательских сценариев до организации frontend-архитектуры.", achievements: [{ title: "Лабораторные данные", description: "Инструменты визуализации и разметки на Canvas API, работа с координатами и масштабированием." }, { title: "Табличные редакторы", description: "Интерфейсы на AG Grid для просмотра и редактирования сложных наборов данных." }, { title: "Клиентская логика", description: "Пользовательские сценарии редактирования и управление состоянием приложений." }, { title: "Архитектура модулей", description: "Разделение ответственности компонентов, FSD и Redux Toolkit." }], technologies: ["React", "TypeScript", "AG Grid", "Canvas API", "Redux Toolkit", "FSD"] },
      omsu: { focus: "Электронные сервисы · eService", role: "Frontend-разработчик", lead: "Разрабатывал клиентскую часть электронных сервисов ОмГУ и участвовал в развитии интерфейсов университетского портала.", achievements: ["«Моё портфолио» — frontend-модуль университетского портала.", "«Расписание занятий» — отдельный сервис для просмотра расписания.", "Интеграция с REST API и организация клиентского состояния через MobX.", "UX/UI-концепция обновления eService, которая не была внедрена."], technologies: ["React", "TypeScript", "MobX", "REST API"] },
    },
    expertise: [{ title: "Сложные интерфейсы и данные", description: "Таблицы на AG Grid, визуальная разметка с Canvas API и прикладная клиентская логика." }, { title: "Архитектура и переиспользование", description: "React, TypeScript, FSD, независимые модули, управление состоянием и API." }, { title: "Качество и выпуск изменений", description: "Работа с Git, проверка изменений и автоматизация процессов разработки." }],
    approach: [{ title: "Задача и контекст", description: "Сначала определяю пользовательский сценарий и ограничения, затем выбираю способ реализации." }, { title: "Поддерживаемое решение", description: "Уделяю внимание структуре кода, удобству интерфейса и дальнейшему развитию продукта." }],
  },
  en: {
    highlights: [{ value: "6+ years", label: "Commercial development" }, { value: "React + TS", label: "Core specialization" }, { value: "Architecture", label: "From interfaces to processes" }],
    career: {
      gazprom: { focus: "Corporate SPAs and data interfaces", role: "Lead Specialist · Frontend / React", lead: "I build interfaces for corporate systems, from complex user flows to frontend architecture.", achievements: [{ title: "Laboratory data", description: "Visualization and annotation tools with Canvas API, coordinates and scaling." }, { title: "Data editors", description: "AG Grid interfaces for viewing and editing complex datasets." }, { title: "Client logic", description: "User editing flows and application state management." }, { title: "Module architecture", description: "Component responsibilities, FSD and Redux Toolkit." }], technologies: ["React", "TypeScript", "AG Grid", "Canvas API", "Redux Toolkit", "FSD"] },
      omsu: { focus: "Electronic services · eService", role: "Frontend Developer", lead: "Built the client side of OmSU electronic services and helped evolve the university portal interfaces.", achievements: ["My Portfolio — a frontend module of the university portal.", "Class Schedule — a separate schedule viewing service.", "REST API integration and client state with MobX.", "An eService UX/UI refresh concept that was not shipped."], technologies: ["React", "TypeScript", "MobX", "REST API"] },
    },
    expertise: [{ title: "Complex interfaces and data", description: "AG Grid tables, Canvas API annotation and applied client logic." }, { title: "Architecture and reuse", description: "React, TypeScript, FSD, independent modules, state management and APIs." }, { title: "Quality and delivery", description: "Git workflows, change verification and development automation." }],
    approach: [{ title: "Task and context", description: "I start with the user scenario and constraints, then choose an implementation approach." }, { title: "Maintainable solution", description: "I focus on code structure, interface clarity and the product's future growth." }],
  },
});

export const getResumeContent = (locale: Locale = "ru") => resumeCopy(locale);
const content = getResumeContent();
export const resumeHighlights = content.highlights;

export const resumeCareer = content.career;



export const getResumeExpertise = (locale: Locale = "ru") => getResumeContent(locale).expertise;
export const getResumeApproach = (locale: Locale = "ru") => getResumeContent(locale).approach;
export const resumeExpertise = content.expertise;
export const resumeApproach = content.approach;
