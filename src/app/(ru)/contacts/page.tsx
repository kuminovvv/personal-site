import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { ContactsPageContent } from "@/widgets/contacts-page";

export const metadata = getPageMetadata("contacts");

const ContactsPage = async () => {
  const content = await getSiteContent();

  return <ContactsPageContent channels={content.home.contacts.channels} />;
};

export default ContactsPage;
