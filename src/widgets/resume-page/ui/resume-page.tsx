import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { ResumeHero } from "./resume-hero";
import { ResumeHighlights } from "./resume-highlights";
import { ResumeCareer } from "./resume-career";
import { ResumeExpertise } from "./resume-expertise";
import { ResumeApproach } from "./resume-approach";
import { ResumeContactBanner } from "./resume-contact-banner";

type ResumePageProps = {
  experience: SiteContent["home"]["experience"];
  channels: SiteContent["home"]["contacts"]["channels"];
};

export const ResumePage = (props: ResumePageProps) => {
  const { experience, channels } = props;
  const telegram = channels.find((channel) => channel.kind === "TELEGRAM");
  const email = channels.find((channel) => channel.kind === "EMAIL");

  return (
    <article className="pt-7 max-[680px]:pt-6" data-page="resume">
      <ResumeHero telegramHref={telegram?.href ?? "/contacts"} />
      <ResumeHighlights />
      <ResumeCareer jobs={experience.jobs} />
      <ResumeExpertise />
      <ResumeApproach />
      <ResumeContactBanner telegramHref={telegram?.href ?? "/contacts"} email={email?.title} />
    </article>
  );
};
