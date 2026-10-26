import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { ResumePage as ResumePageContent } from "@/widgets/resume-page/ui/resume-page";

export const metadata = getPageMetadata("resume", "en");

const ResumePage = async () => {
  const content = await getSiteContent("en");
  return <ResumePageContent locale="en" experience={content.home.experience} channels={content.home.contacts.channels} />;
};

export default ResumePage;
