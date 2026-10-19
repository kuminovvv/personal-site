import Image from "next/image";
import { LinkButton } from "@/shared/ui/link-button";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

export const Hero = ({ content }: { content: SiteContent["home"]["hero"] }) => {
  return (
    <>
      <section className="mt-20 grid min-h-172.5 grid-cols-[minmax(0,711px)_minmax(0,649px)] max-[1180px]:min-h-0 max-[1180px]:grid-cols-2 max-[1180px]:gap-7 max-[900px]:mt-12 max-[680px]:mt-9 max-[680px]:grid-cols-1 max-[680px]:gap-7 [&_h1]:text-[clamp(37px,3.9vw,53px)] [&_h1]:leading-[1.18] [&_h1]:whitespace-nowrap max-[1180px]:[&_h1]:whitespace-normal max-[680px]:[&_h1]:text-[clamp(32px,8vw,50px)] [&_h1_em]:not-italic [&_h1_em]:text-site-green-text dark:text-site-green">
        <div className="flex min-w-0 flex-col items-start justify-between gap-7 pr-8.75 py-3 max-[1180px]:gap-9 max-[1180px]:pr-0 max-[1180px]:py-0 max-[680px]:gap-7">
          <div className="flex items-center gap-3 whitespace-nowrap text-[13px] font-semibold [&_span]:grid [&_span]:size-8.75 [&_span]:place-items-center [&_span]:rounded-full [&_span]:bg-site-green [&_span]:text-[15px] [&_span]:text-site-on-green">
            <span>K</span>{content.identity}
          </div>
          <h1 id="hero-title">
            {content.greeting}
            <br />
            {content.titleLine}
            <br />
            <em>{content.titleAccent}</em>
          </h1>
          <p className="max-w-164.5 text-[21px] leading-[1.6] text-site-muted max-[900px]:text-[17px]">
            {content.description}
          </p>
          <div className="flex items-center gap-3 max-[400px]:flex-wrap">
            <LinkButton href={content.primaryAction.href} size="hero">{content.primaryAction.label}</LinkButton>
            <LinkButton href={content.secondaryAction.href} size="hero" tone="surface" arrow="right">
              {content.secondaryAction.label}
            </LinkButton>
          </div>
          <div className="flex flex-wrap gap-8 max-[1180px]:gap-2 max-[680px]:justify-between max-[400px]:gap-3 [&_div]:grid [&_div]:gap-2 [&_div]:p-4 max-[900px]:[&_div]:p-2 max-[680px]:[&_div]:px-0 max-[680px]:[&_div]:py-1.25 [&_b]:text-[16px] [&_span]:text-[14px] [&_span]:text-site-subtle max-[900px]:[&_span]:text-[12px]">
            {content.stats.map((stat, index) => (
              <div key={index}>
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="min-w-0 overflow-hidden rounded-[30px] bg-site-surface max-[680px]:max-w-125">
          <Image
            className="block aspect-1448/1086 h-auto w-full rounded-[30px] object-cover"
            src={content.portraitSrc}
            alt={content.portraitAlt}
            width={1448}
            height={1086}
            priority
          />
          <div className="flex min-h-50.75 flex-col justify-between p-10 max-[1180px]:min-h-45 max-[1180px]:p-7 max-[900px]:min-h-37.5 max-[900px]:p-5 [&_strong]:font-heading [&_strong]:text-[clamp(27px,2.5vw,39px)] [&_strong]:font-black [&_strong]:tracking-tighter [&_p]:mt-3 [&_p]:text-[18px] [&_p]:text-site-subtle">
            <div>
              <strong>{content.brand}</strong>
              <p>{content.brandDescription}</p>
            </div>
            <div className="flex items-center justify-between gap-2.5 max-[400px]:flex-wrap [&_span]:whitespace-nowrap [&_span]:rounded-full [&_span]:bg-site-soft [&_span]:px-5.5 [&_span]:py-3 [&_span]:text-[13px] [&_span]:font-semibold max-[900px]:[&_span]:min-w-0 max-[900px]:[&_span]:px-3 max-[900px]:[&_span]:py-2.25 max-[900px]:[&_span]:text-[10px] [&_span:first-child]:min-w-58 [&_span:first-child]:text-center max-[900px]:[&_span:first-child]:min-w-0">
              <span>{content.brandCategory}</span>
              <span>{content.brandSince}</span>
            </div>
          </div>
        </div>
      </section>
      <div className="my-18 flex h-18.75 items-center gap-6 text-[15px] leading-[1.6] text-site-subtle max-[680px]:my-10 max-[680px]:h-auto [&_i]:h-0.75 [&_i]:w-13.5 [&_i]:shrink-0 [&_i]:rounded-xs [&_i]:bg-site-green">
        <i />
        {content.separatorText}
      </div>
    </>
  );
};
