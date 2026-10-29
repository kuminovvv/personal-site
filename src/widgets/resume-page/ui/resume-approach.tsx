import type { Locale } from "@/shared/lib/i18n/locale";
import { ResumeApproachItem } from "./resume-approach-item";
import { getResumeApproach, resumeApproach } from "../model/resume-content";
import { getResumeUiCopy } from "../model/ui-copy";

type ResumeApproachProps = { locale?: Locale };

export const ResumeApproach = (props: ResumeApproachProps) => {
  const {
    locale = "ru",
  } = props;
  const items = locale === "en" ? getResumeApproach(locale) : resumeApproach;
  const copy = getResumeUiCopy(locale);
  return (
  <section className="mt-8 grid grid-cols-[minmax(0,330px)_minmax(0,1fr)] gap-5 max-[680px]:grid-cols-1" aria-labelledby="resume-approach-title">
    <div>
      <p className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{copy.approach}</p>
      <h2 id="resume-approach-title" className="mt-2 font-heading text-[27px] leading-tight font-bold tracking-[-0.035em]">{copy.approachTitle}</h2>
    </div>
    <div className="grid min-h-45 gap-4 rounded-[20px] bg-site-surface px-8 py-7 max-[680px]:px-6 max-[680px]:py-6">
      {items.map((item, index) => (
        <ResumeApproachItem key={item.title} item={item} index={index} principle={copy.principle} />
      ))}
    </div>
  </section>
  );
};
