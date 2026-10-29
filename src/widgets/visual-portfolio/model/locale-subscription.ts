import {getLocaleFromPath} from "@/shared/lib/i18n/locale";

export const subscribeLocale = (notify: () => void) => {
  window.addEventListener("portfolio:locale-change", notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener("portfolio:locale-change", notify);
    window.removeEventListener("popstate", notify);
  };
};

export const currentLocale = () => getLocaleFromPath(window.location.pathname);
