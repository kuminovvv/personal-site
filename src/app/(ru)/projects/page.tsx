import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { ProjectsCatalog } from "@/widgets/projects-catalog/ui/projects-catalog";
import { getSiteContent } from "@/shared/lib/content/get-site-content";

export const metadata = getPageMetadata("projects");

const ProjectsPage = async () => {
  const content = await getSiteContent();
  return <ProjectsCatalog content={content.catalog} />;
};

export default ProjectsPage;
