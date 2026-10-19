import Link from "next/link";
import { Intro } from "./intro";
import { TagList } from "@/shared/ui/tag-list";
import { SectionAside } from "./section-aside";
import { Banner } from "./banner";
import { SocialPreview } from "./social-preview";
import { RentPreview } from "./rent-preview";
import { CanvasPreview } from "./canvas-preview";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

export const Projects = ({ content }: { content: SiteContent["home"]["projects"] }) => {
  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro
        section="projects"
        title={content.title}
        description={content.description}
        aside={
          <SectionAside label={content.asideLabel}>{content.asideText}</SectionAside>
        }
      />
      <div className="grid grid-cols-3 gap-7 max-[900px]:gap-4 max-[680px]:grid-cols-1 max-[680px]:gap-5">
        {content.items.map(({ number, name, slug, copy, role, tags, preview }) => {
          const Preview = preview === "social" ? SocialPreview : preview === "rent" ? RentPreview : CanvasPreview;
          return (
          <article className="min-w-0 rounded-[28px] bg-site-surface p-8 max-[1180px]:p-6 max-[900px]:p-5 max-[680px]:p-7 [&_h3]:mt-4 [&_h3]:text-[25px] max-[900px]:[&_h3]:text-[19px] [&>p]:mt-3 [&>p]:text-[15px] [&>p]:leading-[1.6] [&>div:last-child]:mt-5" key={name}>
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
        })}
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
