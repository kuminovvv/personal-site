import { createDictionary } from "@/shared/lib/i18n/dictionary";
import { localizeHref, type Locale } from "@/shared/lib/i18n/locale";

export const siteNavigation = [
  { href: "/", label: "Главная", footerHref: "/#about", footerLabel: "Мой подход" },
  { href: "/projects", label: "Проекты", footerLabel: "Проекты" },
  { href: "/stack", label: "Стек", footerLabel: "Навыки" },
  { href: "/resume", label: "Резюме", footerLabel: "Опыт работы" },
  { href: "/contacts", label: "Контакты", footerLabel: "Контакты" },
] as const;

const getLabels = createDictionary("navigation", {
  ru: { labels: ["Главная", "Проекты", "Стек", "Резюме", "Контакты"], footer: ["Мой подход", "Проекты", "Навыки", "Опыт работы", "Контакты"] },
  en: { labels: ["Home", "Projects", "Stack", "Resume", "Contact"], footer: ["My approach", "Projects", "Skills", "Experience", "Contact"] },
});

export const getSiteNavigation = (locale: Locale = "ru") => {
  const copy = getLabels(locale);
  return siteNavigation.map((item, index) => ({
    href: localizeHref(item.href, locale), label: copy.labels[index], footerLabel: copy.footer[index],
    footerHref: localizeHref("footerHref" in item ? item.footerHref : item.href, locale),
  }));
};

export const getSiteFooterNavigation = (locale: Locale = "ru") => {
  const items = getSiteNavigation(locale);
  return [items[0], items[3], items[1], items[2], items[4]];
};

export const siteFooterNavigation = [
  siteNavigation[0],
  siteNavigation[3],
  siteNavigation[1],
  siteNavigation[2],
  siteNavigation[4],
] as const;
