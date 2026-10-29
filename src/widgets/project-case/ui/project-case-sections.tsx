import type {ProjectCase} from "@/shared/config/project-cases";
import {cn} from "@/shared/lib/utils";
import type {getProjectCaseCopy} from "../model/copy";
import {ProjectCaseCapabilities} from "./project-case-capabilities";

type ProjectCaseSectionsProps = {copy: ReturnType<typeof getProjectCaseCopy>; editorial: boolean; panelClassName: string; project: ProjectCase};

export const ProjectCaseSections = (props: ProjectCaseSectionsProps) => {
  const {
    copy,
    editorial,
    panelClassName,
    project,
  } = props;
  return <div className={cn("mt-14 grid gap-7 max-[900px]:mt-10 max-[900px]:gap-5 max-[680px]:mt-8 max-[680px]:gap-4", editorial && "mt-8.5 gap-4 max-[900px]:mt-7 max-[900px]:gap-4")}>
    <section className={panelClassName} aria-labelledby="case-problem-title"><div><p className={cn("mb-7 text-[12px] font-semibold text-site-green-text dark:text-site-green max-[680px]:mb-4", editorial && "mb-4")}>01 / {copy.context}</p><h2 id="case-problem-title" className="max-w-110 font-heading text-[28px]! leading-[1.22]!">{project.problem.heading}</h2></div><div><h3 className={cn("text-[22px] leading-[1.4] font-semibold max-[680px]:text-[20px]", editorial && "text-[21px] leading-[1.3]")}>{project.problem.lead}</h3><p className={cn("mt-7 text-[17px] leading-[1.7] text-site-subtle max-[680px]:mt-4 max-[680px]:text-[16px]", editorial && "mt-5 text-[17px] leading-[1.48]")}>{project.problem.description}</p></div></section>
    <section className={panelClassName} aria-labelledby="case-product-title"><div><p className={cn("mb-7 text-[12px] font-semibold text-site-green-text dark:text-site-green max-[680px]:mb-4", editorial && "mb-4")}>02 / {copy.implementation}</p><h2 id="case-product-title" className="font-heading text-[29px]! leading-[1.2]!">{project.slug === "eservice-redesign" ? copy.designSolution : copy.keySolutions}</h2><p className={cn("mt-6 max-w-90 text-[16px] leading-[1.6] text-site-subtle max-[680px]:mt-4", editorial && "mt-4 max-w-110 text-[16px] leading-[1.4]")}>{project.capabilitiesNote}</p></div><ProjectCaseCapabilities items={project.capabilities} editorial={editorial}/></section>
    <section className={panelClassName} aria-labelledby="case-role-title"><div><p className={cn("mb-7 text-[12px] font-semibold text-site-green-text dark:text-site-green max-[680px]:mb-4", editorial && "mb-4")}>03 / {copy.contribution}</p><h2 id="case-role-title" className="font-heading text-[29px]! max-[430px]:text-[23px]!">{copy.responsibility}</h2></div><div><h3 className={cn("text-[22px] leading-[1.4] font-semibold max-[680px]:text-[20px]", editorial && "text-[21px] leading-[1.3]")}>{project.role.lead}</h3><p className={cn("mt-7 text-[17px] leading-[1.7] text-site-subtle max-[680px]:mt-4 max-[680px]:text-[16px]", editorial && "mt-5 text-[17px] leading-[1.45]")}>{project.role.description}</p>{project.role.note && <p className={cn("mt-8 rounded-site-12 bg-site-sage px-6 py-5 text-[14px] leading-[1.6] max-[680px]:mt-5 max-[680px]:px-4.5 max-[680px]:py-4", editorial && "mt-5 px-4.5 py-3.75 leading-[1.3]")}>{project.role.note}</p>}</div></section>
    <section className={panelClassName} aria-labelledby="case-tech-title"><div><p className={cn("mb-7 text-[12px] font-semibold text-site-green-text max-[680px]:mb-4", editorial && "mb-4")}>04 / {copy.technology}</p><h2 id="case-tech-title" className="font-heading text-[29px]!">{copy.underTheHood}</h2></div><ul className={cn("flex flex-wrap content-start gap-3.5 max-[680px]:gap-2.75", editorial && "gap-2.75")}>{project.technologies.map((technology) => <li className={cn("rounded-full bg-site-surface-raised px-8 py-4 text-[13px] leading-none text-site-text max-[680px]:px-6 max-[680px]:py-3.5", editorial && "px-8 py-3 max-[680px]:px-6 max-[680px]:py-3")} key={technology}>{technology}</li>)}</ul></section>
  </div>;
};
