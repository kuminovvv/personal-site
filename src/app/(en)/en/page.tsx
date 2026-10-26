import { HomePage } from "@/widgets/home-page/ui/home-page";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";

export const metadata = getPageMetadata("home", "en");

const Page = () => <HomePage locale="en" />;

export default Page;
