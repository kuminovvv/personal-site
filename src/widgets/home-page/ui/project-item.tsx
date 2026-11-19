import Link from "next/link";
import { TagList } from "@/shared/ui/tag-list";
import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { CanvasPreview } from "./canvas-preview";
import { RentPreview } from "./rent-preview";
import { SocialPreview } from "./social-preview";

type ProjectItemProps = {
  item: SiteContent["home"]["projects"]["items"][number];
};

export const ProjectItem = (props: ProjectItemProps) => {
  const {
    item,
  } = props;
  const { number, name, slug, copy, role, tags, preview } = item;
  const Preview = preview === "social" ? SocialPreview : preview === "rent" ? RentPreview : CanvasPreview;

  return (
    <article className="min-w-0 rounded-[28px] bg-site-surface p-8 max-[1180px]:p-6 max-[900px]:p-5 max-[680px]:p-7 [&_h3]:mt-4 [&_h3]:text-[25px] max-[900px]:[&_h3]:text-[19px] [&>p]:mt-3 [&>p]:text-[15px] [&>p]:leading-[1.6] [&>div:last-child]:mt-5">
      <span className="flex min-h-5.75 items-center gap-2 text-[11px] text-site-subtle">
        <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-site-green" />
        {number}
      </span>
      <Preview />
      <h3>{name}</h3>
      <p>{copy}</p>
      <p className="mt-4! text-[13px]! !text-site-subtle">{role}</p>
      <TagList className="min-w-0 gap-2" tags={tags} />
      <Link href={`/projects/${slug}`} className="mt-4 inline-flex text-[14px] font-semibold text-site-green-text dark:text-site-green">Подробнее о проекте →</Link>
    </article>
  );
};
