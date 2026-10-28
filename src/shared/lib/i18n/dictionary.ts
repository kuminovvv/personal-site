import type { Locale } from "./locale";

// The site ships complete static RU/EN dictionaries; no runtime translation engine is needed.
export const createDictionary = <T extends object>(_namespace: string, resources: Record<Locale, T>) =>
  (locale: Locale = "ru"): T => resources[locale] ?? resources.ru;
