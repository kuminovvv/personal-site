import { robotoFlex, unbounded, onest, golos, geistMono } from "./config/fonts";
import type { ReactNode } from "react";
import type { Locale } from "@/shared/lib/i18n/locale";
import { SiteLayout } from "@/widgets/site-layout";
import { SiteHeader } from "@/widgets/site-header";
import { SiteFooter } from "@/widgets/site-footer";
import { getSiteContent } from "@/shared/lib/content/get-site-content";
import { localeBootstrapScript } from "@/shared/lib/i18n/locale-bootstrap-script";
import { introBootstrapScript } from "@/shared/lib/motion/intro-bootstrap-script";
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";
import "./globals.css";








export const RootDocument = async (props: Readonly<{ children: ReactNode; locale: Locale }>) => {
  const {
    children,
    locale,
  } = props;
  const content = await getSiteContent(locale);
  const header = <SiteHeader locale={locale} />;
  const footer = <SiteFooter locale={locale} content={content.footer} channels={content.home.contacts.channels} />;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`h-full antialiased ${robotoFlex.variable} ${unbounded.variable} ${onest.variable} ${golos.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var html=document.documentElement,off=false;try{if(localStorage.getItem("portfolio-theme")==="dark")html.classList.add("dark");off=localStorage.getItem("portfolio-motion")==="off"}catch(e){}try{var key="portfolio-language-navigation";var target=sessionStorage.getItem(key);sessionStorage.removeItem(key);if(target===location.pathname+location.search+location.hash)html.dataset.skipPortfolioMotion="true"}catch(e){}if(!off&&!location.hash&&html.dataset.skipPortfolioMotion!=="true")html.dataset.introMotion="true"})()`,
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: localeBootstrapScript }} />
        <script dangerouslySetInnerHTML={{ __html: introBootstrapScript }} />
      </head>
      <body className="min-h-full">
        <SmoothScrollProvider>
          <SiteLayout header={header} footer={footer}>{children}</SiteLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
};
