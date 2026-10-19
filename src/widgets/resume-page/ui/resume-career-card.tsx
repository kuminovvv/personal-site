import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { resumeCareer } from "../model/resume-content";

type ResumeCareerCardProps = {
  job: SiteContent["home"]["experience"]["jobs"][number];
};

export const ResumeCareerCard = (props: ResumeCareerCardProps) => {
  const { job } = props;
  const university = job.university;
  const content = university ? resumeCareer.omsu : resumeCareer.gazprom;

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
        {university ? (
          <ol className="mt-5 grid gap-3.5" aria-label="Задачи и проекты в ОмГУ">
            {resumeCareer.omsu.achievements.map((achievement, index) => (
              <li className="flex items-start gap-3 text-[14px] leading-[1.5] text-site-subtle" key={achievement}>
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-site-sage text-[11px] font-semibold text-site-green-text dark:text-site-green">
                  {index + 1}
                </span>
                <span className="pt-0.5">{achievement}</span>
              </li>
            ))}
          </ol>
        ) : (
          <ol className="mt-6 grid grid-cols-2 gap-4 max-[680px]:grid-cols-1" aria-label="Направления работы в Газпром ВНИИГАЗ">
            {resumeCareer.gazprom.achievements.map((achievement, index) => (
              <li className="rounded-[16px] bg-site-soft p-4" key={achievement.title}>
                <div className="flex items-baseline gap-3">
                  <span className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{String(index + 1).padStart(2, "0")}</span>
                  <h4 className="text-[14px] leading-snug font-semibold">{achievement.title}</h4>
                </div>
                <p className="mt-2 text-[13px] leading-[1.5] text-site-subtle">{achievement.description}</p>
              </li>
            ))}
          </ol>
        )}
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Технологии">
          {content.technologies.map((technology) => (
            <li className="rounded-full bg-site-soft px-3.5 py-2 text-[12px] font-medium" key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};
