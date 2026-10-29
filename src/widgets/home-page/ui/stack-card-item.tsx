import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { StackCard } from "./stack-card";
import { StackCardVisual } from "./stack-card-visual";

export const StackCardItem = (props: { card: SiteContent["home"]["stack"]["cards"][number] }) => {
  const {
    card,
  } = props;
  return <StackCard key={card.id} label={card.label} title={card.title} tags={card.tags} indicator={card.id === "interfaces" ? <span aria-hidden="true" className="size-1.75 shrink-0 rounded-full bg-site-green" /> : undefined}><StackCardVisual id={card.id} /></StackCard>;
};
