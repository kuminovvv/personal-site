import type {ProjectCase} from "@/shared/config/project-cases";
import {cn} from "@/shared/lib/utils";
import type {getProjectCaseCopy} from "../model/copy";
type Props = {copy: ReturnType<typeof getProjectCaseCopy>; editorial: boolean; project: ProjectCase};
export const ProjectCaseTagline = (props: Props) => <p className={cn("max-w-212.5 font-heading text-[clamp(22px,2.25vw,29px)] leading-[1.35] font-bold tracking-[-0.04em]", props.editorial && "text-[28px] leading-[1.27] max-[680px]:text-[clamp(22px,5vw,28px)]")}>{props.editorial ? <><>{props.copy.editorialLead}</><span className="block">{props.copy.editorialTail}</span></> : props.project.tagline}</p>;
