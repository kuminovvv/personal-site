import Link from "next/link";
import { LinkButton } from "@/shared/ui/link-button";
import { siteFooterNavigation } from "@/shared/config/site-navigation";
import type { SiteContent } from "@/shared/lib/content/get-site-content";

type SiteFooterProps = {
  content: SiteContent["footer"];
  channels: SiteContent["home"]["contacts"]["channels"];
};

export const SiteFooter = ({ content, channels }: SiteFooterProps) => {
  const email = channels.find((channel) => channel.kind === "EMAIL");
  const telegram = channels.find((channel) => channel.kind === "TELEGRAM");
  return (
    <footer className="mx-auto mt-15 mb-6 w-[calc(100%-40px)] max-w-340 rounded-[30px] bg-[#22272b] p-8 text-[#f1f5f2] projects:mt-6.5 stack:mt-8 max-[580px]:mt-10 max-[580px]:w-[calc(100%-24px)] max-[580px]:p-6">
      <div className="grid min-h-53.75 grid-cols-[1.2fr_1fr_.8fr] gap-12 max-[850px]:grid-cols-2 max-[580px]:grid-cols-1 max-[580px]:gap-7.5">
        <div className="max-[850px]:col-span-2 max-[580px]:col-span-1">
          <div className="flex items-center gap-2">
            <strong className="grid size-15.5 place-items-center rounded-[17px] bg-site-green font-heading text-[27px] font-black text-[#0d2315]">K.</strong>
            <span className="grid gap-0.75">
              <b className="font-heading text-[29px] font-bold max-[580px]:text-[22px]">{content.brand}</b>
              <small className="text-[13px] text-[#b5bbb7]">{content.subtitle}</small>
            </span>
          </div>
          <p className="my-4 text-[16px] text-[#b5bbb7]">{content.description}</p>
          <span className="inline-block rounded-full bg-[#161a1d] px-3.75 py-3 text-[11px] text-white">{content.tag}</span>
        </div>
        <div>
          <h2 className="mb-7 font-sans! text-[12px]! font-semibold! tracking-normal! text-site-green">{content.navigationTitle}</h2>
          <div className="grid max-w-92.5 grid-cols-2 gap-x-5.5 gap-y-4.5">
            {siteFooterNavigation.map((item) => (
              <Link className="text-[16px] text-white hover:text-site-green" href={"footerHref" in item ? item.footerHref : item.href} key={item.href}>
                {item.footerLabel}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h2 className="mb-7 font-sans! text-[12px]! font-semibold! tracking-normal! text-site-green">{content.contactTitle}</h2>
          {email && (
            <>
              <span className="mb-0.5 text-[13px] text-[#858d89]">Email</span>
              <a className="mb-5.5 text-[16px] text-white hover:text-site-green" href={email.href}>{email.title}</a>
            </>
          )}
          {telegram && (
            <>
              <span className="mb-0.5 text-[13px] text-[#858d89]">Telegram</span>
              <a className="mb-5.5 text-[16px] text-white hover:text-site-green" href={telegram.href} target="_blank" rel="noopener noreferrer">{telegram.title}</a>
            </>
          )}
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.8fr_auto] items-center border-t border-[#4b504d] pt-7 text-[13px] text-[#b5bbb7] max-[580px]:grid-cols-[1fr_auto] max-[580px]:gap-4">
        <span>{content.copyright}</span>
        <span className="max-[580px]:hidden">{content.note}</span>
        <LinkButton href="#top" tone="soft" size="footer" arrow="up-right" className="bg-[#161a1d] text-white hover:bg-[#161a1d]">{content.topLabel}</LinkButton>
      </div>
    </footer>
  );
};
