import Image from "next/image";
import type { ProjectDetail } from "../model/project-details";

type ProjectModalDetailsProps = { detail: ProjectDetail; copy: { task: string; contribution: string; technologies: string; imageAlt: string; imageAltSuffix: string } };

export const ProjectModalDetails = (props: ProjectModalDetailsProps) => {
  const {
    detail,
    copy,
  } = props;
  return (
    <div className="grid grid-cols-[minmax(0,682px)_minmax(0,550px)] items-center gap-9 max-[900px]:grid-cols-1 max-[900px]:gap-7">
      <Image src={detail.art} loading="eager" fetchPriority="high" width={682} height={365} sizes="(max-width: 900px) 100vw, 682px" alt={`${copy.imageAlt} «${detail.title}» ${copy.imageAltSuffix}`} className="block h-auto w-full rounded-[17px]" />
      <div className="flex flex-col gap-[20px] text-site-modal-text-d max-[900px]:gap-5">
        <div><h3 className="mb-[8px] font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.1] font-normal text-site-modal-text-e">{copy.task}</h3><p className="font-[family-name:var(--font-visual-text)] text-[18px] leading-[1.31] tracking-[-.0018em] max-[640px]:text-[16px]">{detail.task}</p></div>
        <div><h3 className="mb-[8px] font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.1] font-normal text-site-modal-text-e">{copy.contribution}</h3><p className="font-[family-name:var(--font-visual-text)] text-[18px] leading-[1.31] tracking-[-.0018em] max-[640px]:text-[16px]">{detail.contribution}</p></div>
        <div><h3 className="mb-[8px] font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.1] font-normal text-site-modal-text-e">{copy.technologies}</h3><p className="font-[family-name:var(--font-visual-mono)] text-[12px] leading-[1.34] text-site-modal-text-f">{detail.technologyLabel}</p></div>
      </div>
    </div>
  );
};
