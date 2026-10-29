import { cn } from "@/shared/lib/utils";
import type { Locale } from "@/shared/lib/i18n/locale";
import { StackComponentDiagram } from "./stack-component-diagram";
import { StackTechnologyTag } from "./stack-technology-tag";
import type { stackContent } from "../model/stack-content";
import { getStackUiCopy } from "../model/ui-copy";

type Props = {
  item: (typeof stackContent.primary)[number];
  locale?: Locale;
};

export const StackPrimaryCard = (props: Props) => {
  const {
    item,
    locale = "ru",
  } = props;
  const isBackend = item.kind === "backend";
  const copy = getStackUiCopy(locale);

  return (
    <article className={cn(
      "flex min-h-97.5 min-w-0 flex-col rounded-[19px] bg-site-surface p-6.25 max-[680px]:min-h-0 max-[680px]:p-5",
      isBackend && "bg-site-contact-surface text-white",
    )}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold">
        <span className={isBackend ? "text-site-contact-surface-c" : "text-site-green-text dark:text-site-green"}>{item.eyebrow}</span>
        <span className={isBackend ? "text-site-contact-text" : "text-site-subtle"}>{item.category}</span>
      </div>
      <h2 className="mt-4 font-heading text-[25px] leading-[1.15] font-bold tracking-[-0.035em] max-[680px]:text-[22px]">{item.title}</h2>
      <p className={cn("mt-3 text-[15px] leading-[1.45]", isBackend ? "text-site-contact-text" : "text-site-subtle")}>{item.description}</p>

      {isBackend ? (
        <div className="mt-3 flex h-31.5 items-center gap-3.5 rounded-[12px] bg-site-stack-surface-b p-3.75 max-[400px]:gap-2 max-[400px]:p-2.5" aria-label={copy.architecture}>
          {[
            ["UI", copy.client],
            ["API", "Go"],
            ["DB", "Postgres"],
          ].map(([label, description]) => (
            <div className="flex h-22.25 min-w-0 flex-1 flex-col gap-2.5 rounded-[9px] bg-white px-3.25 py-3.5 max-[400px]:px-2" key={label}>
              <strong className="text-[17px] leading-none font-semibold text-site-mini-window-surface-b">{label}</strong>
              <span className="text-[12px] text-site-mini-window-surface-e">{description}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3 flex h-31.5 gap-3.5 rounded-[12px] bg-site-soft p-3.75 max-[400px]:gap-2 max-[400px]:p-2.5" aria-label={copy.diagram}>
          <div className="flex w-[23%] shrink-0 flex-col gap-3 rounded-[9px] bg-white px-3 py-3 max-[400px]:px-2" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span className={cn("h-1.5 rounded-full bg-site-stack-surface-c", i === 1 && "bg-site-stack-surface-d", i % 2 === 0 ? "w-3/4" : "w-full")} key={i} />
            ))}
          </div>
          <StackComponentDiagram copy={copy} />
        </div>
      )}
      <div className={cn("mt-3.75 flex flex-wrap content-start gap-2.5", isBackend && "[&>span]:bg-site-stack-surface-b [&>span]:text-site-mini-window-surface-e")}>
        {item.technologies.map((technology) => (
          <StackTechnologyTag label={technology} key={technology} />
        ))}
      </div>
    </article>
  );
};
