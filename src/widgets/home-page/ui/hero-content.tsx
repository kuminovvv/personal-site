import { LinkButton } from "@/shared/ui/link-button";
import { HeroStats } from "./hero-stats";

type HeroContentProps = {
  identity: string;
  greeting: string;
  titleLine: string;
  titleAccent: string;
  description: string;
  primaryAction: { href: string; label: string };
  secondaryAction: { href: string; label: string };
  stats: readonly { value: string; label: string }[];
};

export const HeroContent = (props: HeroContentProps) => {
  const {
    identity,
    greeting,
    titleLine,
    titleAccent,
    description,
    primaryAction,
    secondaryAction,
    stats,
  } = props;
  return (
    <div className="flex min-w-0 flex-col items-start justify-between gap-7 pr-8.75 py-3 max-[1180px]:gap-9 max-[1180px]:pr-0 max-[1180px]:py-0 max-[680px]:gap-7">
      <div className="flex items-center gap-3 whitespace-nowrap text-[13px] font-semibold [&_span]:grid [&_span]:size-8.75 [&_span]:place-items-center [&_span]:rounded-full [&_span]:bg-site-green [&_span]:text-[15px] [&_span]:text-site-on-green"><span>K</span>{identity}</div>
      <h1 id="hero-title">{greeting}<br />{titleLine}<br /><em>{titleAccent}</em></h1>
      <p className="max-w-164.5 text-[21px] leading-[1.6] text-site-muted max-[900px]:text-[17px]">{description}</p>
      <div className="flex items-center gap-3 max-[400px]:flex-wrap">
        <LinkButton href={primaryAction.href} size="hero">{primaryAction.label}</LinkButton>
        <LinkButton href={secondaryAction.href} size="hero" tone="surface" arrow="right">{secondaryAction.label}</LinkButton>
      </div>
      <HeroStats stats={stats} />
    </div>
  );
};
