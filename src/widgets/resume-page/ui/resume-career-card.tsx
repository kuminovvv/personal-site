import type { SiteContent } from "@/shared/lib/content/get-site-content";
import type { Locale } from "@/shared/lib/i18n/locale";
import { CareerUniversityAchievements } from "./career-university-achievements";
import { CareerProjectAchievements } from "./career-project-achievements";
import { resumeCareer } from "../model/resume-content";
import { getResumeContent } from "../model/resume-content";
import { getResumeUiCopy } from "../model/ui-copy";

type ResumeCareerCardProps = {
  job: SiteContent["home"]["experience"]["jobs"][number];
  locale?: Locale;
};

export const ResumeCareerCard = (props: ResumeCareerCardProps) => {
  const {
    job,
    locale = "ru",
  } = props;
  const career = locale === "en" ? getResumeContent(locale).career : resumeCareer;
  const copy = getResumeUiCopy(locale);
  const isUniversity = job.university;
  const content = isUniversity ? career.omsu : career.gazprom;

  return (
    <article className="grid grid-cols-[minmax(235px,330px)_minmax(0,1fr)] gap-x-8 gap-y-7 rounded-[23px] bg-site-surface p-7 max-[900px]:grid-cols-1 max-[680px]:gap-6 max-[680px]:p-5">
      <header className="min-w-0">
        <p className="text-[11px] font-semibold uppercase text-site-green-text dark:text-site-green">{job.period}</p>
        <h3 className="mt-4 font-heading text-[21px] leading-[1.2] font-bold tracking-[-0.025em] max-[680px]:text-[19px]">{job.name}</h3>
        <p className="mt-3 text-[14px] leading-[1.4] font-semibold">{content.role}</p>
        <p className="mt-3 text-[13px] leading-[1.45] text-site-subtle">{content.focus}</p>
      </header>

      <div className="min-w-0">
        <p className="text-[17px] leading-[1.5] font-semibold max-[680px]:text-[15px]">{content.lead}</p>
        {isUniversity ? (
          <CareerUniversityAchievements achievements={career.omsu.achievements} label={copy.omSu} />
        ) : (
          <CareerProjectAchievements achievements={career.gazprom.achievements} label={copy.gazprom} />
        )}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={copy.technologies}>
          {content.technologies.map((technology) => (
            <li className="rounded-full bg-site-soft px-3.5 py-2 text-[12px] font-medium" key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};
