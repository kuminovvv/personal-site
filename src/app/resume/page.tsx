import type { Metadata } from "next";
import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { ResumePage as ResumePageContent } from "@/widgets/resume-page/ui/resume-page";

export const metadata: Metadata = {
  title: "Резюме — Kuminovvv",
  description: "Опыт frontend-разработки Ильи Куминова: React, TypeScript, корпоративные SPA и собственные продукты.",
};

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
