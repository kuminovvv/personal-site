import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectCases, getProjectCase } from "@/shared/config/project-cases";
import { createPageMetadata, getMetadataCopy } from "@/shared/lib/i18n/metadata";
import { ProjectCasePage } from "@/widgets/project-case";

type PageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => projectCases.map(({ slug }) => ({ slug }));

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const project = getProjectCase((await params).slug, "en");
  if (!project) return {};
  return createPageMetadata("en", `/projects/${project.slug}`, `${project.title} — ${getMetadataCopy("en").caseTitle}`, project.description);
};

const ProjectPage = async (props: PageProps) => {
  const {
    params,
  } = props;

  const project = getProjectCase((await params).slug, "en");
  if (!project) notFound();
  return <ProjectCasePage locale="en" project={project} />;
};

export default ProjectPage;
