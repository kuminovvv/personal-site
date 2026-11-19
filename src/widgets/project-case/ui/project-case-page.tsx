import Link from "next/link";
import {ArrowUpRight01StrokeRoundedIcon} from "@/shared/lib/icons";
import type {ProjectCase} from "@/shared/config/project-cases";
import type {Locale} from "@/shared/lib/i18n/locale";
import {localizeHref} from "@/shared/lib/i18n/locale";
import {cn} from "@/shared/lib/utils";
import {getProjectCaseCopy} from "../model/copy";
import {editorialSectionClassName, sectionClassName} from "../model/styles";
import {ProjectCaseHeader} from "./project-case-header";
import {ProjectCaseSections} from "./project-case-sections";
type ProjectCasePageProps = {project: ProjectCase; locale?: Locale};

export const ProjectCasePage = (props: ProjectCasePageProps) => {
  const {
    project,
    locale = "ru",
  } = props;
  const copy = getProjectCaseCopy(locale);
  const editorial = project.slug === "soobota";
  const panelClassName = editorial ? editorialSectionClassName : sectionClassName;
  return <article className={cn("pt-14 max-[900px]:pt-10 max-[680px]:pt-8", editorial && "pt-8 max-[900px]:pt-8")} data-page="project-case">
    <ProjectCaseHeader copy={copy} editorial={editorial} project={project}/>
    <ProjectCaseSections copy={copy} editorial={editorial} panelClassName={panelClassName} project={project}/>
    <div className={cn("mt-10 rounded-site-32 bg-site-surface px-12 py-14 text-center max-[680px]:mt-6 max-[680px]:px-6 max-[680px]:py-9", editorial && "mt-8 px-10 py-8.5 max-[680px]:mt-6 max-[680px]:px-6 max-[680px]:py-9")}><p className={cn("mx-auto max-w-230 font-heading text-[clamp(18px,2vw,23px)] leading-[1.5] font-bold", editorial && "max-w-none text-[23px] leading-[1.18] max-[680px]:text-[18px]")}>{project.closing}</p></div>
    <nav className={cn("mt-8 flex flex-wrap items-center justify-between gap-3 max-[680px]:mt-6", editorial && "mt-5")} aria-label={copy.actions}>
      <Link className="inline-flex min-h-12 items-center rounded-full bg-site-surface px-6 text-[14px] font-medium text-site-text" href={localizeHref("/projects", locale)}>{copy.allProjects}</Link>
      {project.externalUrl && <a className="inline-flex min-h-12 items-center gap-2 rounded-full bg-site-green px-6 text-[14px] font-medium text-site-on-green" href={project.externalUrl} target="_blank" rel="noopener noreferrer">{project.externalLabel ?? copy.openProject}<ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={22}/></a>}
    </nav>
  </article>;
};
