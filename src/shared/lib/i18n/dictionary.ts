import { createInstance, type i18n } from "i18next";
import type { Locale } from "./locale";

// A dictionary owns its instances; rendering another locale never changes a global language.
export const createDictionary = <T extends object>(namespace: string, resources: Record<Locale, T>) => {
  const instances = new Map<Locale, i18n>();

  return (locale: Locale = "ru"): T => {
    let instance = instances.get(locale);
    if (!instance) {
      instance = createInstance();
      void instance.init({
        lng: locale,
        supportedLngs: ["ru", "en"],
        fallbackLng: "ru",
        ns: [namespace],
        defaultNS: namespace,
        resources: {
          ru: { [namespace]: { copy: resources.ru } },
          en: { [namespace]: { copy: resources.en } },
        },
        initAsync: false,
        interpolation: { escapeValue: false },
      });
      instances.set(locale, instance);
    }
    return instance.getFixedT(locale, namespace)("copy", { returnObjects: true }) as T;
  };
};
