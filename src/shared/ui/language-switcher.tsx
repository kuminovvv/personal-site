"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { localizeHref, type Locale } from "@/shared/lib/i18n/locale";
import { getLanguageLocationSnapshot, getLanguageServerSnapshot, getLanguageSwitcherCopy, subscribeLanguageLocation } from "@/shared/lib/language-switcher";
import { cn } from "@/shared/lib/utils";

type LanguageSwitcherProps = { locale: Locale; className?: string };

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const {
    locale,
    className,
  } = props;
  const pathname = usePathname();
  const location = useSyncExternalStore(subscribeLanguageLocation, getLanguageLocationSnapshot, () => getLanguageServerSnapshot(pathname));
  const copy = getLanguageSwitcherCopy(locale);

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
