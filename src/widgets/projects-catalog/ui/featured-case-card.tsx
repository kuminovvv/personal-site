import type {SiteContent} from "@/shared/lib/content/get-site-content";
import {CatalogPreview} from "./catalog-preview";
import { FeaturedCaseDetails } from "./featured-case-details";

type FeaturedCaseCardProps = { work: SiteContent["catalog"]["gazpromCase"] };

export const FeaturedCaseCard = (props: FeaturedCaseCardProps) => {
    const {
    work,
  } = props;
    return (
    <article className="flex min-h-80 min-w-0 items-stretch gap-3.5 rounded-site-32 bg-site-surface p-8 max-[1180px]:gap-3 max-[1180px]:p-6 max-[680px]:min-h-75 max-[450px]:flex-col">
        <FeaturedCaseDetails work={work}/>
        <CatalogPreview preview={work.preview} brand={work.brand}/>
    </article>
    );
};
