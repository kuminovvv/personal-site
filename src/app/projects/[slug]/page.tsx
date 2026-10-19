import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectCases, getProjectCase } from "@/shared/config/project-cases";
import { ProjectCasePage } from "@/widgets/project-case/ui/project-case-page";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export const generateStaticParams = () =>
  projectCases.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const project = getProjectCase((await params).slug);
  return {
    title: project ? `${project.title} — проекты Kuminovvv` : "Проект — Kuminovvv",
    description: project?.description,
  };
};

const ProjectPage = async ({ params }: PageProps) => {
  const project = getProjectCase((await params).slug);
  if (!project) notFound();
  return <ProjectCasePage project={project} />;
};

export default ProjectPage;
