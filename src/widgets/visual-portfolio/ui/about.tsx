import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";
import { AboutBio } from "./about-bio";
import { AboutProfileCard } from "./about-profile-card";

type AboutProps = { locale?: Locale };

export const About = (props: AboutProps) => {
  const {
    locale = "ru",
  } = props;
  const copy = getVisualText(locale);
  return (
  <section
    id="about"
    aria-labelledby="visual-about-title"
    className="mx-auto w-full max-w-[1520px] py-0"
  >
    <div className="flex flex-wrap items-center justify-between gap-3 font-[family-name:var(--font-visual-mono)] text-[12px] leading-none tracking-[.005em] text-site-about-text sm:text-[14px]">
      <span>{copy.aboutLabel}</span>
      <span className="text-right text-[11px] tracking-[.0032em] sm:text-[13px]">{copy.aboutRole}</span>
    </div>

    <h2
      id="visual-about-title"
      data-motion="heading"
      className="mt-[68px] font-[family-name:var(--visual-heading-font-stack)]! text-[clamp(47px,5.84vw,112px)]! leading-[1.01]! font-semibold tracking-[-.04em] text-site-about-text-b max-[768px]:mt-10"
    >
      {copy.aboutTitle}
    </h2>

    <div className="mt-[68px] grid grid-cols-[minmax(0,826px)_minmax(0,620px)] items-center gap-[74px] max-[1080px]:grid-cols-1 max-[1080px]:gap-10 max-[768px]:mt-10">
      <AboutBio copy={copy} />
      <AboutProfileCard copy={copy} />
    </div>
  </section>
  );
};
