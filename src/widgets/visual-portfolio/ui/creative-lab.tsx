import { CreativeLabInteraction } from "./creative-lab-interaction";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualExtraText, getVisualText } from "../model/locale-content";

export const CreativeLab = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getVisualText(locale);
  const extra = getVisualExtraText(locale);
  return (
  <section id="lab">
    <div className="mb-[70px] flex flex-wrap justify-between gap-5 font-[family-name:var(--font-visual-mono)] leading-none text-[#5f5f65]">
      <span className="text-[14px] tracking-[.004em]">{copy.lab}</span><span className="text-[13px] tracking-[.002em]">{copy.labEyebrow}</span>
    </div>
    <h2 data-motion="heading" className="mb-[70px] font-[family-name:var(--visual-heading-font-stack)] text-[clamp(48px,6.04vw,116px)] leading-none font-semibold tracking-[-.04em] text-[#0b0b0b]">
      {copy.labTitle}
    </h2>
    <div data-motion="panel" className="grid min-h-[600px] grid-cols-[.75fr_1fr] gap-7 overflow-hidden rounded-[28px] bg-[#161a27] p-8 text-[#f8f7fc] min-[1600px]:grid-cols-[590px_minmax(0,788px)] min-[1600px]:gap-[78px] max-[1050px]:grid-cols-1 max-[640px]:min-h-[540px] max-[640px]:p-5">
      <div className="flex flex-col justify-between gap-10">
        <div className="flex justify-between gap-4 font-[family-name:var(--font-visual-mono)] text-[12px] text-[#b9b3d2]">
          <span>VISUAL STUDY / CONCEPT</span><span className="text-[#d5ffa9]">{extra.labProgress}</span>
        </div>
        <h3 className="font-[family-name:var(--visual-heading-font-stack)] leading-[.99] font-semibold">
          <span className="block text-[clamp(53px,3.65vw,70px)] tracking-[-.027em] max-[640px]:text-[clamp(30px,8vw,53px)]">{extra.labLines[0]}</span><span className="-mt-[10px] block text-[clamp(53px,3.86vw,74px)] tracking-[-.027em] text-[#ccff8e] max-[640px]:-mt-[6px] max-[640px]:text-[clamp(36px,10vw,53px)]">{extra.labLines[1]}</span><span className="-mt-[10px] block text-[clamp(53px,3.86vw,74px)] tracking-[-.027em] text-[#f5a3e5] max-[640px]:-mt-[6px] max-[640px]:text-[clamp(36px,10vw,53px)]">{extra.labLines[2]}</span>
        </h3>
        <div className="space-y-4"><p className="max-w-[565px] text-[clamp(16px,1.04vw,20px)] leading-[1.39] text-[#d5d4e2]">{copy.labDescription}</p><p className="font-[family-name:var(--font-visual-mono)] text-[11px] leading-[1.2] text-[#acabb9]">{extra.labFootnote}</p></div>
        <div className="flex flex-wrap gap-2">{["CANVAS API","MOTION","WEBGL"].map((tag)=><span key={tag} className="rounded-full bg-[#37394b] px-5 py-3 font-[family-name:var(--font-visual-mono)] text-[12px] text-[#ddd9ff]">{tag}</span>)}</div>
      </div>
      <CreativeLabInteraction locale={locale} />
    </div>
  </section>
  );
};
