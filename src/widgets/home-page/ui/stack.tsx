import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { Intro } from "./intro";
import { SectionAside } from "./section-aside";
import { Banner } from "./banner";
import { StackPrimary } from "./stack-primary";
import { StackCardItem } from "./stack-card-item";

export const Stack = (props: { content: SiteContent["home"]["stack"] }) => {
  const {
    content,
  } = props;
  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro section="stack" title={content.title} description={content.description} aside={<SectionAside label={content.asideLabel}>{content.asideText}</SectionAside>} />
      <div className="grid grid-cols-[520px_minmax(0,1fr)] gap-7 max-[1180px]:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] max-[900px]:grid-cols-1 max-[900px]:gap-5">
        <StackPrimary content={content.primary} />
        <div className="grid grid-cols-2 gap-7 max-[1180px]:gap-5 max-[680px]:grid-cols-1">
          {content.cards.map((card) => <StackCardItem key={card.id} card={card} />)}
        </div>
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
