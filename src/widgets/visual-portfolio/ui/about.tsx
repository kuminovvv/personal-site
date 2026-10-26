import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";

export const About = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getVisualText(locale);
  return (
  <section
    id="about"
    aria-labelledby="visual-about-title"
    className="mx-auto w-full max-w-[1520px] py-0"
  >
    <div className="flex flex-wrap items-center justify-between gap-3 font-[family-name:var(--font-visual-mono)] text-[12px] leading-none tracking-[.005em] text-[#626864] sm:text-[14px]">
      <span>{copy.aboutLabel}</span>
      <span className="text-right text-[11px] tracking-[.0032em] sm:text-[13px]">{copy.aboutRole}</span>
    </div>

    <h2
      id="visual-about-title"
      data-motion="heading"
      className="mt-[68px] font-[family-name:var(--visual-heading-font-stack)]! text-[clamp(47px,5.84vw,112px)]! leading-[1.01]! font-semibold tracking-[-.04em] text-[#0b0b0b] max-[768px]:mt-10"
    >
      {copy.aboutTitle}
    </h2>

    <div className="mt-[68px] grid grid-cols-[minmax(0,826px)_minmax(0,620px)] items-center gap-[74px] max-[1080px]:grid-cols-1 max-[1080px]:gap-10 max-[768px]:mt-10">
      <div data-motion="fade" data-motion-order="1" className="max-w-[826px]">
        <h3 className="font-[family-name:var(--visual-heading-font-stack)]! text-[clamp(28px,3vw,47px)] leading-[1.08]! font-semibold tracking-[-.015em] text-[#171717]">
          {copy.aboutName}
        </h3>
        <p className="mt-6 max-w-[819px] font-[family-name:var(--font-visual-text)] text-[clamp(17px,1.46vw,28px)] leading-[1.36] tracking-[-.0055em] text-[#2e3330]">
          {copy.aboutDescription}
        </p>
      </div>

      <div data-motion="accent" data-motion-order="2" className="relative min-h-[323px] w-full overflow-hidden rounded-[32px] bg-[#daeedb] p-8 max-[480px]:min-h-[286px] max-[480px]:rounded-[24px] max-[480px]:p-6">
        <div className="flex items-center justify-between gap-4">
          <strong className="font-[family-name:var(--visual-heading-font-stack)] text-[16px] leading-none font-bold tracking-[-.0045em] text-[#224d36]">
            KUMINOVVV
          </strong>
          <span className="font-[family-name:var(--font-visual-mono)] text-[12px] leading-none tracking-[.0016em] text-[#4f7d5b]">
            ABOUT / PROFILE
          </span>
        </div>

        <div className="absolute top-[47px] left-8 font-[family-name:var(--visual-heading-font-stack)] text-[#164732] max-[480px]:top-[55px] max-[480px]:left-6">
          <p className="text-[clamp(140px,12.5vw,196px)] leading-[.94] font-extrabold tracking-[-.08em] max-[480px]:text-[144px]">
            6+
          </p>
          <p className="-mt-3 text-[clamp(25px,2.3vw,36px)] leading-[1.09] font-bold tracking-[-.01em] max-[480px]:text-[25px]">
            {copy.years}
          </p>
        </div>

        <div className="absolute right-8 bottom-8 left-8 border-t border-[#b9d8bf] pt-[14px] max-[480px]:right-6 max-[480px]:bottom-6 max-[480px]:left-6">
          <div className="flex items-center justify-between gap-2 font-[family-name:var(--font-visual-mono)] text-[clamp(10px,.885vw,17px)] leading-none text-[#355e43]">
            <span>2020</span>
            <span className="text-center text-[clamp(8px,.63vw,12px)] tracking-[.001em] text-[#557e5c]">
              {copy.career}
            </span>
            <span>{copy.now}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};
