import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { ResumeHero } from "./resume-hero";
import { ResumeHighlights } from "./resume-highlights";
import { ResumeCareer } from "./resume-career";
import { ResumeExpertise } from "./resume-expertise";
import { ResumeApproach } from "./resume-approach";
import { ResumeContactBanner } from "./resume-contact-banner";
import type { Locale } from "@/shared/lib/i18n/locale";
import { localizeHref } from "@/shared/lib/i18n/locale";

type ResumePageProps = {
  experience: SiteContent["home"]["experience"];
  channels: SiteContent["home"]["contacts"]["channels"];
  locale?: Locale;
};

export const ResumePage = (props: ResumePageProps) => {
  const { experience, channels, locale = "ru" } = props;
  const telegram = channels.find((channel) => channel.kind === "TELEGRAM");
  const email = channels.find((channel) => channel.kind === "EMAIL");

  return (
    <article className="pt-7 max-[680px]:pt-6" data-page="resume">
      <ResumeHero telegramHref={telegram?.href ?? localizeHref("/contacts", locale)} locale={locale} />
      <ResumeHighlights locale={locale} />
      <ResumeCareer jobs={experience.jobs} locale={locale} />
      <ResumeExpertise locale={locale} />
      <ResumeApproach locale={locale} />
      <ResumeContactBanner telegramHref={telegram?.href ?? localizeHref("/contacts", locale)} email={email?.title} locale={locale} />
    </article>
  );
};
