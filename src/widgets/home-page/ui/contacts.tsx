import { ShareButton } from "@/features/share-site";
import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { Intro } from "./intro";
import { ContactCard } from "./contact-card";
import { ContactMain } from "./contact-main";
import { ContactBrandCard } from "./contact-brand-card";

export const Contacts = (props: { content: SiteContent["home"]["contacts"] }) => {
  const {
    content,
  } = props;
  const aside = <div className="flex min-h-31.25 min-w-72.5 items-center gap-3 rounded-[28px] bg-site-surface p-7 max-[680px]:mt-5 max-[680px]:min-h-0 max-[680px]:w-fit max-[680px]:p-5 [&_strong]:grid [&_strong]:size-11.25 [&_strong]:place-items-center [&_strong]:rounded-full [&_strong]:bg-site-green [&_strong]:text-site-on-green [&_strong]:font-heading [&_strong]:text-[18px] [&_strong]:font-black [&_span]:text-[13px] [&_span]:text-site-subtle [&_b]:text-site-text"><strong>K.</strong><span><b>{content.brandName}</b><br />{content.brandSubtitle}</span></div>;
  return (
    <section className="mt-24 max-[900px]:mt-20 max-[680px]:mt-16">
      <Intro section="contacts" title={content.title} description={content.description} aside={aside} />
      <div className="grid grid-cols-[1.25fr_.85fr] gap-7 max-[900px]:grid-cols-1 max-[900px]:gap-5">
        <ContactMain content={content} />
        <div className="grid grid-rows-[1fr_1fr_96px] gap-5 max-[680px]:gap-4">
          {content.channels.map((channel) => <ContactCard key={channel.kind} href={channel.href} kind={channel.kind === "EMAIL" ? "EMAIL" : "TELEGRAM"} number={channel.number} title={channel.title} description={channel.description} action={channel.action} hasExternalTarget={channel.external} />)}
          <ContactBrandCard brandStatement={content.brandStatement} brandExplanation={content.brandExplanation} />
        </div>
      </div>
      <div className="mt-10 flex min-h-34 items-center justify-between gap-8 rounded-[28px] bg-site-surface p-10 max-[680px]:mt-7 max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-6 max-[680px]:p-7 [&_h3]:text-[22px] [&_p]:mt-3 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-site-subtle"><div><h3>{content.shareTitle}</h3><p>{content.shareDescription}</p></div><ShareButton /></div>
    </section>
  );
};
