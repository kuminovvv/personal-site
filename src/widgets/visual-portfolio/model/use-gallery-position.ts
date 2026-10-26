"use client";

import { isMotionReduced } from "@/shared/lib/motion/preference";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { motionTokens } from "@/shared/lib/motion/tokens";

type GalleryElement = HTMLDivElement;

type GalleryActivity = { pressed: boolean; inertia: boolean };

export const useGalleryPosition = (scrollRef: RefObject<GalleryElement | null>, itemCount: number, activityRef: RefObject<GalleryActivity>) => {
  const [position, setPosition] = useState({ activeIndex: 0, atStart: true, atEnd: false });
  const positionRef = useRef(position);
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

  const syncPosition = useCallback(() => {
    const targets = getTargets();
    if (!targets.length) return;
    const position = scrollRef.current?.scrollLeft ?? 0;
    let closest = 0;
    targets.forEach((target, index) => {
      if (Math.abs(target - position) < Math.abs(targets[closest] - position)) closest = index;
    });
    const element = scrollRef.current;
    const next = { activeIndex: Math.min(closest, itemCount - 1), atStart: position < 2, atEnd: !!element && position >= element.scrollWidth - element.clientWidth - 2 };
    const previous = positionRef.current;
    if (next.activeIndex !== previous.activeIndex || next.atStart !== previous.atStart || next.atEnd !== previous.atEnd) {
      positionRef.current = next;
      setPosition(next);
    }
  }, [getTargets, itemCount, scrollRef]);

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
    syncPosition();
    cancelSettle();
    settleTimerRef.current = window.setTimeout(settle, 120);
  }, [cancelSettle, settle, syncPosition]);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    syncPosition();
    const observer = new ResizeObserver(syncPosition);
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelSettle();
    };
  }, [cancelSettle, onScroll, scrollRef, syncPosition]);

  const scrollToIndex = useCallback((index: number) => {
    const element = scrollRef.current;
    const targets = getTargets();
    if (!element || !targets.length) return;
    const nextIndex = Math.max(0, Math.min(index, targets.length - 1));
    cancelSettle();
    element.scrollTo({ left: targets[nextIndex], behavior: isMotionReduced() ? "instant" : "smooth" });
  }, [cancelSettle, getTargets, scrollRef]);

  return { ...position, onScroll, cancelSettle, scrollToIndex };
};
