import Link from "next/link";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getSiteFooterNavigation } from "@/shared/config/site-navigation";

type FooterNavigationProps = { locale: Locale; };

export const FooterNavigation = (props: FooterNavigationProps) => {
  const {
    locale,
  } = props;
  return (
<div className="grid max-w-92.5 grid-cols-2 gap-x-5.5 gap-y-4.5">
            {getSiteFooterNavigation(locale).map((item) => (
              <Link className="text-[16px] text-white hover:text-site-green" href={item.footerHref} key={item.href}>
                {item.footerLabel}
              </Link>
            ))}
          </div>
  );
};
