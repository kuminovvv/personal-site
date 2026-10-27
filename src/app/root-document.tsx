import type { ReactNode } from "react";
import type { Locale } from "@/shared/lib/i18n/locale";
import { Roboto_Flex, Unbounded, Onest, Golos_Text, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "./providers/smooth-scroll-provider";
import { SiteLayout } from "@/widgets/site-layout/ui/site-layout";
import { localeBootstrapScript } from "@/shared/lib/i18n/locale-bootstrap-script";
import { introBootstrapScript } from "@/shared/lib/motion/intro-bootstrap-script";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto-flex",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});
const onest = Onest({ subsets: ["latin", "cyrillic", "cyrillic-ext"], variable: "--font-visual-display", display: "swap", weight: "variable" });
const golos = Golos_Text({ subsets: ["latin", "cyrillic"], variable: "--font-visual-text", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-visual-mono", display: "swap" });

const RootDocument = ({ children, locale }: Readonly<{ children: ReactNode; locale: Locale }>) => {
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
          <SiteLayout locale={locale}>{children}</SiteLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
};

export default RootDocument;
