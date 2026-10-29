import type {ProjectCase} from "@/shared/config/project-cases";
import {cn} from "@/shared/lib/utils";
type Props = {fact: ProjectCase["facts"][number]; editorial: boolean};
export const ProjectCaseFact = (props: Props) => <div className={cn("border-b border-site-border py-4.5 first:pt-2 last:border-0 last:pb-0 max-[680px]:py-3.5", props.editorial && "py-3.5 first:pt-0 max-[900px]:py-3.5")}><dt className={cn("mb-2.5 text-[11px] font-semibold text-site-subtle", props.editorial && "mb-1.75 text-[10px]")}>{props.fact.label}</dt><dd className={cn("text-[16px] leading-[1.45] font-medium text-site-text max-[680px]:text-[15px]", props.editorial && "text-[15px] leading-[1.17]")}>{props.fact.value}</dd></div>;
