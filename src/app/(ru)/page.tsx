import { HomePage } from "@/widgets/visual-portfolio";
import { getPageMetadata } from "@/shared/lib/i18n/metadata";

export const metadata = getPageMetadata("home");

const Page = () => <HomePage />;

export default Page;
