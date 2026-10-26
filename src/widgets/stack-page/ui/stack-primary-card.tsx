import { StackTechnologyTag } from "./stack-technology-tag";
import { cn } from "@/shared/lib/utils";
import type { stackContent } from "../model/stack-content";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getStackUiCopy } from "../model/ui-copy";

type Props = {
  item: (typeof stackContent.primary)[number];
  locale?: Locale;
};

export const StackPrimaryCard = ({ item, locale = "ru" }: Props) => {
  const backend = item.kind === "backend";
  const copy = getStackUiCopy(locale);

  return (
    <article className={cn(
      "flex min-h-97.5 min-w-0 flex-col rounded-[19px] bg-site-surface p-6.25 max-[680px]:min-h-0 max-[680px]:p-5",
      backend && "bg-[#22272b] text-white",
    )}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold">
        <span className={backend ? "text-[#35d775]" : "text-site-green-text dark:text-site-green"}>{item.eyebrow}</span>
        <span className={backend ? "text-[#b5bbb7]" : "text-site-subtle"}>{item.category}</span>
      </div>
      <h2 className="mt-4 font-heading text-[25px] leading-[1.15] font-bold tracking-[-0.035em] max-[680px]:text-[22px]">{item.title}</h2>
      <p className={cn("mt-3 text-[15px] leading-[1.45]", backend ? "text-[#b5bbb7]" : "text-site-subtle")}>{item.description}</p>

      {backend ? (
        <div className="mt-3 flex h-31.5 items-center gap-3.5 rounded-[12px] bg-[#f2f2f2] p-3.75 max-[400px]:gap-2 max-[400px]:p-2.5" aria-label={copy.architecture}>
          {[
            ["UI", copy.client],
            ["API", "Go"],
            ["DB", "Postgres"],
          ].map(([label, description]) => (
            <div className="flex h-22.25 min-w-0 flex-1 flex-col gap-2.5 rounded-[9px] bg-white px-3.25 py-3.5 max-[400px]:px-2" key={label}>
              <strong className="text-[17px] leading-none font-semibold text-[#333]">{label}</strong>
              <span className="text-[12px] text-[#777]">{description}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex h-31.5 gap-3.5 rounded-[12px] bg-site-soft p-3.75 max-[400px]:gap-2 max-[400px]:p-2.5" aria-label={copy.diagram}>
          <div className="flex w-[23%] shrink-0 flex-col gap-3 rounded-[9px] bg-white px-3 py-3 max-[400px]:px-2" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span className={cn("h-1.5 rounded-full bg-[#dce5df]", i === 1 && "bg-[#18c14f]", i % 2 === 0 ? "w-3/4" : "w-full")} key={i} />
            ))}
          </div>
          <div className="min-w-0 flex-1 rounded-[9px] bg-white p-3 max-[400px]:p-2">
            <div className="flex items-center gap-2 text-[12px] font-semibold text-[#333]">
              <span className="size-2.25 shrink-0 rounded-full bg-[#18c14f]" aria-hidden="true" />
              <span>{copy.components}</span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div className="h-10 rounded-[6px] bg-[#f2f2f2] p-2" key={i}>
                  <span className={cn("block h-1.5 rounded-full bg-[#dce5df]", i === 1 ? "w-4/5 bg-[#18c14f]" : "w-3/4")} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={cn("mt-3.75 flex flex-wrap content-start gap-2.5", backend && "[&>span]:bg-[#f2f2f2] [&>span]:text-[#777]")}>
        {item.technologies.map((technology) => (
          <StackTechnologyTag label={technology} key={technology} />
        ))}
      </div>
    </article>
  );
};
