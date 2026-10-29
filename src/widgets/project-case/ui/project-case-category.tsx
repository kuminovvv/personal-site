import type {ProjectCase} from "@/shared/config/project-cases";
type Props = {project: ProjectCase};
export const ProjectCaseCategory = (props: Props) => <p className="flex items-center gap-3 text-[12px] font-semibold tracking-[0.02em] text-site-subtle"><span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-site-green"/>{props.project.category}</p>;
