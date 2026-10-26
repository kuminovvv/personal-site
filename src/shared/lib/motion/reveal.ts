import { motionTokens } from "./tokens";

export type RevealKind = "heading" | "line" | "panel" | "card" | "diagram" | "accent" | "fade";

export const revealFrames = (kind: RevealKind): Keyframe[] => {
  if (kind === "heading" || kind === "line") return [
    { opacity: 0, transform: "translateY(.16em)", clipPath: "inset(0 -0.1em 100% -0.1em)" },
    { opacity: 1, transform: "translateY(0)", clipPath: "inset(-0.2em -0.1em -0.2em -0.1em)" },
  ];
  if (kind === "panel" || kind === "accent") return [
    { opacity: 0, transform: `scale(${kind === "accent" ? 0.96 : 0.985})` },
    { opacity: 1, transform: "scale(1)" },
  ];
  if (kind === "diagram") return [
    { opacity: 0, transform: "translateX(-10px)" },
    { opacity: 1, transform: "translateX(0)" },
  ];
  return [
    { opacity: 0, transform: `translateY(${kind === "fade" ? 0 : 18}px)` },
    { opacity: 1, transform: "translateY(0)" },
  ];
};

export const revealOptions = (element: HTMLElement): KeyframeAnimationOptions => {
  const order = Math.max(0, Math.min(4, Number(element.dataset.motionOrder) || 0));
  return {
    duration: motionTokens.duration.reveal,
    delay: Math.min(240, order * (element.dataset.motion === "card" ? motionTokens.stagger.card : motionTokens.stagger.detail)),
    easing: motionTokens.easing.out,
    fill: "backwards",
  };
};
