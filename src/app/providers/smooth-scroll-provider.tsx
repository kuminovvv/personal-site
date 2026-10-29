"use client";

import { getHashTarget } from "@/shared/lib/get-hash-target";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isMotionReduced } from "@/shared/lib/motion/preference";



export const SmoothScrollProvider = (props: Readonly<{ children: ReactNode }>) => {
  const {
    children,
  } = props;

  const pathname = usePathname();

  useEffect(() => {
    const scrollToTarget = (target: HTMLElement) => {
      const reducedMotion = isMotionReduced();
      target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    };

    const onAnchorClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) return;

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor?.hash ||
        (anchor.target && anchor.target !== "_self") ||
        anchor.hasAttribute("download")
      ) return;

      const destination = new URL(anchor.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== window.location.pathname ||
        destination.search !== window.location.search
      ) return;

      const target = getHashTarget(destination.hash);
      if (!target) return;

      event.preventDefault();
      if (window.location.hash !== destination.hash) {
        window.history.pushState(null, "", destination.hash);
        window.dispatchEvent(new Event("portfolio:location-change"));
      }

      scrollToTarget(target);
    };

    document.addEventListener("click", onAnchorClick, true);
    return () => {
      document.removeEventListener("click", onAnchorClick, true);
    };
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const frame = requestAnimationFrame(() => {
      getHashTarget(window.location.hash)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
};
