import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";
import { ApproachSideList } from "./approach-side-list";
import { ApproachSystemPanel } from "./approach-system-panel";

type ApproachProps = { locale?: Locale };

export const Approach = (props: ApproachProps) => {
  const {
    locale = "ru",
  } = props;
  const copy = getVisualText(locale);
  return (
  <section id="approach" className="text-site-approach-text">
    <div className="mb-[63px] flex justify-between gap-4 font-[family-name:var(--font-visual-mono)] text-[14px] leading-[1.1] tracking-[.006em] text-site-approach-text-b"><span>{copy.approach}</span><span>ENGINEERING × DESIGN</span></div>
    <h2 data-motion="heading" className="mb-[62px] text-[clamp(48px,6vw,112px)] leading-[1.01] font-semibold tracking-[-.04em]">{copy.approachTitle}</h2>
    <div className="grid grid-cols-[1.42fr_1fr] gap-8 min-[1600px]:min-h-[588px] max-[850px]:grid-cols-1">
      <ApproachSystemPanel copy={copy} />
      <ApproachSideList copy={copy} />
    </div>
  </section>
  );
};
