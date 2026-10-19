import {ArrowRight02StrokeRoundedIcon} from "@/shared/lib/icons";
import type {SiteContent} from "@/shared/lib/content/get-site-content";
import {CatalogPreview} from "./catalog-preview";

type FeaturedCaseCardProps = { work: SiteContent["catalog"]["gazpromCase"] };

export const FeaturedCaseCard = ({work}: FeaturedCaseCardProps) => (
    <article className="flex min-h-80 min-w-0 items-stretch gap-3.5 rounded-site-32 bg-site-surface p-8 max-[1180px]:gap-3 max-[1180px]:p-6 max-[680px]:min-h-75 max-[450px]:flex-col">
        <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-3 max-[450px]:min-h-55">
            <span className="text-[11px] leading-tight font-semibold text-site-green-text dark:text-site-green">{work.number}</span>
            <h4 className="max-w-98.75 font-heading text-[25px] leading-tight font-bold max-[1180px]:text-[22px] max-[680px]:text-[clamp(19px,5vw,25px)]">{work.title}</h4>
            <p className="max-w-98.75 text-[15px] leading-[1.38]">{work.description}</p>
            <span className="text-[12px] leading-[1.3] font-medium text-site-subtle">{work.stack}</span>
            {work.action && (
                <details className="relative shrink-0">
                    <summary className="inline-flex min-h-12.25 cursor-pointer list-none items-center justify-center gap-2 rounded-full bg-site-green px-7 text-[14px] font-semibold text-site-on-green whitespace-nowrap select-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-site-text [&::-webkit-details-marker]:hidden max-[1180px]:px-5">
                        {work.action} <ArrowRight02StrokeRoundedIcon aria-hidden="true" size={24}/>
                    </summary>
                    <div className="absolute top-[calc(100%+8px)] right-0 z-10 w-[min(370px,80vw)] rounded-2xl border border-site-surface bg-site-soft p-5 shadow-[0_10px_36px_#0002] whitespace-normal">
                        <strong className="text-[15px]">{work.title}</strong>
                        <p className="my-2 text-[14px] leading-[1.4] text-site-muted">{work.description}</p>
                        <span className="text-[12px] text-site-subtle">{work.stack}</span>
                    </div>
                </details>
            )}
        </div>
        <CatalogPreview preview={work.preview} brand={work.brand}/>
    </article>
);
