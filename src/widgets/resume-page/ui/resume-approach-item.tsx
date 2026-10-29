import type { getResumeApproach } from "../model/resume-content";

type ResumeApproachItemProps = { item: ReturnType<typeof getResumeApproach>[number]; index: number; principle: string; };

export const ResumeApproachItem = (props: ResumeApproachItemProps) => {
  const {
    item,
    index,
    principle,
  } = props;
  return (
<div className="grid grid-cols-[95px_minmax(0,1fr)] items-start gap-5 max-[480px]:grid-cols-1 max-[480px]:gap-1.5" key={item.title}>
          <span className="text-[12px] font-semibold text-site-green-text dark:text-site-green">0{index + 1} / {principle}</span>
          <div>
            <h3 className="text-[15px] font-semibold">{item.title}</h3>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-site-subtle">{item.description}</p>
          </div>
        </div>
  );
};
