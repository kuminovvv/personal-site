"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { localizeHref, type Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";
import { cn } from "@/shared/lib/utils";

const getCopy = createDictionary("language-switcher", {
  ru: { label: "Язык сайта", ru: "Русский", en: "English" },
  en: { label: "Site language", ru: "Русский", en: "English" },
});
const subscribe = (notify: () => void) => {
  const events = ["popstate", "hashchange", "portfolio:project-change", "portfolio:location-change", "portfolio:locale-change"];
  events.forEach((event) => window.addEventListener(event, notify));
  return () => events.forEach((event) => window.removeEventListener(event, notify));
};
const getSnapshot = () => window.location.pathname + window.location.search + window.location.hash;

export const LanguageSwitcher = (props: { locale: Locale; className?: string }) => {
  const { locale, className } = props;
  const pathname = usePathname();
  const location = useSyncExternalStore(subscribe, getSnapshot, () => pathname);
  const copy = getCopy(locale);

  return (
    <nav aria-label={copy.label} className={cn("inline-flex shrink-0 items-center gap-2 text-[12px]", className)}>
      {(["ru", "en"] as const).map((language, index) => (
        <span key={language} className="inline-flex items-center gap-2">
          {index === 1 && <span aria-hidden="true" className="opacity-40">/</span>}
          <a href={localizeHref(location, language)} hrefLang={language} lang={language} aria-label={copy[language]}
            aria-current={locale === language ? "true" : undefined}
            onClick={(event) => {
              if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              try {
                localStorage.setItem("portfolio-locale", language);
              } catch {
                // Persist only when the browser allows local storage.
              }
              if (language === locale) {
                event.preventDefault();
                return;
              }
              if (document.querySelector("[data-visual-home]") && /^\/(?:ru|en)?\/?$/.test(window.location.pathname)) {
                event.preventDefault();
                const destination = new URL(event.currentTarget.href);
                const nextState = { ...window.history.state };
                // Closing an open modal must remain on the newly chosen language.
                delete nextState.kuminovProject;
                window.history.replaceState(nextState, "", destination);
                document.documentElement.lang = language;
                window.dispatchEvent(new Event("portfolio:locale-change"));
                return;
              }
              try {
                const destination = new URL(event.currentTarget.href);
                sessionStorage.setItem("portfolio-language-navigation", destination.pathname + destination.search + destination.hash);
              } catch {
                // The link still works if session storage is unavailable.
              }
            }}
            className="inline-flex min-h-11 items-center font-semibold opacity-60 hover:opacity-100 aria-[current=true]:opacity-100 aria-[current=true]:underline aria-[current=true]:underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
            {language.toUpperCase()}
          </a>
        </span>
      ))}
    </nav>
  );
};
