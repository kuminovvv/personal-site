import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons/arrow-up-right-01-stroke-rounded";
import { ArrowRight02StrokeRoundedIcon } from "@/shared/lib/icons/arrow-right-02-stroke-rounded";
import { MotionPreferenceControl } from "./motion-preference-control";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";

const CONTACT_CHANNELS = [
  { label: "Telegram", description: "@kuminovvv", href: "https://t.me/kuminovvv" },
  { label: "GitHub", description: "github.com/kuminovvv", href: "https://github.com/kuminovvv" },
  { label: "Email", description: "kuminovvv@mail.ru", href: "mailto:kuminovvv@mail.ru" },
] as const;

export const Contact = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getVisualText(locale);
  return (
  <section
    id="contact"
    aria-labelledby="visual-contact-title"
    className="relative left-1/2 w-[calc(100%+2*var(--visual-page-inset))] -translate-x-1/2 bg-[#133a2c] text-[#f7fff7] min-[1600px]:min-h-[1292px]"
  >
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-[70px] px-6 pt-[97px] pb-[65px] sm:px-10 2xl:px-0 max-[768px]:gap-12 max-[768px]:pt-16 max-[768px]:pb-9">
      <span className="font-[family-name:var(--font-visual-mono)] text-[14px] leading-none tracking-[.0065em] text-[#d1e9d6]">
        {copy.contactLabel}
      </span>

      <h2
        id="visual-contact-title"
        className="flex flex-col font-[family-name:var(--visual-heading-font-stack)]! leading-[.95]! font-semibold max-[768px]:gap-1"
      >
        <span data-motion="line" className="text-[clamp(48px,8.54vw,164px)] tracking-[-.051em] text-white">
          {copy.contactTitle[0]}
        </span>
        <span data-motion="line" data-motion-order="1" className="-mt-[13px] text-[clamp(40px,7.71vw,148px)] tracking-[-.045em] text-[#bfff84] max-[768px]:mt-0">
          {copy.contactTitle[1]}
        </span>
      </h2>

      <div className="grid grid-cols-[minmax(0,858px)_minmax(0,554px)] items-start gap-[108px] max-[1100px]:grid-cols-1 max-[1100px]:gap-12">
        <div data-motion="fade" data-motion-order="2" className="flex flex-col items-start gap-[26px]">
          <p className="font-[family-name:var(--font-visual-text)] text-[clamp(17px,1.3vw,25px)] leading-[1.42] tracking-[-.0035em] text-[#e2f1e5]">
            {copy.contactDescription}
          </p>
          <a
            href={`mailto:kuminovvv@mail.ru?subject=${encodeURIComponent(locale === "en" ? "Discuss a project" : "Обсудить проект")}`}
            className="group inline-flex min-h-[94px] items-center justify-center gap-4 rounded-full bg-[#bfff84] px-16 font-[family-name:var(--font-visual-text)] text-[24px] leading-none font-bold tracking-[-.0065em] text-[#12392b] transition-[background-color,scale] duration-(--motion-quick) ease-(--motion-out) hover:bg-[#d0ffa5] active:bg-[#abe976] site-motion:active:scale-[.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bfff84] max-[480px]:min-h-[70px] max-[480px]:px-8 max-[480px]:text-[18px]"
          >
            {copy.discuss}
            <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={31} strokeWidth={2} className="transition-transform duration-(--motion-hover) ease-(--motion-out) site-motion:group-hover:translate-x-0.5 site-motion:group-hover:-translate-y-0.5 site-motion:group-focus-visible:translate-x-0.5 site-motion:group-focus-visible:-translate-y-0.5" />
          </a>
        </div>

        <div data-motion="fade" data-motion-order="3" className="border-t border-[#557064]">
          {CONTACT_CHANNELS.map(({ label, description, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("https:") ? "_blank" : undefined}
              rel={href.startsWith("https:") ? "noopener noreferrer" : undefined}
              className="group flex min-h-[94px] items-center justify-between gap-5 border-b border-[#557064] py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bfff84]"
            >
              <span className="flex flex-col gap-[7px]">
                <span className="font-[family-name:var(--visual-heading-font-stack)] text-[31px] leading-[1.1] font-bold tracking-[-.0085em] text-[#f7fff7] underline decoration-transparent decoration-1 underline-offset-6 transition-[text-decoration-color] duration-(--motion-quick) group-hover:decoration-[#bfff84] group-focus-visible:decoration-[#bfff84]">
                  {label}
                </span>
                <span className="font-[family-name:var(--font-visual-mono)] text-[11px] leading-[1.08] tracking-[.0025em] text-[#aad1b6]">
                  {description}
                </span>
              </span>
              <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={27} strokeWidth={1.8} className="shrink-0 text-[#bfff84] transition-transform duration-(--motion-hover) ease-(--motion-out) site-motion:group-hover:translate-x-0.5 site-motion:group-hover:-translate-y-0.5 site-motion:group-focus-visible:translate-x-0.5 site-motion:group-focus-visible:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-[#557064] pt-[38px]">
        <p data-motion="heading" className="font-[family-name:var(--visual-heading-font-stack)] text-[clamp(48px,11.3vw,217px)] leading-[.97] font-semibold tracking-[-.056em] text-[#bfff84]">
          kuminovvv
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 font-[family-name:var(--font-visual-mono)] text-[13px] leading-[1.04] tracking-[.001em] text-[#b1c9b9]">
        <div className="flex flex-wrap items-center gap-5 sm:gap-[19px]">
          <span>© 2026</span>
          <span>DESIGNED &amp; BUILT BY KUMINOVVV</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-[34px] gap-y-4">
          <MotionPreferenceControl locale={locale} />
          <LanguageSwitcher locale={locale} />
          <a
            href="#top"
            className="inline-flex items-center gap-[11px] text-[#f7fff4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bfff84]"
          >
            {copy.top}
            <ArrowRight02StrokeRoundedIcon aria-hidden="true" size={20} className="-rotate-90" />
          </a>
        </div>
      </div>
    </div>
  </section>
  );
};
