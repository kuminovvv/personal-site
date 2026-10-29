import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { Intro } from "./intro";
import { SectionAside } from "./section-aside";
import { Banner } from "./banner";
import { ExperienceJob } from "./experience-job";

export const Experience = (props: { content: SiteContent["home"]["experience"] }) => {
  const {
    content,
  } = props;

  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro
        section="experience"
        title={content.title}
        description={content.description}
        aside={
          <SectionAside label={content.asideLabel}>
            {content.asideStart} <i /> <small>{content.asideEnd}</small>
          </SectionAside>
        }
      />
      <div className="grid grid-cols-2 gap-7 max-[900px]:gap-5 max-[680px]:grid-cols-1">
        {content.jobs.map((job) => <ExperienceJob key={job.name} job={job} />)}
      </div>
      <Banner {...content.banner} />
    </section>
  );
};
