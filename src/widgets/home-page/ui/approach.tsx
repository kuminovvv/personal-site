import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { Intro } from "./intro";
import { Banner } from "./banner";
import { ApproachItem } from "./approach-item";

export const Approach = (props: { content: SiteContent["home"]["approach"] }) => {
  const {
    content,
  } = props;

  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro
        section="about"
        title={content.title}
        description={content.description}
      />
      <div className="grid grid-cols-3 gap-7 max-[900px]:gap-4 max-[680px]:grid-cols-1 max-[680px]:gap-5">
        {content.items.map((item) => <ApproachItem key={item.title} {...item} />)}
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
