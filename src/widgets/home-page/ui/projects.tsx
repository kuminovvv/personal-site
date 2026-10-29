import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { Intro } from "./intro";
import { SectionAside } from "./section-aside";
import { Banner } from "./banner";
import { ProjectItem } from "./project-item";

export const Projects = (props: { content: SiteContent["home"]["projects"] }) => {
  const {
    content,
  } = props;

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
        {content.items.map((item) => <ProjectItem key={item.name} item={item} />)}
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
