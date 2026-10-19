import type { Metadata } from "next";
import { ProjectsCatalog } from "@/widgets/projects-catalog/ui/projects-catalog";
import { getSiteContent } from "@/shared/lib/content/get-site-content";

export const metadata: Metadata = {
  title: "Проекты — Kuminovvv",
  description: "Коммерческие кейсы ОмГУ и Газпром ВНИИГАЗ, Soobota, SPB Rent и технический кейс с Canvas API.",
};

const ProjectsPage = async () => {
  const content = await getSiteContent();
  return <ProjectsCatalog content={content.catalog} />;
};

export default ProjectsPage;
