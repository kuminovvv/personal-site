import { getPageMetadata } from "@/shared/lib/i18n/metadata";
import { StackPage as StackPageContent } from "@/widgets/stack-page";

export const metadata = getPageMetadata("stack");

const StackPage = () => <StackPageContent />;

export default StackPage;
