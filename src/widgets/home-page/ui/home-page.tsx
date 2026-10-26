import { Suspense } from "react";
import { VisualHero } from "@/widgets/visual-portfolio/ui/visual-hero";
import { ProjectGallery } from "@/widgets/visual-portfolio/ui/project-gallery";
import { Approach } from "@/widgets/visual-portfolio/ui/approach";
import { CreativeLab } from "@/widgets/visual-portfolio/ui/creative-lab";
import { About } from "@/widgets/visual-portfolio/ui/about";
import { Contact } from "@/widgets/visual-portfolio/ui/contact";
import { PortfolioMotion } from "@/widgets/visual-portfolio/ui/portfolio-motion";
import { motionStyle } from "@/shared/lib/motion/tokens";
import type { Locale } from "@/shared/lib/i18n/locale";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import { getVisualExtraText, getVisualText } from "@/widgets/visual-portfolio/model/locale-content";

export const HomePage = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getVisualText(locale);
  const extra = getVisualExtraText(locale);
  return (
    <div data-visual-home style={motionStyle} className="mx-auto w-full max-w-[1520px] space-y-[136px] text-[#050505] max-[1024px]:space-y-[88px] max-[640px]:space-y-16">
      <PortfolioMotion />
      <nav data-motion-intro="nav" className="flex h-[58px] items-center justify-between gap-4 max-[540px]:h-auto max-[540px]:flex-wrap" aria-label={extra.homeNav}>
        <a href="#top" className="font-[family-name:var(--font-visual-display)] text-[25px] font-bold tracking-[-.023em]">kuminovvv</a>
        <div className="flex items-center gap-3 font-[family-name:var(--font-visual-text)] text-[13px] font-medium max-[540px]:gap-2"><a className="rounded-full bg-[#f3f3f2] px-6 py-3.5 max-[540px]:px-4" href="#projects">{copy.work}</a><a className="rounded-full bg-[#f3f3f2] px-6 py-3.5 max-[540px]:px-4" href="#about">{copy.about}</a><LanguageSwitcher locale={locale} className="rounded-full bg-[#f3f3f2] px-3" /></div>
      </nav>
      <VisualHero locale={locale} />
      <Suspense fallback={<div className="min-h-[650px]" />}><ProjectGallery locale={locale} /></Suspense>
      <Approach locale={locale} />
      <CreativeLab locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </div>
  );
};
