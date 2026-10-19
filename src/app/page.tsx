import { HomePage } from "@/widgets/home-page/ui/home-page";
import { getSiteContent } from "@/shared/lib/content/get-site-content";

const Page = async () => {
  const content = await getSiteContent();
  return <HomePage content={content.home} />;
};

export default Page;
