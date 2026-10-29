import { ArrowRight02StrokeRoundedIcon } from "@/shared/lib/icons/arrow-right-02-stroke-rounded";
import type { Locale } from "@/shared/lib/i18n/locale";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import { MotionPreferenceControl } from "./motion-preference-control";
import type { getVisualText } from "../model/locale-content";

type ContactFooterProps = { copy: ReturnType<typeof getVisualText>; locale: Locale };

export const ContactFooter = (props: ContactFooterProps) => {
  const {
    copy,
    locale,
  } = props;
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 font-[family-name:var(--font-visual-mono)] text-[13px] leading-[1.04] tracking-[.001em] text-site-contact-text-e">
      <div className="flex flex-wrap items-center gap-5 sm:gap-[19px]"><span>© 2026</span><span>DESIGNED &amp; BUILT BY KUMINOVVV</span></div>
      <div className="flex flex-wrap items-center gap-x-[34px] gap-y-4"><MotionPreferenceControl locale={locale} /><LanguageSwitcher locale={locale} /><a href="#top" className="inline-flex items-center gap-[11px] text-site-contact-accent-c focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-switch-accent-b)]">{copy.top}<ArrowRight02StrokeRoundedIcon aria-hidden="true" size={20} className="-rotate-90" /></a></div>
    </div>
  );
};
