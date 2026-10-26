import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { StackPage as StackPageContent } from "@/widgets/stack-page/ui/stack-page";

export const metadata = getPageMetadata("stack", "en");

const StackPage = () => <StackPageContent locale="en" />;

export default StackPage;
