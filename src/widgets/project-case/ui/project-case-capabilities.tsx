import type {ProjectCase} from "@/shared/config/project-cases";
import {ProjectCaseCapability} from "./project-case-capability";

type ProjectCaseCapabilitiesProps = {items: ProjectCase["capabilities"]; editorial: boolean};

export const ProjectCaseCapabilities = (props: ProjectCaseCapabilitiesProps) => <ol className="min-w-0">{props.items.map((item, index) => <ProjectCaseCapability key={item.title} item={item} index={index} editorial={props.editorial}/>)}</ol>;
