import { isMotionReduced, subscribeMotionPreference } from "@/shared/lib/motion/preference";

import { useEffect, useRef, type MouseEvent, type PointerEvent } from "react";
import { motionTokens } from "@/shared/lib/motion/tokens";

type DragOrigin = {
  pointerId: number;
  x: number;
  scrollLeft: number;
  hasMoved: boolean;
  lastX: number;
  lastTime: number;
  velocity: number;
  target: number;
};

export const useGalleryDrag = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<DragOrigin | null>(null);
  const frameRef = useRef<number | null>(null);
  const suppressClickRef = useRef(false);
  const activityRef = useRef({ isPressed: false, hasInertia: false });

  const stopAnimation = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    activityRef.current.hasInertia = false;
    const element = scrollRef.current;
    element?.scrollTo({ left: element.scrollLeft, behavior: "instant" });
  };

  useEffect(() => {
    const unsubscribe = subscribeMotionPreference(() => {
      if (!isMotionReduced()) return;
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      activityRef.current.hasInertia = false;
      const element = scrollRef.current;
      element?.scrollTo({ left: element.scrollLeft, behavior: "instant" });
    });
    return () => {
      unsubscribe();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    stopAnimation();
    if (event.pointerType !== "mouse" || event.button !== 0 || !event.isPrimary) return;
    activityRef.current.isPressed = true;
    activityRef.current.hasInertia = false;
    const element = event.currentTarget;
    element.scrollTo({ left: element.scrollLeft, behavior: "instant" });
    suppressClickRef.current = false;
    originRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: element.scrollLeft,
      hasMoved: false,
      lastX: event.clientX,
      lastTime: event.timeStamp,
      velocity: 0,
      target: element.scrollLeft,
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const origin = originRef.current;
    if (!origin || origin.pointerId !== event.pointerId || !(event.buttons & 1)) return;
    if (!origin.hasMoved && Math.abs(event.clientX - origin.x) < 6) return;
    const element = event.currentTarget;
    if (!origin.hasMoved) {
      origin.hasMoved = true;
      suppressClickRef.current = true;
      element.setPointerCapture(event.pointerId);
      element.dataset.dragging = "true";
    }
    event.preventDefault();
    const elapsed = Math.max(1, event.timeStamp - origin.lastTime);
    origin.velocity = Math.max(-motionTokens.gallery.velocityLimit, Math.min(motionTokens.gallery.velocityLimit, (origin.lastX - event.clientX) / elapsed));
    origin.lastX = event.clientX;
    origin.lastTime = event.timeStamp;
    origin.target = Math.max(0, Math.min(element.scrollWidth - element.clientWidth, origin.scrollLeft - (event.clientX - origin.x)));
    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(() => {
        element.scrollLeft = origin.target;
        frameRef.current = null;
      });
    }
  };

  const finishDrag = (event: PointerEvent<HTMLDivElement>) => {
    const origin = originRef.current;
    if (!origin || origin.pointerId !== event.pointerId) return;
    const element = event.currentTarget;
    originRef.current = null;
    activityRef.current.isPressed = false;
    stopAnimation();
    delete element.dataset.dragging;
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    if (!origin.hasMoved) return;
    element.scrollLeft = origin.target;
    if (event.type !== "pointerup" || event.timeStamp - origin.lastTime > 80 || isMotionReduced()) return;

    let velocity = origin.velocity;
    activityRef.current.hasInertia = true;
    let position = element.scrollLeft;
    let previousTime = performance.now();
    const animate = (time: number) => {
      const elapsed = Math.min(64, time - previousTime);
      previousTime = time;
      const decay = Math.exp(-elapsed / motionTokens.gallery.decay);
      position += velocity * motionTokens.gallery.decay * (1 - decay);
      velocity *= decay;
      const maximum = element.scrollWidth - element.clientWidth;
      position = Math.max(0, Math.min(maximum, position));
      element.scrollLeft = position;
      if (Math.abs(velocity) < 0.02 || position === 0 || position === maximum) {
        frameRef.current = null;
        activityRef.current.hasInertia = false;
        return;
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
  };

  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && !originRef.current?.hasMoved) {
      originRef.current = null;
      activityRef.current.isPressed = false;
    }
  };

  return { scrollRef, activityRef, stopAnimation, onPointerDown, onPointerMove, finishDrag, onClickCapture, onPointerLeave };
};
