import { HomePage } from "@/widgets/visual-portfolio";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";

export const metadata = getPageMetadata("home", "en");

const Page = () => <HomePage locale="en" />;

export default Page;
