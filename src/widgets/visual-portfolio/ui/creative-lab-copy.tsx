import type { getVisualExtraText, getVisualText } from "../model/locale-content";

type CreativeLabCopyProps = { copy: ReturnType<typeof getVisualText>; extra: ReturnType<typeof getVisualExtraText> };

export const CreativeLabCopy = (props: CreativeLabCopyProps) => {
  const {
    copy,
    extra,
  } = props;
  return (
    <div className="flex flex-col justify-between gap-10">
      <div className="flex justify-between gap-4 font-[family-name:var(--font-visual-mono)] text-[12px] text-site-creative-text-b"><span>VISUAL STUDY / CONCEPT</span><span className="text-site-creative-text-c">{extra.labProgress}</span></div>
      <h3 className="font-[family-name:var(--visual-heading-font-stack)] leading-[.99] font-semibold"><span className="block text-[clamp(53px,3.65vw,70px)] tracking-[-.027em] max-[640px]:text-[clamp(30px,8vw,53px)]">{extra.labLines[0]}</span><span className="-mt-[10px] block text-[clamp(53px,3.86vw,74px)] tracking-[-.027em] text-site-creative-text-d max-[640px]:-mt-[6px] max-[640px]:text-[clamp(36px,10vw,53px)]">{extra.labLines[1]}</span><span className="-mt-[10px] block text-[clamp(53px,3.86vw,74px)] tracking-[-.027em] text-site-creative-text-e max-[640px]:-mt-[6px] max-[640px]:text-[clamp(36px,10vw,53px)]">{extra.labLines[2]}</span></h3>
      <div className="space-y-4"><p className="max-w-[565px] text-[clamp(16px,1.04vw,20px)] leading-[1.39] text-site-creative-text-f">{copy.labDescription}</p><p className="font-[family-name:var(--font-visual-mono)] text-[11px] leading-[1.2] text-site-creative-text-g">{extra.labFootnote}</p></div>
      <div className="flex flex-wrap gap-2">{["CANVAS API", "MOTION", "WEBGL"].map((tag) => <span key={tag} className="rounded-full bg-site-creative-surface-c px-5 py-3 font-[family-name:var(--font-visual-mono)] text-[12px] text-site-creative-surface-d">{tag}</span>)}</div>
    </div>
  );
};
