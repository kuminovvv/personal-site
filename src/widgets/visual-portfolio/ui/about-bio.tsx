import type { getVisualText } from "../model/locale-content";

type AboutBioProps = { copy: ReturnType<typeof getVisualText> };

export const AboutBio = (props: AboutBioProps) => {
  const {
    copy,
  } = props;
  return (
    <div data-motion="fade" data-motion-order="1" className="max-w-[826px]">
      <h3 className="font-[family-name:var(--visual-heading-font-stack)]! text-[clamp(28px,3vw,47px)] leading-[1.08]! font-semibold tracking-[-.015em] text-site-about-text-c">
        {copy.aboutName}
      </h3>
      <p className="mt-6 max-w-[819px] font-[family-name:var(--font-visual-text)] text-[clamp(17px,1.46vw,28px)] leading-[1.36] tracking-[-.0055em] text-site-about-text-d">
        {copy.aboutDescription}
      </p>
    </div>
  );
};
