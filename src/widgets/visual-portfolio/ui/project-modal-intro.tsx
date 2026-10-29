import type { ProjectDetail } from "../model/project-details";

type ProjectModalIntroProps = { detail: ProjectDetail };

export const ProjectModalIntro = (props: ProjectModalIntroProps) => {
  const {
    detail,
  } = props;
  return (
    <>
      <h2 id="visual-project-title" className="font-[family-name:var(--visual-heading-font-stack)] text-[clamp(36px,5.3vw,76px)] leading-[1.04] font-semibold tracking-[-.029em] text-site-modal-text-b">{detail.title}</h2>
      <p id="visual-project-lead" className="font-[family-name:var(--font-visual-text)] text-[clamp(16px,1.53vw,22px)] leading-[1.34] tracking-[-.003em] text-site-modal-text-c">{detail.lead}</p>
    </>
  );
};
