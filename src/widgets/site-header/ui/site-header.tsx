"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { LinkButton } from "@/shared/ui/link-button";
import { getSiteNavigation } from "@/shared/config/site-navigation";
import { localizeHref, stripLocale, type Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";

const getCopy = createDictionary("header", {
  ru: { home: "Kuminovvv — главная", nav: "Основная навигация", mobile: "Мобильная навигация", light: "Включить светлую тему", dark: "Включить тёмную тему", darkLabel: "Тёмная", lightLabel: "Светлая", action: "Перейти", menu: "Меню" },
  en: { home: "Kuminovvv — home", nav: "Main navigation", mobile: "Mobile navigation", light: "Use light theme", dark: "Use dark theme", darkLabel: "Dark", lightLabel: "Light", action: "Contact", menu: "Menu" },
});

const getTheme = () => document.documentElement.classList.contains("dark");
const getServerTheme = () => false;
const subscribeToTheme = (onChange: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== "portfolio-theme") return;
    document.documentElement.classList.toggle("dark", event.newValue === "dark");
    onChange();
  };
  document.addEventListener("portfolio-theme-change", onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    document.removeEventListener("portfolio-theme-change", onChange);
    window.removeEventListener("storage", onStorage);
  };
};

export const SiteHeader = ({ locale = "ru" }: { locale?: Locale }) => {
  const pathname = stripLocale(usePathname()).replace(/\/+$/, "") || "/";
  const copy = getCopy(locale);
  const navigation = getSiteNavigation(locale);
  const isCurrent = (href: string) => {
    const target = stripLocale(href).replace(/\/+$/, "") || "/";
    return pathname === target || (target !== "/" && pathname.startsWith(`${target}/`));
  };
  const isDark = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);
  const menuRef = useRef<HTMLDetailsElement>(null);

  useLayoutEffect(() => {
    let dark = document.documentElement.classList.contains("dark");
    try {
      dark = localStorage.getItem("portfolio-theme") === "dark";
    } catch {
      // Keep the theme already applied before hydration if storage is unavailable.
    }
    document.documentElement.classList.toggle("dark", dark);
    document.dispatchEvent(new Event("portfolio-theme-change"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
    } catch {
      // Theme switching still works if storage is unavailable.
    }
    document.dispatchEvent(new Event("portfolio-theme-change"));
  };

  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <header className="sticky top-4 z-50 mx-auto mt-4 flex min-h-20.25 w-[calc(100%-40px)] max-w-340 items-center justify-between gap-4 rounded-full bg-site-surface p-4 max-[900px]:w-[calc(100%-32px)] max-[900px]:rounded-[28px] max-[540px]:min-h-17 max-[540px]:w-[calc(100%-24px)] max-[540px]:p-2.5">
      <Link
        className="whitespace-nowrap px-5 font-heading text-[24px] font-black text-site-text max-[1180px]:px-2.5 max-[1180px]:text-[19px] max-[540px]:px-1.5 max-[540px]:text-[16px]"
        href={localizeHref("/", locale)}
        aria-label={copy.home}
      >
        Kuminovvv
      </Link>

      <nav className="flex items-center gap-1 max-[1100px]:hidden" aria-label={copy.nav}>
        {navigation.map(({ label, href }) => {
          const isActive = isCurrent(href);
          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`inline-flex min-h-12.25 items-center justify-center whitespace-nowrap rounded-full px-8 text-[16px] max-[1180px]:px-4.25 max-[1180px]:text-[14px] ${isActive ? "bg-site-green text-site-on-green" : "text-site-text hover:bg-site-soft"}`}
              href={href}
              key={href}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2">
        <div className="max-[540px]:hidden"><LanguageSwitcher locale={locale} /></div>
        <button
          aria-label={isDark ? copy.light : copy.dark}
          aria-pressed={isDark}
          className="inline-flex h-12.25 min-h-12.25 w-29 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-site-soft px-3 text-[12px] text-site-text outline-none dark:bg-site-canvas focus-visible:underline focus-visible:underline-offset-4 max-[540px]:size-11 max-[540px]:min-h-11 max-[540px]:p-0"
          onClick={toggleTheme}
          type="button"
        >
          <span aria-hidden="true" className="size-5.25 shrink-0 rounded-full bg-site-text" />
          <span className="dark:hidden max-[540px]:hidden">{copy.darkLabel}</span>
          <span className="hidden dark:inline max-[540px]:dark:hidden">{copy.lightLabel}</span>
        </button>
        <LinkButton className="border-0 dark:bg-site-canvas dark:hover:bg-site-canvas max-[1180px]:px-3.5 max-[1180px]:text-[14px] max-[1100px]:hidden" href={localizeHref("/contacts", locale)} tone="soft" size="header" arrow="up-right">
          {copy.action}
        </LinkButton>
      </div>

      <details className="relative order-2 hidden max-[1100px]:block" ref={menuRef}>
        <summary className="cursor-pointer list-none rounded-full bg-site-soft px-4 py-3 marker:hidden max-[540px]:px-3 max-[540px]:py-2.75 max-[540px]:text-[13px] [&::-webkit-details-marker]:hidden">{copy.menu}</summary>
        <nav className="absolute top-12 right-0 z-10 grid min-w-45 rounded-[18px] bg-site-surface p-3 shadow-[0_14px_40px_#0002]" aria-label={copy.mobile}>
          {navigation.map(({ label, href }) => {
            const isActive = isCurrent(href);
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                href={href}
                key={href}
                className="rounded-[10px] px-3 py-2.5 text-site-text hover:bg-site-accent-soft aria-[current=page]:bg-site-green aria-[current=page]:text-site-on-green"
                onClick={closeMenu}
              >
                {label}
              </Link>
            );
          })}
          <div className="hidden px-3 max-[540px]:block"><LanguageSwitcher locale={locale} /></div>
        </nav>
      </details>
    </header>
  );
};
