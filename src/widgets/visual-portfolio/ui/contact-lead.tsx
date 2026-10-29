import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons/arrow-up-right-01-stroke-rounded";
import type { Locale } from "@/shared/lib/i18n/locale";
import type { getVisualText } from "../model/locale-content";

type ContactLeadProps = { copy: ReturnType<typeof getVisualText>; locale: Locale };

export const ContactLead = (props: ContactLeadProps) => {
  const {
    copy,
    locale,
  } = props;
  return (
    <div data-motion="fade" data-motion-order="2" className="flex flex-col items-start gap-[26px]">
      <p className="font-[family-name:var(--font-visual-text)] text-[clamp(17px,1.3vw,25px)] leading-[1.42] tracking-[-.0035em] text-site-contact-text-c">{copy.contactDescription}</p>
      <a href={`mailto:kuminovvv@mail.ru?subject=${encodeURIComponent(locale === "en" ? "Discuss a project" : "Обсудить проект")}`} className="group inline-flex min-h-[94px] items-center justify-center gap-4 rounded-full bg-site-switch-accent-b px-16 font-[family-name:var(--font-visual-text)] text-[24px] leading-none font-bold tracking-[-.0065em] text-site-contact-surface-d transition-[background-color,scale] duration-(--motion-quick) ease-(--motion-out) hover:bg-site-contact-surface-e active:bg-site-contact-accent-b site-motion:active:scale-[.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-switch-accent-b)] max-[480px]:min-h-[70px] max-[480px]:px-8 max-[480px]:text-[18px]">
        {copy.discuss}<ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={31} strokeWidth={2} className="transition-transform duration-(--motion-hover) ease-(--motion-out) site-motion:group-hover:translate-x-0.5 site-motion:group-hover:-translate-y-0.5 site-motion:group-focus-visible:translate-x-0.5 site-motion:group-focus-visible:-translate-y-0.5" />
      </a>
    </div>
  );
};
