import { createDictionary } from "@/shared/lib/i18n/dictionary";
import { projectDetailsEn } from "./project-details.en";

export type ProjectDetail = {
  eyebrow: string;
  title: string;
  lead: string;
  task: string;
  contribution: string;
  technologyLabel: string;
  art: string;
  footnote?: string;
  links: { label: string; href: string }[];
};

export const projectDetails: Record<string, ProjectDetail> = {
  soobota: {
    eyebrow: "ЛИЧНЫЙ FULL-STACK ПРОДУКТ",
    title: "Soobota",
    lead: "Социальное пространство для родителей и будущих родителей.",
    task: "Соединить публикации, тематические сообщества и анонимные вопросы в одной понятной платформе.",
    contribution: "Идея, UX/UI, frontend, backend и интеграции. Авторизация, модерация и уведомления.",
    technologyLabel: "REACT · NEXT.JS · TYPESCRIPT · GO · POSTGRESQL · REDIS · RABBITMQ · S3 · DOCKER · GITLAB CI/CD",
    art: "/design/visual-portfolio/modals/soobota.png",
    links: [{ label: "ПОСМОТРЕТЬ SOOBOTA", href: "https://soobota.com/" }],
  },
  "spb-rent": {
    eyebrow: "СОБСТВЕННЫЙ FULL-STACK АГРЕГАТОР",
    title: "SPB Rent",
    lead: "Каталог аренды жилья на основе объявлений в Telegram.",
    task: "Превратить разрозненные публикации в структурированный поиск жилья по Петербургу.",
    contribution: "Сбор и классификация объявлений, извлечение параметров, группировка фото, каталог, фильтры и карта.",
    technologyLabel: "NEXT.JS · GO · LEAFLET · POSTGRESQL",
    art: "/design/visual-portfolio/modals/spb-rent.png",
    links: [{ label: "РЕПОЗИТОРИЙ GITHUB", href: "https://github.com/kuminovvv/rent-hub" }],
  },
  "canvas-api": {
    eyebrow: "ТЕХНИЧЕСКИЙ FRONTEND-КЕЙС",
    title: "Разметка изображений",
    lead: "Выделение областей на изображении с точными координатами.",
    task: "Сохранять корректную геометрию выделения при изменении масштаба изображения.",
    contribution: "Работа с Canvas API, bounding box, маркерами выделения и преобразованиями координат между изображением и холстом.",
    technologyLabel: "REACT · TYPESCRIPT · CANVAS API",
    art: "/design/visual-portfolio/modals/canvas-api.png",
    footnote: "ТЕХНИЧЕСКИЙ ПРИМЕР",
    links: [],
  },
  "enterprise-ui": {
    eyebrow: "ГАЗПРОМ ВНИИГАЗ · НОЯБРЬ 2024 — СЕЙЧАС",
    title: "Корпоративные интерфейсы",
    lead: "Корпоративные SPA и редакторы сложных структурированных данных.",
    task: "Обеспечить удобную работу со сложными данными и клиентской логикой корпоративных приложений.",
    contribution: "React SPA, AG Grid, сценарии редактирования, Redux Toolkit, FSD и визуализация с Canvas API. Внутренние процессы не раскрываются.",
    technologyLabel: "REACT · TYPESCRIPT · AG GRID · REDUX TOOLKIT · FSD · CANVAS API",
    art: "/design/visual-portfolio/modals/enterprise-ui.png",
    footnote: "ВНУТРЕННИЕ ДАННЫЕ НЕ ПУБЛИКУЮТСЯ",
    links: [],
  },
  eservice: {
    eyebrow: "КОММЕРЧЕСКИЕ ВЕБ-СЕРВИСЫ · 2020—2024",
    title: "eService · ОмГУ",
    lead: "«Моё портфолио» и расписание — реализованные продукты ОмГУ.",
    task: "Дать пользователям удобный доступ к университетским электронным сервисам.",
    contribution: "React/TypeScript-модули, MobX, REST API. UX/UI-редизайн портала — самостоятельная концепция, не внедрённая в production.",
    technologyLabel: "REACT · TYPESCRIPT · MOBX · REST API",
    art: "/design/visual-portfolio/modals/eservice.png",
    links: [
      { label: "МОЁ ПОРТФОЛИО", href: "https://eservice.omsu.ru/portfolio/" },
      { label: "РАСПИСАНИЕ", href: "https://eservice.omsu.ru/schedule/" },
    ],
  },
};

export const getProjectDetails = createDictionary("visual-project-details", {
  ru: projectDetails,
  en: projectDetailsEn,
});

export const getProjectModalCopy = createDictionary("visual-project-modal", {
  ru: {
    close: "Закрыть",
    closeAria: "Закрыть описание проекта",
    task: "ЗАДАЧА",
    contribution: "МОЙ ВКЛАД",
    technologies: "ТЕХНОЛОГИИ",
    concept: "ПРЕВЬЮ — КОНЦЕПТ / НЕ СКРИНШОТ",
    imageAlt: "Схематичная визуализация кейса",
    imageAltSuffix: "из макета Figma, не скриншот продукта",
  },
  en: {
    close: "Close",
    closeAria: "Close project details",
    task: "CHALLENGE",
    contribution: "MY CONTRIBUTION",
    technologies: "TECHNOLOGIES",
    concept: "PREVIEW — CONCEPT / NOT A SCREENSHOT",
    imageAlt: "Concept illustration for",
    imageAltSuffix: "from the Figma design, not a product screenshot",
  },
});
