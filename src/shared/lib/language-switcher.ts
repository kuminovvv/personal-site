import { createDictionary } from "@/shared/lib/i18n/dictionary";

export type LanguageSwitcherCopy = {
  label: string;
  ru: string;
  en: string;
};

export const getLanguageSwitcherCopy = createDictionary("language-switcher", {
  ru: { label: "Язык сайта", ru: "Русский", en: "English" },
  en: { label: "Site language", ru: "Русский", en: "English" },
});

export const subscribeLanguageLocation = (notify: () => void) => {
  const events = [
    "popstate",
    "hashchange",
    "portfolio:project-change",
    "portfolio:location-change",
    "portfolio:locale-change",
  ];
  events.forEach((event) => window.addEventListener(event, notify));
  return () => events.forEach((event) => window.removeEventListener(event, notify));
};

export const getLanguageLocationSnapshot = () =>
  window.location.pathname + window.location.search + window.location.hash;

export const getLanguageServerSnapshot = (pathname: string) => pathname;
