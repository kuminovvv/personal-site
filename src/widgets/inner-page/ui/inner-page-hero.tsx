import { LinkButton } from "@/shared/ui/link-button";
import { InnerPageBreadcrumb } from "./inner-page-breadcrumb";

type InnerPageHeroProps = {
  section: string;
  title: string;
  description: string;
  detail: string;
  number: string;
  numberLabel: string;
  nextHref: string;
  nextLabel: string;
};

export const InnerPageHero = (props: InnerPageHeroProps) => {
  const {
    section,
    title,
    description,
    detail,
    number,
    numberLabel,
    nextHref,
    nextLabel,
  } = props;
  return (
    <section className="mt-15 grid grid-cols-[minmax(0,1.65fr)_minmax(280px,.85fr)] gap-5 max-[900px]:mt-10 max-[900px]:grid-cols-[1fr_.75fr] max-[680px]:mt-8 max-[680px]:grid-cols-1 max-[680px]:gap-3" aria-labelledby="page-title">
      <div className="flex min-h-98.75 min-w-0 flex-col justify-between rounded-[30px] bg-site-surface p-10.5 max-[900px]:min-h-85 max-[900px]:p-7">
        <InnerPageBreadcrumb section={section} />
        <div>
          <h1 className="max-w-200 text-[clamp(36px,4.5vw,64px)] leading-[1.12] max-[680px]:text-[clamp(33px,8vw,48px)]" id="page-title">{title}</h1>
          <p className="mt-5 max-w-157.5 text-[19px] leading-[1.45] text-site-muted max-[900px]:text-[16px]">{description}</p>
        </div>
        <span className="text-[12px] font-semibold tracking-[.04em] text-site-subtle">{detail}</span>
      </div>
      <div className="flex min-h-98.75 min-w-0 flex-col justify-between rounded-[30px] bg-site-surface p-10.5 max-[900px]:min-h-85 max-[900px]:p-7 max-[680px]:min-h-51.25">
        <span className="text-[12px] font-semibold tracking-[.04em] text-site-muted">KUMINOVVV / ЛИЧНЫЙ САЙТ</span>
        <div className="flex flex-wrap items-baseline gap-x-4.5 gap-y-3">
          <strong className="font-heading text-[clamp(58px,6vw,94px)] leading-none font-extrabold tracking-[-.08em] text-site-green-text dark:text-site-green max-[680px]:text-[52px]">{number}</strong>
          <span className="text-[15px] text-site-muted max-[680px]:text-[13px]">{numberLabel}</span>
        </div>
        <LinkButton href={nextHref} tone="surface" size="next" arrow="right">
          {nextLabel}
        </LinkButton>
      </div>
    </section>
  );
};
