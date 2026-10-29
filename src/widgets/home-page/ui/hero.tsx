import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { HeroVisualCard } from "./hero-visual-card";
import { HeroContent } from "./hero-content";

export const Hero = (props: { content: SiteContent["home"]["hero"] }) => {
  const {
    content,
  } = props;

  return (
    <>
      <section className="mt-20 grid min-h-172.5 grid-cols-[minmax(0,711px)_minmax(0,649px)] max-[1180px]:min-h-0 max-[1180px]:grid-cols-2 max-[1180px]:gap-7 max-[900px]:mt-12 max-[680px]:mt-9 max-[680px]:grid-cols-1 max-[680px]:gap-7 [&_h1]:text-[clamp(37px,3.9vw,53px)] [&_h1]:leading-[1.18] [&_h1]:whitespace-nowrap max-[1180px]:[&_h1]:whitespace-normal max-[680px]:[&_h1]:text-[clamp(32px,8vw,50px)] [&_h1_em]:not-italic [&_h1_em]:text-site-green-text dark:text-site-green">
        <HeroContent {...content} />
        <HeroVisualCard {...content} />
      </section>
      <div className="my-18 flex h-18.75 items-center gap-6 text-[15px] leading-[1.6] text-site-subtle max-[680px]:my-10 max-[680px]:h-auto [&_i]:h-0.75 [&_i]:w-13.5 [&_i]:shrink-0 [&_i]:rounded-xs [&_i]:bg-site-green">
        <i />
        {content.separatorText}
      </div>
    </>
  );
};
