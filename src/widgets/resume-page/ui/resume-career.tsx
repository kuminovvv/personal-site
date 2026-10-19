import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { ResumeCareerCard } from "./resume-career-card";

type ResumeCareerProps = { jobs: SiteContent["home"]["experience"]["jobs"] };

export const ResumeCareer = (props: ResumeCareerProps) => {
  const { jobs } = props;

  return (
    <section className="mt-8" aria-labelledby="resume-career-title">
      <div className="mb-6 flex items-end justify-between gap-5 max-[680px]:items-start max-[680px]:flex-col max-[680px]:gap-2">
        <div>
          <p className="text-[11px] font-semibold text-site-green-text dark:text-site-green">01 / КАРЬЕРА</p>
          <h2 id="resume-career-title" className="mt-2 font-heading text-[27px] leading-tight font-bold tracking-[-0.035em] max-[680px]:text-[23px]">Опыт работы</h2>
        </div>
        <p className="text-[13px] text-site-subtle">Две организации · реальные задачи</p>
      </div>
      <div className="grid gap-5">
        {jobs.map((job) => (
          <ResumeCareerCard job={job} key={job.name} />
        ))}
      </div>
    </section>
  );
};
