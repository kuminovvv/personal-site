import type { getVisualText } from "../model/locale-content";
import { ApproachModelGrid } from "./approach-model-grid";

type ApproachSystemPanelProps = { copy: ReturnType<typeof getVisualText> };

export const ApproachSystemPanel = (props: ApproachSystemPanelProps) => {
  const {
    copy,
  } = props;
  return (
    <div data-motion="panel" className="rounded-[48px] bg-site-approach-surface-b p-8 max-[520px]:rounded-[26px] max-[520px]:p-5">
      <div className="flex justify-between gap-4 font-[family-name:var(--font-visual-mono)] text-[13px] leading-none text-site-approach-text-c"><span>KUMINOVVV / SYSTEM THINKING</span><span>01—03</span></div>
      <h3 className="mt-[29px] mb-[29px] text-[clamp(42px,4vw,73px)] leading-[.97] font-semibold tracking-[-.035em] text-site-approach-text-d max-[375px]:text-[35px]">{copy.interfaceTitle[0]}<br />{copy.interfaceTitle[1]}</h3>
      <div className="rounded-[18px] bg-white p-5">
        <div className="mb-5 flex justify-between gap-2 border-b border-site-approach-border pb-5 font-[family-name:var(--font-visual-mono)] text-[12px] text-site-approach-border-b"><span>{copy.model}</span><span>THINK → DESIGN → BUILD</span></div>
        <ApproachModelGrid copy={copy} />
        <p className="mt-5 font-[family-name:var(--font-visual-mono)] text-[12px] text-site-approach-text-e">{copy.result}</p>
      </div>
      <div className="mt-[29px] flex justify-between gap-3 font-[family-name:var(--font-visual-mono)] text-[12px] leading-none text-site-approach-text-c"><span>REACT / TYPESCRIPT / FSD</span><span>ENGINEERED WITH INTENT</span></div>
    </div>
  );
};
