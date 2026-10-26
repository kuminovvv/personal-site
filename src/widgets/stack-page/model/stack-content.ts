import siteContent from "@/shared/config/site-content.json";
import { createDictionary } from "@/shared/lib/i18n/dictionary";
import type { Locale } from "@/shared/lib/i18n/locale";

// Единый источник содержимого страниц — статический JSON.
export const stackContent = siteContent.stackPage;
const getLocalizedStack = createDictionary("stack", {
  ru: stackContent,
  en: {
    intro: { eyebrow: "TOOLS / REAL TASKS", title: "The stack I use to build products.", description: "From user interfaces to APIs, data and shipping.", focusLabel: "MY SPECIALIZATION", focus: "Frontend", focusDescription: "And complex client logic" },
    primary: [
      { kind: "frontend", eyebrow: "01 / FOUNDATION", category: "FRONTEND", title: "React + TypeScript", description: "Components, interfaces, styles and API integrations.", technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui"] },
      { kind: "backend", eyebrow: "02 / SERVER AND DATA", category: "BACKEND", title: "Go + PostgreSQL", description: "APIs, data storage and server logic for personal products.", technologies: ["Go", "PostgreSQL", "Redis", "RabbitMQ", "Docker"] },
    ],
    capabilities: [
      { category: "03 / COMPLEX INTERFACES", title: "UI and data", description: "Editable tables, graphics and visual tools.", technologies: ["AG Grid", "Canvas API", "Sass"] },
      { category: "04 / CLIENT LOGIC", title: "FSD and architecture", description: "Feature-Sliced Design, state management and API integrations.", technologies: ["FSD", "Redux Toolkit", "REST API"] },
      { category: "05 / QUALITY AND DELIVERY", title: "Quality and releases", description: "Tests, version control and release automation.", technologies: ["Playwright", "Git", "GitLab CI/CD"] },
    ],
    examples: [
      { category: "PRACTICE / 01", title: "Gazprom VNIIGAZ", description: "Working with data and complex tables", technologies: "React · TypeScript · AG Grid", href: "/projects/gazprom-interfaces" },
      { category: "PRACTICE / 02", title: "Soobota", description: "A social network for parents", technologies: "Next.js · Go · PostgreSQL", href: "/projects/soobota" },
      { category: "PRACTICE / 03", title: "Image annotation", description: "Visual annotation with Canvas", technologies: "React · TypeScript · Canvas API", href: "/projects/image-annotation" },
    ],
    banner: { title: "Technology matters in context.", description: "Projects show what I built and why.", label: "View projects", href: "/projects" },
  },
});
export const getStackContent = (locale: Locale = "ru") => getLocalizedStack(locale);
