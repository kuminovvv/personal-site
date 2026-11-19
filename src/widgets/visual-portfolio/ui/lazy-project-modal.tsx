import dynamic from "next/dynamic";
import { loadProjectModal } from "../model/load-project-modal";

export const ProjectModal = dynamic(() => loadProjectModal().then((module) => module.ProjectModal));
