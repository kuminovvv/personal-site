import { useEffect, useRef, type MouseEvent } from "react";
import { motionTokens } from "@/shared/lib/motion/tokens";
import { isMotionReduced, subscribeMotionPreference } from "@/shared/lib/motion/preference";

type OrbitLayer = { element: SVGElement; depth: number };
type OrbitState = { x: number; y: number; targetX: number; targetY: number; time: number };

const isSvgElement = (element: Element | null): element is SVGElement => element?.namespaceURI === "http://www.w3.org/2000/svg";

const LAYER_DEPTHS: Record<string, number> = {
  Vector_4: 0.25,
  Vector_5: 0.4,
  Vector_6: 0.75,
  Vector_7: 0.55,
  Vector_8: 0.85,
  Vector_9: 0.2,
  Vector_10: 0.34,
  Vector_11: 0.5,
  Vector_12: 0.72,
  Vector_13: 0.65,
};

const getReducedMotion = isMotionReduced;

export const useOrbitInteraction = () => {
  const objectRef = useRef<HTMLObjectElement>(null);
  const layersRef = useRef<OrbitLayer[]>([]);
  const stateRef = useRef<OrbitState>({ x: 0, y: 0, targetX: 0, targetY: 0, time: 0 });
  const frameRef = useRef<number | null>(null);
  const isEnabledRef = useRef(false);

  const clearFrame = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  };

  const render = () => {
    frameRef.current = requestAnimationFrame((nextTime) => {
      const state = stateRef.current;
      const elapsed = Math.min(motionTokens.spring.maxFrame, Math.max(1, nextTime - state.time));
      state.time = nextTime;
      const easing = 1 - Math.exp(-elapsed / (motionTokens.spring.response * 1000));
      state.x += (state.targetX - state.x) * easing;
      state.y += (state.targetY - state.y) * easing;
      layersRef.current.forEach((layer) => {
        layer.element.style.translate = `${(state.x * layer.depth).toFixed(2)}px ${(state.y * layer.depth).toFixed(2)}px`;
      });
      const settled = Math.abs(state.targetX - state.x) < motionTokens.spring.precision && Math.abs(state.targetY - state.y) < motionTokens.spring.precision;
      if (settled) {
        state.x = state.targetX;
        state.y = state.targetY;
        layersRef.current.forEach((layer) => { layer.element.style.translate = `${state.x * layer.depth}px ${state.y * layer.depth}px`; });
        frameRef.current = null;
        return;
      }
      render();
    });
  };

  const reset = () => {
    stateRef.current.targetX = 0;
    stateRef.current.targetY = 0;
    if (isEnabledRef.current && !getReducedMotion()) {
      if (frameRef.current === null) {
        stateRef.current.time = performance.now();
        render();
      }
    } else {
      clearFrame();
      stateRef.current.x = 0;
      stateRef.current.y = 0;
      layersRef.current.forEach((layer) => { layer.element.style.translate = ""; });
    }
  };

  const onLoad = () => {
    const document = objectRef.current?.contentDocument;
    if (!document) return;
    layersRef.current = Object.entries(LAYER_DEPTHS).flatMap(([id, depth]) => {
      const element = document.getElementById(id);
      return isSvgElement(element) ? [{ element, depth }] : [];
    });
  };

  const onPointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isEnabledRef.current || getReducedMotion()) return;
    if (!layersRef.current.length) onLoad();
    const bounds = event.currentTarget.getBoundingClientRect();
    stateRef.current.targetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    stateRef.current.targetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
    if (frameRef.current === null) {
      stateRef.current.time = performance.now();
      render();
    }
  };

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");
    const updateEnabled = () => {
      isEnabledRef.current = query.matches && !isMotionReduced();
      if (!isEnabledRef.current) {
        stateRef.current.x = 0;
        stateRef.current.y = 0;
        stateRef.current.targetX = 0;
        stateRef.current.targetY = 0;
        if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        layersRef.current.forEach((layer) => { layer.element.style.translate = ""; });
      }
    };
    updateEnabled();
    query.addEventListener("change", updateEnabled);
    const unsubscribe = subscribeMotionPreference(updateEnabled);
    return () => {
      query.removeEventListener("change", updateEnabled);
      unsubscribe();
      clearFrame();
      layersRef.current.forEach((layer) => { layer.element.style.translate = ""; });
    };
  }, []);

  return { objectRef, onLoad, onPointerMove, onPointerLeave: reset };
};
