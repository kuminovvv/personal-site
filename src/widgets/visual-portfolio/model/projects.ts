export type VisualProject = {
  slug: string;
  title: string;
  category: string;
  motif: string;
  color: string;
  ink: string;
  image?: string;
  imageWidth?: number;
  kind: string;
  summary: string;
  contribution: string;
  technologies: string[];
  links: { label: string; href: string }[];
};

export const visualProjects: VisualProject[] = [
  { slug: "soobota", title: "Soobota", category: "OWN PRODUCT", motif: "SOCIAL", color: "#ff513d", ink: "#ffffff", image: "/design/visual-portfolio/soobota.svg", imageWidth: 408, kind: "Собственный продукт", summary: "Социальная платформа для родителей: публикации, сообщества и общение.", contribution: "Разработка продукта, интерфейсов и серверной части.", technologies: ["React", "Next.js", "TypeScript", "Go", "PostgreSQL", "Redis", "RabbitMQ", "S3", "Docker"], links: [{ label: "Открыть Soobota", href: "https://soobota.com/" }] },
  { slug: "spb-rent", title: "SPB Rent", category: "FULL-STACK", motif: "RENT", color: "#b8fa00", ink: "#183b26", image: "/design/visual-portfolio/spb-rent.svg", imageWidth: 396, kind: "Собственный продукт", summary: "Агрегатор объявлений об аренде жилья из Telegram.", contribution: "Сбор и классификация объявлений, фильтрация, карта и API.", technologies: ["Next.js", "Go", "Leaflet", "PostgreSQL"], links: [{ label: "GitHub", href: "https://github.com/kuminovvv/rent-hub" }] },
  { slug: "canvas-api", title: "Canvas API", category: "TECHNICAL CASE", motif: "SELECT", color: "#555563", ink: "#f9f9f9", image: "/design/visual-portfolio/canvas.svg", imageWidth: 408, kind: "Технический кейс", summary: "Интерактивная разметка изображений при масштабировании.", contribution: "Bounding box, система координат и преобразование положения элементов.", technologies: ["React", "TypeScript", "Canvas API"], links: [] },
  { slug: "enterprise-ui", title: "Enterprise UI", category: "COMMERCIAL", motif: "DATA", color: "#1038b5", ink: "#ffffff", image: "/design/visual-portfolio/enterprise.svg", imageWidth: 387, kind: "Коммерческая разработка", summary: "Корпоративные интерфейсы для работы с данными.", contribution: "Разработка React SPA, табличных инструментов и сложной клиентской логики без раскрытия внутренних данных.", technologies: ["React", "TypeScript", "AG Grid", "Redux Toolkit", "Canvas API", "FSD"], links: [] },
  { slug: "eservice", title: "eService", category: "OMSU / 2020–24", motif: "SERVICE", color: "#e3dbd1", ink: "#252c30", kind: "Университетские сервисы", summary: "«Моё портфолио» и «Расписание занятий» для ОмГУ.", contribution: "Frontend-разработка пользовательских модулей. Отдельный редизайн портала был невнедрённой UX/UI-концепцией.", technologies: ["React", "TypeScript", "MobX", "REST API"], links: [{ label: "Моё портфолио", href: "https://eservice.omsu.ru/portfolio/" }, { label: "Расписание", href: "https://eservice.omsu.ru/schedule/" }] },
];
