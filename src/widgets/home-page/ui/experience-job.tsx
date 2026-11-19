import { LinkButton } from "@/shared/ui/link-button";
import { TagList } from "@/shared/ui/tag-list";
import { MiniWindow } from "./mini-window";

type ExperienceJobProps = { job: { name: string; period: string; status: string; role: string; href: string; action: string; university?: boolean; description: string; tags: readonly string[] } };

export const ExperienceJob = (props: ExperienceJobProps) => {
  const {
    job,
  } = props;
  return (
    <article className="min-w-0 rounded-site-32 bg-site-surface p-9 max-[1180px]:p-7 max-[900px]:p-6 max-[680px]:p-7 max-[400px]:p-5.5">
      <div className="flex items-center justify-between gap-3 text-[11px] text-site-subtle [&>span:last-child]:text-site-green-text dark:text-site-green"><span className="whitespace-nowrap rounded-full bg-site-soft px-6.5 py-3 text-[12px]">{job.period}</span><span>{job.status}</span></div>
      <div className="my-11 flex items-center justify-between gap-4 max-[900px]:my-8 [&_h3]:text-[clamp(20px,2vw,25px)] [&_p]:mt-2.5 [&_p]:text-[15px] [&_p]:text-site-subtle"><div><h3>{job.name}</h3><p>{job.role}</p></div><LinkButton href={job.href} tone="soft" size="job" arrow="up-right">{job.action}</LinkButton></div>
      <MiniWindow isUniversity={job.university} />
      <p className="my-10 text-[15px] leading-[1.65] max-[680px]:my-8">{job.description}</p>
      <TagList className="min-w-0" tags={job.tags} />
    </article>
  );
};
