import { TagList } from "@/shared/ui/tag-list";
import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { CodeWindow } from "./code-window";

export const StackPrimary = (props: { content: SiteContent["home"]["stack"]["primary"] }) => {
  const {
    content,
  } = props;
  return <article className="min-w-0 rounded-[30px] bg-site-surface p-10 text-site-text max-[1180px]:p-8 max-[900px]:grid max-[680px]:p-7 [&_h3]:mt-10 [&_h3]:text-[26px] [&>p]:mt-5 [&>p]:text-[15px] [&>p]:leading-[1.6] [&>p]:text-site-subtle [&>div]:mt-9"><span className="flex items-center gap-1.75 text-[11px] text-site-subtle [&_i]:size-1.75 [&_i]:rounded-full [&_i]:bg-site-green"><span aria-hidden="true" className="size-2.25 shrink-0 rounded-full bg-site-green" />{content.eyebrow}</span><h3>{content.title}</h3><p>{content.description}</p><TagList className="min-w-0" variant="tagStrong" tags={content.tags} /><CodeWindow /><div className="mt-10 flex flex-wrap items-center gap-3 text-[13px] leading-[1.5] text-site-subtle [&_b]:rounded-full [&_b]:bg-site-surface-raised [&_b]:px-4 [&_b]:py-2.25 [&_b]:text-[10px] [&_b]:text-site-text"><b>{content.status}</b>{content.caption}</div></article>;
};
