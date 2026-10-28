import Image from "next/image";
import { useEffect, useState } from "react";
import type { VisualProject } from "../model/projects";
import { EserviceArtwork } from "./eservice-artwork";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getProjectText } from "../model/locale-content";
import { isMotionReduced, subscribeMotionPreference } from "@/shared/lib/motion/preference";

export const ProjectCard = ({ project, index, onOpen, locale = "ru" }: { project: VisualProject; index: number; onOpen: (slug: string) => void; locale?: Locale }) => {
  const [animateArtwork, setAnimateArtwork] = useState(false);
  const copy = getProjectText(locale)[project.slug];
  useEffect(() => subscribeMotionPreference(() => {
    if (isMotionReduced()) setAnimateArtwork(false);
  }), []);
  const startArtworkMotion = () => {
    if (!isMotionReduced()) setAnimateArtwork(true);
  };
  return (
  <button type="button" data-gallery-card data-project-intro data-motion="card" data-motion-order={index} onClick={() => onOpen(project.slug)} onMouseEnter={() => { if (window.matchMedia("(pointer: fine)").matches) startArtworkMotion(); }} onMouseLeave={() => setAnimateArtwork(false)} onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) startArtworkMotion(); }} onBlur={() => setAnimateArtwork(false)} className="group relative flex h-[558px] w-[408px] shrink-0 cursor-[inherit] flex-col overflow-hidden rounded-[25px] p-[22px] text-left outline-offset-4 focus-visible:outline-3 focus-visible:outline-black max-[520px]:h-[465px] max-[520px]:w-[min(320px,calc(100vw-32px))]" style={{ backgroundColor: project.color }} aria-label={copy.aria}>
    <div className="relative min-h-0 flex-1">
      {project.image ? (
        <Image draggable={false} src={`${project.image}${animateArtwork ? "#animate" : ""}`} alt={copy.alt} width={project.imageWidth ?? 408} height={455} className="pointer-events-none absolute -left-[22px] top-0 h-[455px] w-auto max-w-none max-[520px]:scale-[.76] max-[360px]:scale-[.67]" />
      ) : <EserviceArtwork locale={locale} />}
    </div>
    <div className="flex h-[39px] shrink-0 items-center justify-between gap-3 pt-3" style={{color:project.ink}}>
      <span className="font-[family-name:var(--font-visual-text)] text-[17px] leading-[1.05] font-medium tracking-[-.042em] uppercase">{project.title}</span>
      <span className="max-w-[46%] text-right font-[family-name:var(--font-visual-mono)] text-[11px] leading-tight opacity-80">{copy.category}</span>
    </div>
  </button>
  );
};
