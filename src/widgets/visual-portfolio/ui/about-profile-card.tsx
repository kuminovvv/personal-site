import type { getVisualText } from "../model/locale-content";

type AboutProfileCardProps = { copy: ReturnType<typeof getVisualText> };

export const AboutProfileCard = (props: AboutProfileCardProps) => {
  const {
    copy,
  } = props;
  return (
    <div data-motion="accent" data-motion-order="2" className="relative min-h-[323px] w-full overflow-hidden rounded-[32px] bg-site-about-surface p-8 max-[480px]:min-h-[286px] max-[480px]:rounded-[24px] max-[480px]:p-6">
      <div className="flex items-center justify-between gap-4">
        <strong className="font-[family-name:var(--visual-heading-font-stack)] text-[16px] leading-none font-bold tracking-[-.0045em] text-site-about-text-e">KUMINOVVV</strong>
        <span className="font-[family-name:var(--font-visual-mono)] text-[12px] leading-none tracking-[.0016em] text-site-about-text-f">ABOUT / PROFILE</span>
      </div>
      <div className="absolute top-[47px] left-8 font-[family-name:var(--visual-heading-font-stack)] text-site-about-text-g max-[480px]:top-[55px] max-[480px]:left-6">
        <p className="text-[clamp(140px,12.5vw,196px)] leading-[.94] font-extrabold tracking-[-.08em] max-[480px]:text-[144px]">6+</p>
        <p className="-mt-3 text-[clamp(25px,2.3vw,36px)] leading-[1.09] font-bold tracking-[-.01em] max-[480px]:text-[25px]">{copy.years}</p>
      </div>
      <div className="absolute right-8 bottom-8 left-8 border-t border-site-about-border pt-[14px] max-[480px]:right-6 max-[480px]:bottom-6 max-[480px]:left-6">
        <div className="flex items-center justify-between gap-2 font-[family-name:var(--font-visual-mono)] text-[clamp(10px,.885vw,17px)] leading-none text-site-about-text-h">
          <span>2020</span><span className="text-center text-[clamp(8px,.63vw,12px)] tracking-[.001em] text-site-about-text-i">{copy.career}</span><span>{copy.now}</span>
        </div>
      </div>
    </div>
  );
};
