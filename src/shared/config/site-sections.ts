import type { Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";

export const siteSections = {
  about: { number: "01", label: "МОЙ ПОДХОД" },
  experience: { number: "02", label: "КОММЕРЧЕСКИЙ ОПЫТ", pageLabel: "РЕЗЮМЕ" },
  projects: { number: "03", label: "ПРОЕКТЫ" },
  stack: { number: "04", label: "ТЕХНОЛОГИИ", pageLabel: "СТЕК" },
  contacts: { number: "05", label: "КОНТАКТЫ" },
} as const;

export type SiteSection = keyof typeof siteSections;

const getSections = createDictionary<Record<SiteSection, { number: string; label: string; pageLabel?: string }>>("sections", {
  ru: siteSections,
  en: {
    about: { number: "01", label: "MY APPROACH" },
    experience: { number: "02", label: "COMMERCIAL EXPERIENCE", pageLabel: "RESUME" },
    projects: { number: "03", label: "PROJECTS" },
    stack: { number: "04", label: "TECHNOLOGIES", pageLabel: "STACK" },
    contacts: { number: "05", label: "CONTACT" },
  },
});

export const formatSectionNumber = (section: SiteSection, page = false, locale: Locale = "ru") => {
  const config = getSections(locale)[section];
  const label = page && "pageLabel" in config ? config.pageLabel : config.label;
  return `${config.number} / ${label}`;
};
