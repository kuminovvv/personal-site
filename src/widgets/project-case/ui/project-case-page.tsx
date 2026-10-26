import Link from "next/link";
import {ArrowUpRight01StrokeRoundedIcon} from "@/shared/lib/icons";
import type {ProjectCase} from "@/shared/config/project-cases";
import {cn} from "@/shared/lib/utils";
import type { Locale } from "@/shared/lib/i18n/locale";
import { localizeHref } from "@/shared/lib/i18n/locale";
import { getProjectCaseCopy } from "../model/copy";

const sectionClassName =
    "grid grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] gap-x-20 gap-y-8 rounded-site-32 bg-site-surface px-12 py-14 max-[1180px]:gap-x-12 max-[1100px]:px-10 max-[1100px]:py-12 max-[900px]:grid-cols-1 max-[900px]:gap-y-7 max-[900px]:p-9 max-[680px]:gap-y-5 max-[680px]:p-6";

const editorialSectionClassName =
    "grid grid-cols-[minmax(0,429px)_minmax(0,1fr)] gap-x-[72px] rounded-site-32 bg-site-surface p-8 max-[1100px]:gap-x-10 max-[900px]:grid-cols-1 max-[900px]:gap-y-6 max-[680px]:p-6";

export const ProjectCasePage = ({project, locale = "ru"}: { project: ProjectCase; locale?: Locale }) => {
    const copy = getProjectCaseCopy(locale);
    const editorial = project.slug === "soobota";
    const panelClassName = editorial ? editorialSectionClassName : sectionClassName;

    return (
    <article className={cn("pt-14 max-[900px]:pt-10 max-[680px]:pt-8", editorial && "pt-8 max-[900px]:pt-8")} data-page="project-case">
        <header
            className={cn("grid min-h-105 grid-cols-[minmax(0,1fr)_minmax(300px,440px)] items-center gap-14 max-[1180px]:gap-9 max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:gap-9 max-[680px]:gap-7", editorial && "min-h-83.5 grid-cols-[minmax(0,1fr)_442px] gap-x-[68px] max-[1180px]:gap-8 max-[900px]:grid-cols-1")}>
            <div className={cn("flex min-w-0 flex-col items-start gap-6 max-[680px]:gap-5", editorial && "gap-4.5")}>
                <p className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.02em] text-site-subtle">
                    <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-site-green"/>
                    {project.category}
                </p>
                <h1 className={cn("w-full min-w-0 font-heading text-[clamp(42px,5vw,67px)] leading-[1.08] font-bold tracking-[-0.05em] wrap-anywhere max-[680px]:text-[clamp(29px,7.5vw,38px)]", editorial && "text-[67px] max-[1100px]:text-[clamp(42px,5vw,67px)] max-[680px]:text-[clamp(29px,7.5vw,38px)]")}>
                    {project.title}{project.slug === "soobota" ? "." : ""}
                </h1>
                <p className={cn("max-w-212.5 font-heading text-[clamp(22px,2.25vw,29px)] leading-[1.35] font-bold tracking-[-0.04em]", editorial && "text-[28px] leading-[1.27] max-[680px]:text-[clamp(22px,5vw,28px)]")}>
                    {editorial ? <>{copy.editorialLead}<span className="block">{copy.editorialTail}</span></> : project.tagline}
                </p>
                <p className={cn("max-w-175 text-[18px] leading-[1.65] text-site-subtle max-[680px]:text-[16px]", editorial && "max-w-205 text-[17px] leading-[1.43] max-[680px]:text-[16px]")}>
                    {project.description}
                </p>
            </div>
            <aside className={cn("rounded-[24px] bg-site-surface px-9 py-8 max-[680px]:px-6 max-[680px]:py-6", editorial && "flex h-83.5 flex-col justify-between rounded-[18px] px-7 pt-6.5 pb-5 max-[900px]:h-auto max-[900px]:gap-4")} aria-label={copy.overview}>
                <h2 className="font-sans! text-[11px]! font-semibold! tracking-normal! text-site-green-text dark:text-site-green">
                    {copy.overview}
                </h2>
                <dl className={cn("mt-5", editorial && "mt-0 flex h-64.5 flex-col justify-between max-[900px]:h-auto")}>
                    {project.facts.map(({label, value}) => (
                        <div className={cn("border-b border-site-border py-4.5 first:pt-2 last:border-0 last:pb-0 max-[680px]:py-3.5", editorial && "py-3.5 first:pt-0 max-[900px]:py-3.5")} key={label}>
                            <dt className={cn("mb-2.5 text-[11px] font-semibold text-site-subtle", editorial && "mb-1.75 text-[10px]")}>{label}</dt>
                            <dd className={cn("text-[16px] leading-[1.45] font-medium text-site-text max-[680px]:text-[15px]", editorial && "text-[15px] leading-[1.17]")}>{value}</dd>
                        </div>
                    ))}
                </dl>
            </aside>
        </header>

        <div className={cn("mt-14 grid gap-7 max-[900px]:mt-10 max-[900px]:gap-5 max-[680px]:mt-8 max-[680px]:gap-4", editorial && "mt-8.5 gap-4 max-[900px]:mt-7 max-[900px]:gap-4")}>
            <section
                className={panelClassName}
                aria-labelledby="case-problem-title">
                <div>
                    <p className={cn("mb-7 text-[12px] font-semibold text-site-green-text dark:text-site-green max-[680px]:mb-4", editorial && "mb-4")}>01 /
                        {copy.context}</p>
                    <h2 id="case-problem-title"
                        className="max-w-110 font-heading text-[28px]! leading-[1.22]!">{project.problem.heading}</h2>
                </div>
                <div>
                    <h3 className={cn("text-[22px] leading-[1.4] font-semibold max-[680px]:text-[20px]", editorial && "text-[21px] leading-[1.3]")}>{project.problem.lead}</h3>
                    <p className={cn("mt-7 text-[17px] leading-[1.7] text-site-subtle max-[680px]:mt-4 max-[680px]:text-[16px]", editorial && "mt-5 text-[17px] leading-[1.48]")}>{project.problem.description}</p>
                </div>
            </section>

            <section
                className={panelClassName}
                aria-labelledby="case-product-title">
                <div>
                    <p className={cn("mb-7 text-[12px] font-semibold text-site-green-text dark:text-site-green max-[680px]:mb-4", editorial && "mb-4")}>02 /
                        {copy.implementation}</p>
                    <h2 id="case-product-title" className="font-heading text-[29px]! leading-[1.2]!">
                        {project.slug === "eservice-redesign" ? copy.designSolution : copy.keySolutions}
                    </h2>
                    <p className={cn("mt-6 max-w-90 text-[16px] leading-[1.6] text-site-subtle max-[680px]:mt-4", editorial && "mt-4 max-w-110 text-[16px] leading-[1.4]")}>{project.capabilitiesNote}</p>
                </div>
                <ol className="min-w-0">
                    {project.capabilities.map((item, index) => (
                        <li className={cn("flex items-start gap-6 border-b border-site-border py-7 first:pt-0 last:border-0 last:pb-0 max-[680px]:gap-5 max-[680px]:py-5", editorial && "gap-5 py-4 first:pt-0 max-[680px]:py-5")}
                            key={item.title}>
              <span className="mt-1 text-[16px] font-semibold text-site-green-text dark:text-site-green">
                {String(index + 1).padStart(2, "0")}
              </span>
                            <div className="min-w-0 flex-1">
                                <h3 className={cn("text-[21px] leading-[1.35] font-semibold wrap-anywhere max-[430px]:text-[18px]", editorial && "text-[21px] leading-[1.2]")}>{item.title}</h3>
                                <p className={cn("mt-4 text-[16px] leading-[1.6] text-site-subtle max-[680px]:mt-3", editorial && "mt-3 text-[16px] leading-[1.4]")}>{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section
                className={panelClassName}
                aria-labelledby="case-role-title">
                <div>
                    <p className={cn("mb-7 text-[12px] font-semibold text-site-green-text dark:text-site-green max-[680px]:mb-4", editorial && "mb-4")}>03 /
                        {copy.contribution}</p>
                    <h2 id="case-role-title" className="font-heading text-[29px]! max-[430px]:text-[23px]!">{copy.responsibility}</h2>
                </div>
                <div>
                    <h3 className={cn("text-[22px] leading-[1.4] font-semibold max-[680px]:text-[20px]", editorial && "text-[21px] leading-[1.3]")}>{project.role.lead}</h3>
                    <p className={cn("mt-7 text-[17px] leading-[1.7] text-site-subtle max-[680px]:mt-4 max-[680px]:text-[16px]", editorial && "mt-5 text-[17px] leading-[1.45]")}>{project.role.description}</p>
                    {project.role.note && (
                        <p className={cn("mt-8 rounded-site-12 bg-site-sage px-6 py-5 text-[14px] leading-[1.6] max-[680px]:mt-5 max-[680px]:px-4.5 max-[680px]:py-4", editorial && "mt-5 px-4.5 py-3.75 leading-[1.3]")}>
                            {project.role.note}
                        </p>
                    )}
                </div>
            </section>

            <section
                className={panelClassName}
                aria-labelledby="case-tech-title">
                <div>
                    <p className={cn("mb-7 text-[12px] font-semibold text-site-green-text max-[680px]:mb-4", editorial && "mb-4")}>04 / {copy.technology}</p>
                    <h2 id="case-tech-title" className="font-heading text-[29px]!">{copy.underTheHood}</h2>
                </div>
                <ul className={cn("flex flex-wrap content-start gap-3.5 max-[680px]:gap-2.75", editorial && "gap-2.75")}>
                    {project.technologies.map((technology) => (
                        <li className={cn("rounded-full bg-site-surface-raised px-8 py-4 text-[13px] leading-none text-site-text max-[680px]:px-6 max-[680px]:py-3.5", editorial && "px-8 py-3 max-[680px]:px-6 max-[680px]:py-3")}
                            key={technology}>{technology}</li>
                    ))}
                </ul>
            </section>
        </div>

        <div className={cn("mt-10 rounded-site-32 bg-site-surface px-12 py-14 text-center max-[680px]:mt-6 max-[680px]:px-6 max-[680px]:py-9", editorial && "mt-8 px-10 py-8.5 max-[680px]:mt-6 max-[680px]:px-6 max-[680px]:py-9")}>
            <p className={cn("mx-auto max-w-230 font-heading text-[clamp(18px,2vw,23px)] leading-[1.5] font-bold", editorial && "max-w-none text-[23px] leading-[1.18] max-[680px]:text-[18px]")}>{project.closing}</p>
        </div>

        <nav className={cn("mt-8 flex flex-wrap items-center justify-between gap-3 max-[680px]:mt-6", editorial && "mt-5")} aria-label={copy.actions}>
            <Link
                className="inline-flex min-h-12 items-center rounded-full bg-site-surface px-6 text-[14px] font-medium text-site-text"
                href={localizeHref("/projects", locale)}>
                {copy.allProjects}
            </Link>
            {project.externalUrl && (
                <a className="inline-flex min-h-12 items-center gap-2 rounded-full bg-site-green px-6 text-[14px] font-medium text-site-on-green"
                   href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                    {project.externalLabel ?? copy.openProject}
                    <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={22}/>
                </a>
            )}
        </nav>
    </article>
    );
};
