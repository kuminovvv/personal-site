import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { ProjectsCatalog } from "@/widgets/projects-catalog";

export const metadata = getPageMetadata("projects", "en");

const ProjectsPage = async () => {
  const content = await getSiteContent("en");
  return <ProjectsCatalog locale="en" content={content.catalog} />;
};

export default ProjectsPage;
