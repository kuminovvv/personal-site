import { ShareButton } from "@/features/share-site/ui/share-button";
import { Intro } from "./intro";
import { ContactCard } from "./contact-card";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

export const Contacts = ({ content }: { content: SiteContent["home"]["contacts"] }) => {
  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro
        section="contacts"
        title={content.title}
        description={content.description}
        aside={
          <div className="flex min-h-31.25 min-w-72.5 items-center gap-3 rounded-[28px] bg-site-surface p-7 max-[680px]:mt-5 max-[680px]:min-h-0 max-[680px]:w-fit max-[680px]:p-5 [&_strong]:grid [&_strong]:size-11.25 [&_strong]:place-items-center [&_strong]:rounded-full [&_strong]:bg-site-green [&_strong]:text-site-on-green [&_strong]:font-heading [&_strong]:text-[18px] [&_strong]:font-black [&_span]:text-[13px] [&_span]:text-site-subtle [&_b]:text-site-text">
            <strong>K.</strong>
            <span>
              <b>{content.brandName}</b>
              <br />
              {content.brandSubtitle}
            </span>
          </div>
        }
      />
      <div className="grid grid-cols-[1.25fr_.85fr] gap-7 max-[900px]:grid-cols-1 max-[900px]:gap-5">
        <div className="flex min-h-153.75 flex-col rounded-[30px] bg-site-surface p-12 text-site-text max-[1180px]:p-10 max-[680px]:min-h-140 max-[680px]:p-7 [&>span]:text-[13px] [&>span]:text-site-subtle [&>span::first-letter]:text-site-green-text dark:text-site-green [&_small]:text-[13px] [&_small]:text-site-subtle [&_small::first-letter]:text-site-green-text dark:text-site-green [&_h3]:mt-14 [&_h3]:text-[clamp(34px,3vw,48px)] [&>p]:mt-10 [&>p]:text-[18px] [&>p]:leading-[1.6] [&>p]:text-site-subtle">
          <span>{content.availability}</span>
          <h3>
            {content.callTitleLine}
            <br />
            {content.callTitleAccent}
          </h3>
          <p>
            {content.callDescription}
          </p>
          <div className="mt-10 flex flex-wrap gap-2.5 [&_span]:rounded-full [&_span]:bg-site-soft [&_span]:px-5 [&_span]:py-2.5 [&_span]:text-[11px] [&_span]:text-site-subtle">
            {content.interests.map((interest) => <span key={interest}>{interest}</span>)}
          </div>
          <div className="mt-auto mb-14 flex items-center justify-between gap-4 [&_h4]:text-[24px] max-[680px]:[&_h4]:text-[18px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:text-site-subtle [&>strong]:grid [&>strong]:size-37 [&>strong]:place-items-center [&>strong]:rounded-full [&>strong]:bg-site-green [&>strong]:font-heading [&>strong]:text-[64px] [&>strong]:font-black [&>strong]:text-site-on-green max-[680px]:[&>strong]:size-22.5 max-[680px]:[&>strong]:text-[40px]">
            <div>
              <h4>
                {content.closingLine}
                <br />
                {content.closingAccent}
              </h4>
              <p>{content.closingDescription}</p>
            </div>
            <strong>K.</strong>
          </div>
          <small>{content.callNote}</small>
        </div>
        <div className="grid grid-rows-[1fr_1fr_96px] gap-5 max-[680px]:gap-4">
          {content.channels.map((channel) => (
            <ContactCard
              key={channel.kind}
              href={channel.href}
              kind={channel.kind === "EMAIL" ? "EMAIL" : "TELEGRAM"}
              number={channel.number}
              title={channel.title}
              description={channel.description}
              action={channel.action}
              external={channel.external}
            />
          ))}
          <div className="flex items-center gap-3 rounded-[26px] bg-site-surface px-9 py-5.5 text-[14px] max-[680px]:px-7 [&>strong]:grid [&>strong]:size-8 [&>strong]:shrink-0 [&>strong]:place-items-center [&>strong]:rounded-full [&>strong]:bg-site-green [&>strong]:text-site-on-green [&>strong]:font-heading [&_span]:text-site-subtle [&_b]:text-site-text">
            <strong>K.</strong>
            <span>
              <b>{content.brandStatement}</b>
              <br />
              {content.brandExplanation}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-10 flex min-h-34 items-center justify-between gap-8 rounded-[28px] bg-site-surface p-10 max-[680px]:mt-7 max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-6 max-[680px]:p-7 [&_h3]:text-[22px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-site-subtle">
        <div>
          <h3>{content.shareTitle}</h3>
          <p>{content.shareDescription}</p>
        </div>
        <ShareButton />
      </div>
    </section>
  );
};
