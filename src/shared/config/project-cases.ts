import siteContent from "./site-content.json";
import { englishProjectCases } from "./project-cases.en";
import type { Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";

export type ProjectCase = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  facts: { label: string; value: string }[];
  problem: { heading: string; lead: string; description: string };
  capabilities: { title: string; description: string }[];
  capabilitiesNote: string;
  role: { lead: string; description: string; note?: string };
  technologies: string[];
  closing: string;
  externalUrl?: string;
  externalLabel?: string;
};

const { omsuCases, gazpromCase, personalCases, technicalCases } = siteContent.catalog;

const omsuCase = (slug: string) => {
  const work = omsuCases.find((item) => item.slug === slug);
  if (!work) throw new Error(`Не найден проект ОмГУ: ${slug}`);
  return work;
};

const portfolio = omsuCase("omsu-portfolio");
const schedule = omsuCase("omsu-schedule");
const redesign = omsuCase("eservice-redesign");
const soobota = personalCases.find((item) => item.slug === "soobota")!;
const rent = personalCases.find((item) => item.slug === "spb-rent")!;

export const projectCases: ProjectCase[] = [
  {
    slug: "omsu-portfolio",
    title: portfolio.title,
    category: "КОММЕРЧЕСКИЙ ПРОЕКТ / ОМГУ",
    tagline: "Функциональный модуль в экосистеме электронных сервисов ОмГУ.",
    description: portfolio.description,
    facts: [
      { label: "ФОРМАТ", value: "Раздел университетского портала" },
      { label: "ПРОЕКТ", value: "Электронные сервисы ОмГУ" },
      { label: "МОЯ РОЛЬ", value: "Frontend-разработчик" },
      { label: "СТАТУС", value: "Реализовано" },
    ],
    problem: {
      heading: "Интеграция в eService",
      lead: "Реализовать работу с портфолио внутри существующего университетского портала.",
      description: "Задача включала разработку клиентского модуля, организацию его состояния и взаимодействие с серверными данными через REST API.",
    },
    capabilities: [
      { title: "Функциональный модуль", description: "Разработка интерфейса раздела «Моё портфолио» в составе eService." },
      { title: "Клиентское состояние", description: "Организация состояния и пользовательских взаимодействий с помощью MobX." },
      { title: "Интеграция с API", description: "Связь клиентской логики и серверных данных через REST API." },
    ],
    capabilitiesNote: "Ключевые направления реализации клиентской части.",
    role: { lead: "Реализация интерфейса и прикладной логики модуля.", description: "Разработка компонентов на React и TypeScript, управление состоянием через MobX и интеграция пользовательских сценариев с REST API." },
    technologies: portfolio.stack.split(" · "),
    closing: "Модуль портфолио интегрирован в экосистему университетских сервисов.",
    externalUrl: portfolio.href,
    externalLabel: "Открыть сервис",
  },
  {
    slug: "omsu-schedule",
    title: schedule.title,
    category: "КОММЕРЧЕСКИЙ ПРОЕКТ / ОМГУ",
    tagline: "Самостоятельный сервис расписания в рамках портала ОмГУ.",
    description: schedule.description,
    facts: [
      { label: "ФОРМАТ", value: "Веб-сервис" },
      { label: "ПРОЕКТ", value: "Электронные сервисы ОмГУ" },
      { label: "МОЯ РОЛЬ", value: "Frontend-разработчик" },
      { label: "СТАТУС", value: "Реализовано" },
    ],
    problem: {
      heading: "Работа с расписанием",
      lead: "Выделить расписание занятий в отдельный пользовательский сервис.",
      description: "Требовалось реализовать клиентскую часть для отображения данных расписания, связать её с REST API и организовать состояние интерфейса.",
    },
    capabilities: [
      { title: "Пользовательский интерфейс", description: "Разработка отдельного сервиса для просмотра университетского расписания." },
      { title: "Управление состоянием", description: "Организация клиентской логики и состояния интерфейса с использованием MobX." },
      { title: "Работа с данными", description: "Интеграция frontend с REST API университетского портала." },
    ],
    capabilitiesNote: "Ключевые части клиентской реализации.",
    role: { lead: "Разработка отдельного frontend-сервиса в экосистеме eService.", description: "Реализация интерфейса на React и TypeScript, клиентской логики на MobX и интеграции с REST API для работы с расписанием." },
    technologies: schedule.stack.split(" · "),
    closing: "Расписание занятий реализовано как самостоятельный сервис портала ОмГУ.",
    externalUrl: schedule.href,
    externalLabel: "Открыть расписание",
  },
  {
    slug: "eservice-redesign",
    title: redesign.title,
    category: "КОММЕРЧЕСКИЙ КЕЙС / ОМГУ",
    tagline: "Концепция обновления пользовательского опыта главной страницы eService.",
    description: redesign.description,
    facts: [
      { label: "ФОРМАТ", value: "Концепция интерфейса" },
      { label: "ПРОЕКТ", value: "Портал eService" },
      { label: "МОЯ РОЛЬ", value: "UX/UI-дизайн" },
      { label: "СТАТУС", value: "Не внедрён" },
    ],
    problem: {
      heading: "Концепция редизайна",
      lead: "Пересмотреть структуру и визуальную подачу главной страницы портала.",
      description: "Работа была посвящена альтернативной организации контента и интерфейсных элементов в рамках дизайн-концепции eService.",
    },
    capabilities: [
      { title: "Структура страницы", description: "Проработка расположения основных информационных блоков и визуальной иерархии." },
      { title: "UI-концепция", description: "Подготовка единого подхода к композиции и оформлению главной страницы." },
    ],
    capabilitiesNote: "Концепция не внедрялась в production. MobX — часть стека портала eService, а не инструмент разработки дизайн-макета.",
    role: { lead: "Проработка UX/UI-концепции обновлённой главной страницы.", description: "Подготовил альтернативную структуру интерфейса и визуальную концепцию. Решение осталось на уровне проектного предложения и не было внедрено в рабочий портал." },
    technologies: redesign.stack.split(" · "),
    closing: "Редизайн eService — проработанная концепция без внедрения в production.",
  },
  {
    slug: "gazprom-interfaces",
    title: gazpromCase.title,
    category: "КОММЕРЧЕСКИЙ ПРОЕКТ / ГАЗПРОМ ВНИИГАЗ",
    tagline: "Корпоративные SPA и инструменты работы с данными.",
    description: gazpromCase.description,
    facts: [
      { label: "ФОРМАТ", value: "Корпоративные SPA" },
      { label: "ОРГАНИЗАЦИЯ", value: "Газпром ВНИИГАЗ" },
      { label: "МОЯ РОЛЬ", value: "Ведущий специалист · Frontend" },
      { label: "ФОКУС", value: "Интерфейсы и таблицы данных" },
    ],
    problem: {
      heading: "Прикладные интерфейсы",
      lead: "Обеспечить работу со сложными данными в корпоративных приложениях.",
      description: "Разработка интерфейсов, объединяющих табличное представление данных, редактирование и прикладную клиентскую логику для внутренних рабочих сценариев.",
    },
    capabilities: [
      { title: "Табличные интерфейсы", description: "Разработка интерактивных таблиц на AG Grid для просмотра и редактирования данных." },
      { title: "Состояние и редакторы данных", description: "Управление состоянием через Redux Toolkit (RTK) и реализация клиентских сценариев редактирования данных." },
      { title: "Модули корпоративных SPA", description: "Разработка функциональных компонентов на React и TypeScript в составе внутренних приложений." },
    ],
    capabilitiesNote: "Описаны только общие технические задачи без внутренних деталей систем.",
    role: { lead: "Разработка прикладных frontend-модулей и интерфейсов данных.", description: "Работа с табличными представлениями, сценариями редактирования и клиентской логикой корпоративных SPA. Внутренние процессы и данные компании не раскрываются." },
    technologies: gazpromCase.stack.split(" · "),
    closing: "Корпоративные интерфейсы, в которых сложная работа с данными становится управляемой.",
  },
  {
    slug: "soobota",
    title: soobota.title,
    category: "ЛИЧНЫЙ ПРОЕКТ / SOCIAL",
    tagline: "Когда родителям есть о чём поговорить.",
    description: "Социальная сеть для мам и пап: обсуждения, тематические каналы, личные истории и анонимные вопросы.",
    facts: [
      { label: "ФОРМАТ", value: "Социальная веб-платформа" },
      { label: "ДЛЯ КОГО", value: "Родители и будущие родители" },
      { label: "МОЯ РОЛЬ", value: "Создатель Soobota" },
      { label: "ЗОНА ОТВЕТСТВЕННОСТИ", value: "Идея · дизайн · frontend · backend" },
    ],
    problem: {
      heading: "Единая среда общения",
      lead: "Родительские сообщества и обсуждения распределены между разрозненными площадками.",
      description: "Идея продукта — объединить тематические каналы, публикации и обсуждения в одной социальной платформе, сохранив возможность задавать чувствительные вопросы анонимно.",
    },
    capabilities: [
      { title: "Публикации и лента", description: "Пользовательские сценарии создания контента, его отображения в ленте и взаимодействия с публикациями." },
      { title: "Тематические каналы и поиск", description: "Организация сообществ и навигации по обсуждениям внутри платформы." },
      { title: "Анонимные вопросы и профили", description: "Сценарии анонимного взаимодействия наряду с профилями пользователей и авторизацией." },
      { title: "Модерация и уведомления", description: "Асинхронная проверка публикаций и уведомления о действиях, связанных с контентом." },
    ],
    capabilitiesNote: "Основные функциональные подсистемы платформы.",
    role: {
      lead: "Разработал full-stack продукт — от концепции до работающей платформы.",
      description: "Определил пользовательские сценарии и UX/UI, реализовал frontend на Next.js и серверную часть на Go. Связал систему публикаций, ленту, каналы, авторизацию и асинхронную обработку контента с инфраструктурными компонентами платформы.",
      note: "Зона ответственности: продуктовая концепция, UX/UI, frontend, backend и инфраструктурные интеграции.",
    },
    technologies: ["React", "Next.js", "TypeScript", "Go", "PostgreSQL", "Redis", "RabbitMQ", "S3 Storage", "DeepSeek", "Docker", "GitLab CI/CD"],
    closing: "Soobota — самостоятельная социальная платформа с полноценной клиентской и серверной частью.",
    externalUrl: soobota.href,
    externalLabel: "Открыть Soobota",
  },
  {
    slug: "spb-rent",
    title: rent.title,
    category: "ЛИЧНЫЙ ПРОЕКТ / ПОИСК ЖИЛЬЯ",
    tagline: "Агрегатор объявлений из Telegram с фильтрацией и географическим поиском.",
    description: rent.description,
    facts: [
      { label: "ФОРМАТ", value: "Агрегатор объявлений" },
      { label: "ТЕМАТИКА", value: "Аренда жилья в Санкт-Петербурге" },
      { label: "МОЯ РОЛЬ", value: "Full-stack разработка" },
      { label: "ФОКУС", value: "Обработка данных · каталог · карта" },
    ],
    problem: {
      heading: "От сообщений к каталогу",
      lead: "Превратить поток Telegram-публикаций в структурированные объявления об аренде.",
      description: "Исходные посты отличаются по формату и наполнению. Для полноценного поиска необходимо извлекать параметры жилья, определять тип объекта и предоставлять данные через единый каталог и карту.",
    },
    capabilities: [
      { title: "Обработка Telegram-публикаций", description: "Сбор объявлений и извлечение параметров объектов для структурированного представления." },
      { title: "Классификация и медиа", description: "Определение типа объявления и объединение связанных изображений в карточке объекта." },
      { title: "Фильтры и интерактивная карта", description: "Связь параметров поиска с каталогом и географическим представлением на Leaflet." },
      { title: "API и хранение данных", description: "Серверная часть на Go и PostgreSQL для обработки и предоставления объявлений frontend." },
    ],
    capabilitiesNote: "Этапы обработки данных и пользовательские инструменты поиска.",
    role: { lead: "Реализовал серверную обработку объявлений и интерфейс поиска.", description: "Разработал связку сбора Telegram-публикаций, серверного API и каталога на Next.js с фильтрами и картой. Отдельно работал над классификацией объектов, группировкой медиа и поведением карты." },
    technologies: rent.stack.split(" · "),
    closing: "SPB Rent превращает разрозненные Telegram-объявления в структурированный сервис поиска жилья.",
    externalUrl: rent.href,
    externalLabel: "Открыть репозиторий",
  },
  {
    slug: "image-annotation",
    title: technicalCases[0].title,
    category: "ТЕХНИЧЕСКИЙ КЕЙС / CANVAS API",
    tagline: "Интерактивная разметка изображений с учётом масштаба и координат.",
    description: technicalCases[0].description,
    facts: [
      { label: "ФОРМАТ", value: "Инструмент работы с изображениями" },
      { label: "НАПРАВЛЕНИЕ", value: "Интерактивная графика" },
      { label: "МОЯ РОЛЬ", value: "Frontend-разработка" },
      { label: "ФОКУС", value: "Canvas API · координаты · масштаб" },
    ],
    problem: {
      heading: "Точная разметка",
      lead: "Реализовать разметку областей прямо на изображении.",
      description: "При масштабировании визуальные координаты меняются. Пользовательские действия должны корректно соотноситься с исходными координатами изображения.",
    },
    capabilities: [
      { title: "Разметка областей", description: "Интерактивное выделение областей изображения с использованием Canvas API." },
      { title: "Координаты и масштабирование", description: "Работа с преобразованием координат между изображением и его отображением на экране." },
      { title: "Компонентная реализация", description: "Интерфейсная логика на React и TypeScript." },
    ],
    capabilitiesNote: "Инженерные задачи интерактивного графического интерфейса.",
    role: {
      lead: "Разработка клиентской логики графического редактора.",
      description: "Реализовал взаимодействие с областями изображения, обработку координат и изменение масштаба средствами React, TypeScript и Canvas API.",
    },
    technologies: technicalCases[0].stack.split(" · "),
    closing: "Разметка изображений — технический кейс на пересечении интерфейсов и компьютерной графики.",
  },
];

const getCases = createDictionary("cases", { ru: { items: projectCases }, en: { items: englishProjectCases } });

export const getProjectCase = (slug: string, locale: Locale = "ru"): ProjectCase | undefined =>
  getCases(locale).items.find((item) => item.slug === slug);
