"use client";

import { useEffect, useRef } from "react";
import { revealFrames, revealOptions, type RevealKind } from "@/shared/lib/motion/reveal";
import { isMotionReduced, subscribeMotionPreference } from "@/shared/lib/motion/preference";

// Content is visible in the server HTML. Only an active animation changes it.
export const PortfolioMotion = () => {
  const completedRef = useRef(new WeakSet<HTMLElement>());

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-visual-home]");
    if (!root || !Element.prototype.animate || !("IntersectionObserver" in window)) return;
    // Locale navigation creates a fresh document. Keep its content fully visible;
    // replaying the entrance animation causes a full-page flash.
    if (document.documentElement.dataset.skipPortfolioMotion === "true") return;
    const completed = completedRef.current;
    const observed = new WeakSet<HTMLElement>();
    const active = new Map<HTMLElement, Animation>();
    const pending = new Set<HTMLElement>();

    const reveal = (element: HTMLElement) => {
      if (!pending.delete(element)) return;
      element.style.removeProperty("opacity");
    };

    const finish = (element: HTMLElement) => {
      active.get(element)?.cancel();
      active.delete(element);
      reveal(element);
    };

    const play = (element: HTMLElement, frames: Keyframe[], options: KeyframeAnimationOptions) => {
      completed.add(element);
      if (isMotionReduced()) {
        reveal(element);
        return;
      }
      const animation = element.animate(frames, options);
      active.set(element, animation);
      // The backwards fill starts at opacity 0, so the inline guard can go.
      reveal(element);
      animation.onfinish = () => finish(element);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting, boundingClientRect }) => {
        const element = target as HTMLElement;
        if (!isIntersecting || completed.has(element)) return;
        observer.unobserve(element);
        // A restored scroll position should never replay elements above it.
        if (boundingClientRect.bottom <= 0) {
          completed.add(element);
          reveal(element);
          return;
        }
        play(element, revealFrames(element.dataset.motion as RevealKind), revealOptions(element));
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

    const observe = (element: HTMLElement) => {
      if (observed.has(element) || completed.has(element)) return;
      observed.add(element);
      // The initial project entrance starts in CSS before hydration.
      if (element.hasAttribute("data-project-intro") && document.documentElement.dataset.introMotion === "true") {
        completed.add(element);
        return;
      }
      const bounds = element.getBoundingClientRect();
      // The visible edge of the gallery is part of the first screen.
      // Keep visible elements on screen instead of flashing them from opacity 0.
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        completed.add(element);
        return;
      }
      if (bounds.bottom <= 0 || isMotionReduced()) {
        completed.add(element);
        return;
      }
      // Arm only offscreen elements, so they are already hidden before entering
      // the viewport. No visible -> invisible -> visible flash on scroll.
      element.style.opacity = "0";
      pending.add(element);
      observer.observe(element);
    };
    root.querySelectorAll<HTMLElement>("[data-motion]").forEach(observe);
    const mutations = new MutationObserver((records) => records.forEach(({ addedNodes }) => addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches("[data-motion]")) observe(node);
      node.querySelectorAll<HTMLElement>("[data-motion]").forEach(observe);
    })));
    mutations.observe(root, { childList: true, subtree: true });

    // Keyboard and anchor navigation must make the destination readable at once.
    const finishDestination = (target: Element) => {
      active.forEach((_, element) => {
        if (element.contains(target) || target.contains(element)) finish(element);
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>("[data-motion]");
      if (element) {
        completed.add(element);
        observer.unobserve(element);
        reveal(element);
      }
      finishDestination(event.target);
    };
    const onAnchorClick = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!anchor?.hash || anchor.origin !== location.origin || anchor.pathname !== location.pathname) return;
      const target = document.getElementById(anchor.hash.slice(1));
      if (target) {
        target.querySelectorAll<HTMLElement>("[data-motion]").forEach((element) => {
          completed.add(element);
          observer.unobserve(element);
          reveal(element);
        });
        finishDestination(target);
      }
    };
    const onMotionChange = () => {
      if (!isMotionReduced()) return;
      delete document.documentElement.dataset.introMotion;
      active.forEach((_, element) => finish(element));
      pending.forEach((element) => {
        completed.add(element);
        observer.unobserve(element);
        reveal(element);
      });
    };
    const unsubscribe = subscribeMotionPreference(onMotionChange);
    root.addEventListener("focusin", onFocus);
    root.addEventListener("click", onAnchorClick);
    return () => {
      unsubscribe();
      observer.disconnect();
      mutations.disconnect();
      active.forEach((_, element) => finish(element));
      pending.forEach(reveal);
      root.removeEventListener("focusin", onFocus);
      root.removeEventListener("click", onAnchorClick);
    };
  }, []);

  return null;
};
