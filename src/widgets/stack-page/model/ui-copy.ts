import { createDictionary } from "@/shared/lib/i18n/dictionary";

export const getStackUiCopy = createDictionary("stack-ui", {
  ru: { core: "Основные технологии", tools: "Инструменты под конкретные задачи", toolsMeta: "Без условных процентов владения", where: "Где применяю", whereMeta: "Не теория — реальные проекты", architecture: "Архитектура: клиент, API и база данных", client: "Клиент", diagram: "Схема интерфейса: навигация, компоненты и состояние", components: "Компоненты и состояние", projectsAria: "Перейти к проектам" },
  en: { core: "Core technologies", tools: "Tools for specific tasks", toolsMeta: "No arbitrary proficiency percentages", where: "Where I use it", whereMeta: "Not theory — real projects", architecture: "Architecture: client, API and database", client: "Client", diagram: "Interface diagram: navigation, components and state", components: "Components and state", projectsAria: "Explore projects" },
});
