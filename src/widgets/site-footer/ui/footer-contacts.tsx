import type { SiteContent } from "@/shared/lib/content/get-site-content";

type FooterContactsProps = { content: SiteContent["footer"]; email?: SiteContent["home"]["contacts"]["channels"][number]; telegram?: SiteContent["home"]["contacts"]["channels"][number]; };

export const FooterContacts = (props: FooterContactsProps) => {
  const {
    content,
    email,
    telegram,
  } = props;
  return (
<div className="flex flex-col items-start">
          <h2 className="mb-7 font-sans! text-[12px]! font-semibold! tracking-normal! text-site-green">{content.contactTitle}</h2>
          {email && (
            <>
              <span className="mb-0.5 text-[13px] text-site-footer-text">Email</span>
              <a className="mb-5.5 text-[16px] text-white hover:text-site-green" href={email.href}>{email.title}</a>
            </>
          )}
          {telegram && (
            <>
              <span className="mb-0.5 text-[13px] text-site-footer-text">Telegram</span>
              <a className="mb-5.5 text-[16px] text-white hover:text-site-green" href={telegram.href} target="_blank" rel="noopener noreferrer">{telegram.title}</a>
            </>
          )}
        </div>
  );
};
