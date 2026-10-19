import type { Metadata } from "next";
import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { ContactsPageContent } from "@/widgets/contacts-page/ui/contacts-page-content";

export const metadata: Metadata = {
  title: "Контакты — Kuminovvv",
  description: "Связаться с Ильёй Куминовым: Telegram и Email для обсуждения разработки, проектов и сотрудничества.",
};

const ContactsPage = async () => {
  const content = await getSiteContent();

  return <ContactsPageContent channels={content.home.contacts.channels} />;
};

export default ContactsPage;
