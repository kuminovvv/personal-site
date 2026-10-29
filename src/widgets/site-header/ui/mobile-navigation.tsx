import Link from "next/link";
import type {getSiteNavigation} from "@/shared/config/site-navigation";
import type {Locale} from "@/shared/lib/i18n/locale";
import {LanguageSwitcher} from "@/shared/ui/language-switcher";

type MobileNavigationProps = {
    navigation: ReturnType<typeof getSiteNavigation>;
    locale: Locale;
    label: string;
    isCurrentAction: (href: string) => boolean;
    onCloseAction: () => void;
};

export const MobileNavigation = (props: MobileNavigationProps) => {
    const {
        navigation,
        locale,
        label,
        isCurrentAction,
        onCloseAction,
    } = props;
    return (
        <nav
            className="absolute top-12 right-0 z-10 grid min-w-45 rounded-[18px] bg-site-surface p-3 shadow-[0_14px_40px_var(--site-catalog-accent)]"
            aria-label={label}>
            {navigation.map(({label, href}) => {
                const isActive = isCurrentAction(href);
                return (
                    <Link
                        aria-current={isActive ? "page" : undefined}
                        href={href}
                        key={href}
                        className="rounded-[10px] px-3 py-2.5 text-site-text hover:bg-site-accent-soft aria-[current=page]:bg-site-green aria-[current=page]:text-site-on-green"
                        onClick={onCloseAction}
                    >
                        {label}
                    </Link>
                );
            })}
            <div className="hidden px-3 max-[540px]:block"><LanguageSwitcher locale={locale}/></div>
        </nav>
    );
};
