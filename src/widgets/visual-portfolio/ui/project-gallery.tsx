"use client";

import { isMotionReduced } from "@/shared/lib/motion/preference";

import { useCallback, useState } from "react";
import { visualProjects } from "../model/projects";
import { useGalleryDrag } from "../model/use-gallery-drag";
import { useGalleryPosition } from "../model/use-gallery-position";
import { useProjectLocation } from "../model/use-project-location";
import { ProjectCard } from "./project-card";
import { ProjectModal } from "./project-modal";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";

export const ProjectGallery = ({ locale = "ru" }: { locale?: Locale }) => {
  const copy = getVisualText(locale);
  const { scrollRef, activityRef, stopAnimation, onPointerDown, onPointerMove, finishDrag, onClickCapture, onPointerLeave } = useGalleryDrag();
  const { onScroll, cancelSettle } = useGalleryPosition(scrollRef, activityRef);
  const { selected, updateUrl } = useProjectLocation();
  const [presence, setPresence] = useState({ selected, displayed: selected });
  // Keep the last poster mounted during exit, including Back/Forward changes.
  if (selected !== presence.selected) {
    setPresence({ selected, displayed: selected ?? presence.displayed });
  }
  const displayed = presence.displayed;

  const close = useCallback(() => {
    updateUrl(null);
  }, [updateUrl]);

  const onExited = useCallback(() => setPresence((current) => current.selected === null ? { ...current, displayed: null } : current), []);

  const open = (slug: string) => {
    stopAnimation();
    cancelSettle();
    updateUrl(slug);
  };

  const move = (direction: number) => {
    stopAnimation();
    const element = scrollRef.current;
    const cards = element?.querySelectorAll<HTMLElement>("[data-gallery-card]");
    if (!element || !cards || cards.length < 2) return;
    element.scrollBy({
      left: direction * (cards[1].offsetLeft - cards[0].offsetLeft),
      behavior: isMotionReduced() ? "instant" : "smooth",
    });
  };

  return (
    <section id="projects" className="relative min-w-0">
      <h2 data-motion="heading" data-project-intro className="mb-18.25 text-center font-(family-name:--visual-heading-font-stack) text-[clamp(34px,3vw,52px)] leading-[1.08] font-semibold tracking-[-.022em] text-[#0b0c0b] max-[640px]:mb-10 max-[360px]:text-[32px]">{copy.projects}</h2>
      <div className="relative mx-[calc((100%_-_100cqw)/2)] w-[100cqw] [--gallery-inset:max(clamp(16px,10.4167vw,200px),calc((100cqw_-_1520px)/2))]">
        <div
          ref={scrollRef}
          data-gallery-rail
          tabIndex={0}
          aria-label={copy.galleryAria}
          className="-mb-16 flex cursor-grab gap-6 overflow-x-auto overscroll-x-contain scroll-auto pb-16 pl-(--gallery-inset) pr-[max(32px,calc(100%_-_var(--gallery-inset)_-_408px))] select-none [scrollbar-width:none] data-[dragging=true]:cursor-grabbing [&::-webkit-scrollbar]:hidden max-[520px]:pr-[max(32px,calc(100%_-_var(--gallery-inset)_-_320px))]"
          onPointerDown={(event) => { cancelSettle(); onPointerDown(event); }}
          onPointerMove={onPointerMove}
          onPointerUp={(event) => { finishDrag(event); onScroll(); }}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onPointerLeave={onPointerLeave}
          onTouchStart={() => { activityRef.current.pressed = true; cancelSettle(); }}
          onTouchEnd={() => { activityRef.current.pressed = false; onScroll(); }}
          onTouchCancel={() => { activityRef.current.pressed = false; cancelSettle(); }}
          onWheel={() => { stopAnimation(); cancelSettle(); }}
          onScroll={onScroll}
          onDragStart={(event) => event.preventDefault()}
          onClickCapture={onClickCapture}
          onKeyDown={(event) => {
            stopAnimation();
            cancelSettle();
            if (event.target !== scrollRef.current) return;
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              move(event.key === "ArrowRight" ? 1 : -1);
            }
          }}
        >
          {visualProjects.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} onOpen={open} locale={locale} />)}
        </div>
      </div>
      {displayed && <ProjectModal project={visualProjects.find((project) => project.slug === displayed)!} locale={locale} isOpen={selected !== null} onCloseAction={close} onExitedAction={onExited} />}
    </section>
  );
};
