import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { ContactsPageContent } from "@/widgets/contacts-page";

export const metadata = getPageMetadata("contacts", "en");

const ContactsPage = async () => {
  const content = await getSiteContent("en");
  return <ContactsPageContent locale="en" channels={content.home.contacts.channels} />;
};

export default ContactsPage;
