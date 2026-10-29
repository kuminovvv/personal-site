import type { getVisualText } from "../model/locale-content";

type ApproachSideListProps = { copy: ReturnType<typeof getVisualText> };

export const ApproachSideList = (props: ApproachSideListProps) => {
  const {
    copy,
  } = props;
  return (
    <div className="flex flex-col justify-around gap-8">
      {copy.side.map(([category, title], index) => <div key={category} data-motion="fade" data-motion-order={index + 1} className="border-b border-site-approach-border pb-8"><div className="mb-4 flex justify-between font-[family-name:var(--font-visual-mono)] text-[14px] text-site-approach-border-c"><span>0{index + 1}</span><span className="text-[13px] tracking-[.008em]">{category}</span></div><p className="font-[family-name:var(--visual-heading-font-stack)] text-[clamp(23px,1.51vw,29px)] leading-[1.15] font-semibold tracking-[-.009em]">{title}</p></div>)}
    </div>
  );
};
