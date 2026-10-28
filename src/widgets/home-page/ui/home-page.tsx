"use client";

import { Suspense, useEffect, useSyncExternalStore } from "react";
import { VisualHero } from "@/widgets/visual-portfolio/ui/visual-hero";
import { ProjectGallery } from "@/widgets/visual-portfolio/ui/project-gallery";
import { Approach } from "@/widgets/visual-portfolio/ui/approach";
import { CreativeLab } from "@/widgets/visual-portfolio/ui/creative-lab";
import { About } from "@/widgets/visual-portfolio/ui/about";
import { Contact } from "@/widgets/visual-portfolio/ui/contact";
import { PortfolioMotion } from "@/widgets/visual-portfolio/ui/portfolio-motion";
import { motionStyle } from "@/shared/lib/motion/tokens";
import { getLocaleFromPath, type Locale } from "@/shared/lib/i18n/locale";
import { getMetadataCopy } from "@/shared/lib/i18n/metadata";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import { getVisualExtraText, getVisualText } from "@/widgets/visual-portfolio/model/locale-content";

const subscribeLocale = (notify: () => void) => {
  window.addEventListener("portfolio:locale-change", notify);
  window.addEventListener("popstate", notify);
  return () => {
    window.removeEventListener("portfolio:locale-change", notify);
    window.removeEventListener("popstate", notify);
  };
};
const currentLocale = () => getLocaleFromPath(window.location.pathname);

export const HomePage = ({ locale = "ru" }: { locale?: Locale }) => {
  const language = useSyncExternalStore(subscribeLocale, currentLocale, () => locale);
  const copy = getVisualText(language);
  const extra = getVisualExtraText(language);

  useEffect(() => {
    document.documentElement.lang = language;
    const metadata = getMetadataCopy(language).home;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://kuminovvv.com/${language}/`);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", `https://kuminovvv.com/${language}/`);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata.description);
  }, [language]);
  return (
    <div data-visual-home style={motionStyle} className="mx-auto w-full max-w-[1520px] space-y-[136px] text-[#050505] max-[1024px]:space-y-[88px] max-[640px]:space-y-16">
      <PortfolioMotion />
      <nav data-motion-intro="nav" className="flex h-[58px] items-center justify-between gap-4 max-[540px]:gap-0" aria-label={extra.homeNav}>
        <a href="#top" className="shrink-0 font-[family-name:var(--font-visual-display)] text-[25px] font-bold tracking-[-.023em] max-[540px]:text-[18px] max-[360px]:text-[15px]">kuminovvv</a>
        <div className="flex shrink-0 items-center gap-3 font-[family-name:var(--font-visual-text)] text-[13px] font-medium max-[540px]:gap-1 max-[540px]:text-[12px]"><a className="rounded-full bg-[#f3f3f2] px-6 py-3.5 max-[540px]:px-3 max-[360px]:px-2.5" href="#projects">{copy.work}</a><a className="rounded-full bg-[#f3f3f2] px-6 py-3.5 max-[540px]:px-3 max-[360px]:px-2.5" href="#about">{copy.about}</a><LanguageSwitcher locale={language} className="rounded-full bg-[#f3f3f2] px-3 max-[540px]:px-1 max-[360px]:px-0.5" /></div>
      </nav>
      <VisualHero locale={language} />
      <Suspense fallback={<div className="min-h-[650px]" />}><ProjectGallery locale={language} /></Suspense>
      <Approach locale={language} />
      <CreativeLab locale={language} />
      <About locale={language} />
      <Contact locale={language} />
    </div>
  );
};
