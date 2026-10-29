"use client";

import {useCallback, useRef} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {LinkButton} from "@/shared/ui/link-button";
import {Button} from "@/shared/ui/button";
import {getSiteNavigation} from "@/shared/config/site-navigation";
import {localizeHref, stripLocale, type Locale} from "@/shared/lib/i18n/locale";
import {LanguageSwitcher} from "@/shared/ui/language-switcher";
import {MobileNavigation} from "./mobile-navigation";
import {getCopy} from "../model/copy";
import {useTheme} from "../model/use-theme";

type SiteHeaderProps = { locale?: Locale };

export const SiteHeader = (props: SiteHeaderProps) => {
    const {
        locale = "ru",
    } = props;
    const pathname = stripLocale(usePathname()).replace(/\/+$/, "") || "/";
    const copy = getCopy(locale);
    const navigation = getSiteNavigation(locale);
    const isCurrent = useCallback((href: string) => {
        const target = stripLocale(href).replace(/\/+$/, "") || "/";
        return pathname === target || (target !== "/" && pathname.startsWith(`${target}/`));
    }, [pathname]);
    const {isDark, toggleTheme} = useTheme();
    const menuRef = useRef<HTMLDetailsElement>(null);


    const closeMenu = useCallback(() => {
        if (menuRef.current) menuRef.current.open = false;
    }, []);

    return (
        <header
            className="sticky top-4 z-50 mx-auto mt-4 flex min-h-20.25 w-[calc(100%-40px)] max-w-340 items-center justify-between gap-4 rounded-full bg-site-surface p-4 max-[900px]:w-[calc(100%-32px)] max-[900px]:rounded-[28px] max-[540px]:min-h-17 max-[540px]:w-[calc(100%-24px)] max-[540px]:p-2.5">
            <Link
                className="whitespace-nowrap px-5 font-heading text-[24px] font-black text-site-text max-[1180px]:px-2.5 max-[1180px]:text-[19px] max-[540px]:px-1.5 max-[540px]:text-[16px]"
                href={localizeHref("/", locale)}
                aria-label={copy.home}
            >
                Kuminovvv
            </Link>

            <nav className="flex items-center gap-1 max-[1100px]:hidden" aria-label={copy.nav}>
                {navigation.map(({label, href}) => {
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
                <div className="max-[540px]:hidden"><LanguageSwitcher locale={locale}/></div>
                <Button variant="unstyled" size="unstyled"
                    aria-label={isDark ? copy.light : copy.dark}
                    aria-pressed={isDark}
                    className="inline-flex h-12.25 min-h-12.25 w-29 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border-0 bg-site-soft px-3 text-[12px] text-site-text outline-none dark:bg-site-canvas focus-visible:underline focus-visible:underline-offset-4 max-[540px]:size-11 max-[540px]:min-h-11 max-[540px]:p-0"
                    onClick={toggleTheme}
                    type="button"
                >
                    <span aria-hidden="true" className="size-5.25 shrink-0 rounded-full bg-site-text"/>
                    <span className="dark:hidden max-[540px]:hidden">{copy.darkLabel}</span>
                    <span className="hidden dark:inline max-[540px]:dark:hidden">{copy.lightLabel}</span>
                </Button>
                <LinkButton
                    className="border-0 dark:bg-site-canvas dark:hover:bg-site-canvas max-[1180px]:px-3.5 max-[1180px]:text-[14px] max-[1100px]:hidden"
                    href={localizeHref("/contacts", locale)} tone="soft" size="header" arrow="up-right">
                    {copy.action}
                </LinkButton>
            </div>

            <details className="relative order-2 hidden max-[1100px]:block" ref={menuRef}>
                <summary
                    className="cursor-pointer list-none rounded-full bg-site-soft px-4 py-3 marker:hidden max-[540px]:px-3 max-[540px]:py-2.75 max-[540px]:text-[13px] [&::-webkit-details-marker]:hidden">{copy.menu}</summary>
                <MobileNavigation navigation={navigation} locale={locale} label={copy.mobile}
                                  isCurrentAction={isCurrent} onCloseAction={closeMenu}/>
            </details>
        </header>
    );
};
