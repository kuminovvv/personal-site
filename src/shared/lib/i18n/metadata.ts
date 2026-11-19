import type { Metadata } from "next";
import { createDictionary } from "./dictionary";
import { localizeHref, type Locale } from "./locale";

export const getMetadataCopy = createDictionary("metadata", {
  ru: {
    home: { title: "Kuminovvv — портфолио Ильи Куминова", description: "Илья Куминов — frontend-разработчик. Корпоративные интерфейсы, собственные продукты, React, TypeScript и Go." },
    projects: { title: "Проекты — Kuminovvv", description: "Коммерческие кейсы ОмГУ и Газпром ВНИИГАЗ, Soobota, SPB Rent и технический кейс с Canvas API." },
    contacts: { title: "Контакты — Kuminovvv", description: "Связаться с Ильёй Куминовым: Telegram и Email для обсуждения разработки, проектов и сотрудничества." },
    resume: { title: "Резюме — Kuminovvv", description: "Опыт frontend-разработки Ильи Куминова: React, TypeScript, корпоративные SPA и собственные продукты." },
    stack: { title: "Стек — Kuminovvv", description: "React, TypeScript, Go, PostgreSQL и инструменты разработки интерфейсов и продуктов." },
    caseTitle: "проекты Kuminovvv", image: "KUMINOVVV — персональный сайт Ильи Куминова",
  },
  en: {
    home: { title: "Kuminovvv — Ilya Kuminov's portfolio", description: "Ilya Kuminov, frontend developer. Enterprise interfaces, independent products, React, TypeScript and Go." },
    projects: { title: "Projects — Kuminovvv", description: "Commercial work for Omsk State University and Gazprom VNIIGAZ, Soobota, SPB Rent and a Canvas API case study." },
    contacts: { title: "Contact — Kuminovvv", description: "Get in touch with Ilya Kuminov via Telegram or email to discuss development, projects and collaboration." },
    resume: { title: "Resume — Kuminovvv", description: "Ilya Kuminov's frontend experience: React, TypeScript, enterprise SPAs and independent products." },
    stack: { title: "Stack — Kuminovvv", description: "React, TypeScript, Go, PostgreSQL and tools for building interfaces and products." },
    caseTitle: "Kuminovvv projects", image: "KUMINOVVV — Ilya Kuminov's personal website",
  },
});

export const createPageMetadata = (locale: Locale, path: string, title: string, description: string): Metadata => {
  const route = path === "/" ? path : `${path.replace(/\/+$/, "")}/`;
  const url = localizeHref(route, locale);
  const copy = getMetadataCopy(locale);
  return {
    metadataBase: new URL("https://kuminovvv.com"), title, description,
    alternates: { canonical: url, languages: { ru: localizeHref(route, "ru"), en: localizeHref(route, "en"), "x-default": route } },
    openGraph: { title, description, url, locale: locale === "en" ? "en_US" : "ru_RU", alternateLocale: [locale === "en" ? "ru_RU" : "en_US"], type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: copy.image }] },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
};

export const getPageMetadata = (page: "home" | "projects" | "contacts" | "resume" | "stack", locale: Locale = "ru") => {
  const copy = getMetadataCopy(locale)[page];
  return createPageMetadata(locale, page === "home" ? "/" : `/${page}`, copy.title, copy.description);
};
