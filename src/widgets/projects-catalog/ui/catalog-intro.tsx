import type { SiteContent } from "@/shared/lib/content/get-site-content";

type CatalogIntroProps = { content: SiteContent["catalog"]["intro"] };

export const CatalogIntro = (props: CatalogIntroProps) => {
  const {
    content,
  } = props;
  return (
  <div className="grid min-h-31 grid-cols-[minmax(0,1fr)_276px] items-center gap-13.5 max-[1180px]:grid-cols-[minmax(0,1fr)_240px] max-[1180px]:gap-6 max-[900px]:grid-cols-[minmax(0,1fr)_200px] max-[680px]:grid-cols-1 max-[680px]:gap-5">
    <div className="min-w-0">
      <span className="block text-[12px] leading-none font-semibold text-site-green-text dark:text-site-green">{content.eyebrow}</span>
      <h1 className="mt-3.25 font-heading text-[clamp(34px,3.05vw,55px)] leading-[1.08] font-black tracking-[-0.035em] whitespace-nowrap max-[1180px]:text-[clamp(31px,3.6vw,46px)] max-[1180px]:whitespace-normal max-[900px]:text-[clamp(28px,4vw,42px)] max-[680px]:text-[clamp(29px,8vw,42px)]">{content.title}</h1>
      <p className="mt-3.25 text-[16px] leading-[1.38] text-site-subtle max-[680px]:text-[15px]">{content.description}</p>
    </div>
    <div className="flex flex-col justify-center self-stretch gap-2.25 rounded-[26px] bg-site-surface px-5.75 py-4.5 max-[900px]:p-4.5 max-[680px]:min-h-25">
      <span className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{content.counterLabel}</span>
      <strong className="font-heading text-[26px] leading-[1.1] font-extrabold max-[900px]:text-[22px]">{content.counterValue}</strong>
      <p className="text-[14px] text-site-subtle">{content.counterNote}</p>
    </div>
  </div>
  );
};
