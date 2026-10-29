import { LinkButton } from "@/shared/ui/link-button";
import type { SiteContent } from "@/shared/lib/content/get-site-content";
import type { Locale } from "@/shared/lib/i18n/locale";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import { FooterContacts } from "./footer-contacts";
import { FooterNavigation } from "./footer-navigation";
import { FooterBrand } from "./footer-brand";

type SiteFooterProps = {
  content: SiteContent["footer"];
  channels: SiteContent["home"]["contacts"]["channels"];
  locale?: Locale;
};

export const SiteFooter = (props: SiteFooterProps) => {
  const {
    content,
    channels,
    locale = "ru",
  } = props;
  const email = channels.find((channel) => channel.kind === "EMAIL");
  const telegram = channels.find((channel) => channel.kind === "TELEGRAM");
  return (
    <footer className="mx-auto mt-15 mb-6 w-[calc(100%-40px)] max-w-340 rounded-[30px] bg-site-contact-surface p-8 text-site-footer-surface projects:mt-6.5 stack:mt-8 max-[580px]:mt-10 max-[580px]:w-[calc(100%-24px)] max-[580px]:p-6">
      <div className="grid min-h-53.75 grid-cols-[1.2fr_1fr_.8fr] gap-12 max-[850px]:grid-cols-2 max-[580px]:grid-cols-1 max-[580px]:gap-7.5">
        <FooterBrand content={content} />
        <div>
          <h2 className="mb-7 font-sans! text-[12px]! font-semibold! tracking-normal! text-site-green">{content.navigationTitle}</h2>
          <FooterNavigation locale={locale} />
        </div>
        <FooterContacts content={content} email={email} telegram={telegram} />
      </div>
      <div className="grid grid-cols-[1fr_1.8fr_auto] items-center border-t border-site-footer-border pt-7 text-[13px] text-site-contact-text max-[580px]:grid-cols-[1fr_auto] max-[580px]:gap-4">
        <span>{content.copyright}</span>
        <div className="flex flex-wrap items-center gap-4"><span className="max-[580px]:hidden">{content.note}</span><LanguageSwitcher locale={locale} /></div>
        <LinkButton href="#top" tone="soft" size="footer" arrow="up-right" className="bg-site-footer-surface-b text-white hover:bg-site-footer-surface-b">{content.topLabel}</LinkButton>
      </div>
    </footer>
  );
};
