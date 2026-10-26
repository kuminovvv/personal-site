import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { ResumeCareerCard } from "./resume-career-card";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getResumeUiCopy } from "../model/ui-copy";

type ResumeCareerProps = { jobs: SiteContent["home"]["experience"]["jobs"]; locale?: Locale };

export const ResumeCareer = (props: ResumeCareerProps) => {
  const { jobs, locale = "ru" } = props;
  const copy = getResumeUiCopy(locale);

  return (
    <section className="mt-8" aria-labelledby="resume-career-title">
      <div className="mb-6 flex items-end justify-between gap-5 max-[680px]:items-start max-[680px]:flex-col max-[680px]:gap-2">
        <div>
          <p className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{copy.career}</p>
          <h2 id="resume-career-title" className="mt-2 font-heading text-[27px] leading-tight font-bold tracking-[-0.035em] max-[680px]:text-[23px]">{copy.careerTitle}</h2>
        </div>
        <p className="text-[13px] text-site-subtle">{copy.careerMeta}</p>
      </div>
      <div className="grid gap-5">
        {jobs.map((job) => (
          <ResumeCareerCard job={job} key={job.name} locale={locale} />
        ))}
      </div>
    </section>
  );
};
