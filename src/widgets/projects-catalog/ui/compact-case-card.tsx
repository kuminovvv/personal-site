import Link from "next/link";
import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

type CompactCaseCardProps = {
  work: Pick<
    SiteContent["catalog"]["gazpromCase"],
    "slug" | "number" | "title" | "description" | "stack" | "href"
  > &
    Partial<Pick<SiteContent["catalog"]["omsuCases"][number], "label" | "mark">>;
};

export const CompactCaseCard = ({ work }: CompactCaseCardProps) => (
  <article className="relative flex min-h-64.5 min-w-0 flex-col justify-between gap-5 rounded-site-32 bg-site-surface px-5.5 pt-5.5 pb-5 max-[680px]:min-h-62.5">
    <div className="flex items-start justify-between gap-3">
      <span className="text-[11px] leading-tight font-semibold text-site-green-text dark:text-site-green">
        {work.number}{work.label ? ` / ${work.label}` : ""}
      </span>
      <span className="grid size-8.25 shrink-0 place-items-center rounded-[9px] bg-site-sage text-[13px] font-semibold">
        {work.mark ?? work.number.slice(0, 2)}
      </span>
    </div>
    <div className="grid gap-3.25">
      <h4 className="font-heading text-[19px] leading-tight font-bold">{work.title}</h4>
      <p className="text-[14px] leading-tight text-site-subtle">{work.description}</p>
    </div>
    <div className="flex items-center justify-between gap-3 max-[450px]:flex-wrap">
      <span className="min-w-0 flex-1 text-[12px] leading-[1.3] text-site-subtle max-[450px]:basis-full">{work.stack}</span>
        <Link
          className="inline-flex min-h-12.25 shrink-0 items-center justify-center gap-2 rounded-full bg-site-green px-7 text-[14px] text-site-on-green whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-site-text max-[1180px]:px-5"
          href={`/projects/${work.slug}`}
        >
          Подробнее <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={24} />
        </Link>
    </div>
  </article>
);
