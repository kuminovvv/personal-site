import type { Locale } from "@/shared/lib/i18n/locale";
import { CreativeLabInteraction } from "./creative-lab-interaction";
import { CreativeLabCopy } from "./creative-lab-copy";
import { getVisualExtraText, getVisualText } from "../model/locale-content";

type CreativeLabProps = { locale?: Locale };

export const CreativeLab = (props: CreativeLabProps) => {
  const {
    locale = "ru",
  } = props;
  const copy = getVisualText(locale);
  const extra = getVisualExtraText(locale);
  return (
  <section id="lab">
    <div className="mb-[70px] flex flex-wrap justify-between gap-5 font-[family-name:var(--font-visual-mono)] leading-none text-site-creative-text">
      <span className="text-[14px] tracking-[.004em]">{copy.lab}</span><span className="text-[13px] tracking-[.002em]">{copy.labEyebrow}</span>
    </div>
    <h2 data-motion="heading" className="mb-[70px] font-[family-name:var(--visual-heading-font-stack)] text-[clamp(48px,6.04vw,116px)] leading-none font-semibold tracking-[-.04em] text-site-about-text-b">
      {copy.labTitle}
    </h2>
    <div data-motion="panel" className="grid min-h-[600px] grid-cols-[.75fr_1fr] gap-7 overflow-hidden rounded-[28px] bg-site-creative-surface p-8 text-site-creative-surface-b min-[1600px]:grid-cols-[590px_minmax(0,788px)] min-[1600px]:gap-[78px] max-[1050px]:grid-cols-1 max-[640px]:min-h-[540px] max-[640px]:p-5">
      <CreativeLabCopy copy={copy} extra={extra} />
      <CreativeLabInteraction locale={locale} />
    </div>
  </section>
  );
};
