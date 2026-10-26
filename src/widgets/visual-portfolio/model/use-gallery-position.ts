"use client";

import { isMotionReduced } from "@/shared/lib/motion/preference";

import { useCallback, useEffect, useRef, type RefObject } from "react";
import { motionTokens } from "@/shared/lib/motion/tokens";

type GalleryElement = HTMLDivElement;

type GalleryActivity = { pressed: boolean; inertia: boolean };

export const useGalleryPosition = (scrollRef: RefObject<GalleryElement | null>, activityRef: RefObject<GalleryActivity>) => {
  const settleTimerRef = useRef<number | null>(null);

  const getTargets = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return [];
    const first = element.querySelector<HTMLElement>("[data-gallery-card]");
    if (!first) return [];
    const cards = [...element.querySelectorAll<HTMLElement>("[data-gallery-card]")];
    const maximum = element.scrollWidth - element.clientWidth;
    return cards.map((card, index) => index === cards.length - 1 ? maximum : Math.max(0, Math.min(maximum, card.offsetLeft - first.offsetLeft)));
  }, [scrollRef]);

  const settle = useCallback(() => {
    const element = scrollRef.current;
    const targets = getTargets();
    if (!element || !targets.length || activityRef.current?.pressed || activityRef.current?.inertia || isMotionReduced()) return;
    const position = element.scrollLeft;
    const target = targets.reduce((closest, candidate) => Math.abs(candidate - position) < Math.abs(closest - position) ? candidate : closest, targets[0]);
    if (Math.abs(target - position) < 4 || Math.abs(target - position) > motionTokens.gallery.snapDistance) return;
    element.scrollTo({ left: target, behavior: "smooth" });
  }, [activityRef, getTargets, scrollRef]);

  const cancelSettle = useCallback(() => {
    if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
    settleTimerRef.current = null;
  }, []);

  const onScroll = useCallback(() => {
    cancelSettle();
    settleTimerRef.current = window.setTimeout(settle, 120);
  }, [cancelSettle, settle]);

  useEffect(() => {
    return () => {
      cancelSettle();
    };
  }, [cancelSettle]);

  return { onScroll, cancelSettle };
};
