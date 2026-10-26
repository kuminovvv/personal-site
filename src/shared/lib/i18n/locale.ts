export type Locale = "ru" | "en";

export const getLocaleFromPath = (path: string): Locale => /^\/en(?:\/|$)/.test(path) ? "en" : "ru";

export const stripLocale = (path: string) => {
  const stripped = path.replace(/^\/(?:en|ru)(?=\/|[?#]|$)/, "");
  return !stripped || /^[?#]/.test(stripped) ? `/${stripped}` : stripped;
};

export const localizeHref = (href: string, locale: Locale = "ru") => {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = stripLocale(href);
  return `/${locale}${path === "/" ? "/" : path}`;
};
