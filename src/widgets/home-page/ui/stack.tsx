import Image from "next/image";
import { Intro } from "./intro";
import { TagList } from "@/shared/ui/tag-list";
import { SectionAside } from "./section-aside";
import { Banner } from "./banner";
import { CodeWindow } from "./code-window";
import { StackCard } from "./stack-card";
import { Tick01StrokeRoundedIcon } from "@/shared/lib/icons";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

const asset = "/design/home/";

export const Stack = ({ content }: { content: SiteContent["home"]["stack"] }) => {
  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro
        section="stack"
        title={content.title}
        description={content.description}
        aside={
          <SectionAside label={content.asideLabel}>{content.asideText}</SectionAside>
        }
      />
      <div className="grid grid-cols-[520px_minmax(0,1fr)] gap-7 max-[1180px]:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] max-[900px]:grid-cols-1 max-[900px]:gap-5">
        <article className="min-w-0 rounded-[30px] bg-site-surface p-10 text-site-text max-[1180px]:p-8 max-[900px]:grid max-[680px]:p-7 [&_h3]:mt-10 [&_h3]:text-[26px] [&>p]:mt-5 [&>p]:text-[15px] [&>p]:leading-[1.6] [&>p]:text-site-subtle [&>div]:mt-9">
          <span className="flex items-center gap-1.75 text-[11px] text-site-subtle [&_i]:size-1.75 [&_i]:rounded-full [&_i]:bg-site-green">
            <span aria-hidden="true" className="size-2.25 shrink-0 rounded-full bg-site-green" />
            {content.primary.eyebrow}
          </span>
          <h3>{content.primary.title}</h3>
          <p>{content.primary.description}</p>
          <TagList className="min-w-0" variant="tagStrong" tags={content.primary.tags} />
          <CodeWindow />
          <div className="mt-10 flex flex-wrap items-center gap-3 text-[13px] leading-[1.5] text-site-subtle [&_b]:rounded-full [&_b]:bg-site-surface-raised [&_b]:px-4 [&_b]:py-2.25 [&_b]:text-[10px] [&_b]:text-site-text">
            <b>{content.primary.status}</b>{content.primary.caption}
          </div>
        </article>
        <div className="grid grid-cols-2 gap-7 max-[1180px]:gap-5 max-[680px]:grid-cols-1">
          {content.cards.map((card) => (
          <StackCard
            key={card.id}
            label={card.label}
            title={card.title}
            tags={card.tags}
            indicator={card.id === "interfaces" ? <span aria-hidden="true" className="size-1.75 shrink-0 rounded-full bg-site-green" /> : undefined}
          >
            {card.id === "interfaces" ? (
            <div className="grid h-26.25 content-center gap-1.5 overflow-hidden rounded-xl bg-site-soft p-3 [&>div]:flex [&>div]:gap-2 [&_i]:h-1.5 [&_i]:w-1/4 [&_i]:rounded [&_i]:bg-[#e4e4e4] [&_img]:h-auto [&_img]:max-h-5.25 [&_img]:w-full">
              <div>
                <i />
                <i />
                <i />
              </div>
              <Image
                src={asset + "stack-architecture-0.svg"}
                alt=""
                width={329}
                height={21}
              />
              <Image
                src={asset + "stack-architecture-1.svg"}
                alt=""
                width={329}
                height={21}
              />
            </div>
            ) : card.id === "architecture" ? (
            <div className="flex h-26.25 items-center justify-between gap-2 overflow-hidden rounded-xl bg-site-soft p-3 [&>span]:flex [&>span]:h-16.5 [&>span]:w-[32%] [&>span]:flex-col [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:rounded-[9px] [&>span]:bg-site-surface [&>span]:text-[11px] [&>span]:font-semibold [&>span:nth-child(2)]:bg-site-sage">
              <span>UI</span>
              <span>FEATURE</span>
              <span>API</span>
            </div>
            ) : card.id === "quality" ? (
            <div className="grid h-26.25 content-center gap-1.5 overflow-hidden rounded-xl bg-site-soft p-3 [&_span]:flex [&_span]:rounded-[5px] [&_span]:bg-site-surface [&_span]:px-2 [&_span]:py-1 [&_span]:text-[11px] [&_span]:text-site-green-text dark:text-site-green">
              {["━━━━━━━━━━", "━━━━━━━━", "━━━━━━━━━"].map((line) => (
                <span key={line} className="flex items-center gap-2">
                  <Tick01StrokeRoundedIcon aria-hidden="true" size={14} />
                  {line}
                </span>
              ))}
            </div>
            ) : (
            <div className="flex h-26.25 items-center justify-between gap-2 overflow-hidden rounded-xl bg-site-soft p-3 [&>span]:flex [&>span]:h-16.5 [&>span]:w-[32%] [&>span]:flex-col [&>span]:items-center [&>span]:justify-center [&>span]:gap-2 [&>span]:rounded-[9px] [&>span]:bg-site-surface [&>span]:text-[11px] [&>span]:font-semibold [&>span:nth-child(2)]:bg-site-sage">
              <span>
                <span aria-hidden="true" className="size-3.75 shrink-0 rounded-full bg-[#e6e6e6]" />
                UI
              </span>
              <span>
                <span aria-hidden="true" className="size-3.75 shrink-0 rounded-full bg-site-green" />
                API
              </span>
              <span>DB</span>
            </div>
            )}
          </StackCard>
          ))}
        </div>
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
