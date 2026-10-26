import type { ReactNode } from "react";
import { SiteFooter } from "@/widgets/site-footer/ui/site-footer";
import { SiteHeader } from "@/widgets/site-header/ui/site-header";
import { getSiteContent } from "@/shared/lib/content/get-site-content";
import type { Locale } from "@/shared/lib/i18n/locale";

export const SiteLayout = async ({ children, locale = "ru" }: { children: ReactNode; locale?: Locale }) => {
  const content = await getSiteContent(locale);
  return (
    <div id="top" data-site-layout className="flow-root min-h-screen bg-site-canvas font-sans text-site-text">
      <SiteHeader locale={locale} />
      <main className="mx-auto w-[calc(100%-40px)] max-w-340 max-[900px]:w-[calc(100%-32px)] max-[680px]:w-[calc(100%-24px)] [&_[id]]:scroll-mt-30 max-[680px]:[&_[id]]:scroll-mt-26">{children}</main>
      <SiteFooter locale={locale} content={content.footer} channels={content.home.contacts.channels} />
    </div>
  );
};
