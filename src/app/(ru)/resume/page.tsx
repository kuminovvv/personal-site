import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { ResumePage as ResumePageContent } from "@/widgets/resume-page/ui/resume-page";

export const metadata = getPageMetadata("resume");

const ResumePage = async () => {
  const content = await getSiteContent();

  return (
    <ResumePageContent
      experience={content.home.experience}
      channels={content.home.contacts.channels}
    />
  );
};

export default ResumePage;
