import type {ProjectCase} from "@/shared/config/project-cases";
import {cn} from "@/shared/lib/utils";
import {ProjectCaseCategory} from "./project-case-category";
import {ProjectCaseFact} from "./project-case-fact";
import {ProjectCaseTagline} from "./project-case-tagline";

type ProjectCaseHeaderProps = {
  copy: ReturnType<typeof import("../model/copy").getProjectCaseCopy>;
  editorial: boolean;
  project: ProjectCase;
};

export const ProjectCaseHeader = (props: ProjectCaseHeaderProps) => {
  const {
    copy,
    editorial,
    project,
  } = props;
  return (
    <header className={cn("grid min-h-105 grid-cols-[minmax(0,1fr)_minmax(300px,440px)] items-center gap-14 max-[1180px]:gap-9 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-9 max-[680px]:gap-7", editorial && "min-h-83.5 grid-cols-[minmax(0,1fr)_442px] gap-x-[68px] max-[1180px]:gap-8 max-[900px]:grid-cols-1")}>
      <div className={cn("flex min-w-0 flex-col items-start gap-6 max-[680px]:gap-5", editorial && "gap-4.5")}>
        <ProjectCaseCategory project={project}/>
        <h1 className={cn("w-full min-w-0 font-heading text-[clamp(42px,5vw,67px)] leading-[1.08] font-bold tracking-[-0.05em] wrap-anywhere max-[680px]:text-[clamp(29px,7.5vw,38px)]", editorial && "text-[67px] max-[1100px]:text-[clamp(42px,5vw,67px)] max-[680px]:text-[clamp(29px,7.5vw,38px)]")}>{project.title}{project.slug === "soobota" ? "." : ""}</h1>
        <ProjectCaseTagline copy={copy} editorial={editorial} project={project}/>
        <p className={cn("max-w-175 text-[18px] leading-[1.65] text-site-subtle max-[680px]:text-[16px]", editorial && "max-w-205 text-[17px] leading-[1.43] max-[680px]:text-[16px]")}>{project.description}</p>
      </div>
      <aside className={cn("rounded-[24px] bg-site-surface px-9 py-8 max-[680px]:px-6 max-[680px]:py-6", editorial && "flex h-83.5 flex-col justify-between rounded-[18px] px-7 pt-6.5 pb-5 max-[900px]:h-auto max-[900px]:gap-4")} aria-label={copy.overview}>
        <h2 className="font-sans! text-[11px]! font-semibold! tracking-normal! text-site-green-text dark:text-site-green">{copy.overview}</h2>
        <dl className={cn("mt-5", editorial && "mt-0 flex h-64.5 flex-col justify-between max-[900px]:h-auto")}>
          {project.facts.map((fact) => <ProjectCaseFact key={fact.label} fact={fact} editorial={editorial}/>) }
        </dl>
      </aside>
    </header>
  );
};
