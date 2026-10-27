import type { CSSProperties } from "react";

export const motionTokens = {
  duration: { quick: 180, hover: 360, reveal: 620, hero: 840, projectsIntro: 1500, modal: 300, exit: 220 },
  delay: { hero: 100, line: 130, intro: 400 },
  stagger: { card: 65, detail: 90 },
  easing: { out: "cubic-bezier(0.22, 1, 0.36, 1)", standard: "cubic-bezier(0.2, 0.7, 0.2, 1)" },
  spring: { response: 0.14, precision: 0.02, maxFrame: 32 },
  gallery: { decay: 220, snapDistance: 64, velocityLimit: 2.5 },
} as const;

export const motionStyle = {
  "--motion-quick": `${motionTokens.duration.quick}ms`,
  "--motion-hover": `${motionTokens.duration.hover}ms`,
  "--motion-reveal": `${motionTokens.duration.reveal}ms`,
  "--motion-hero": `${motionTokens.duration.hero}ms`,
  "--motion-projects-intro": `${motionTokens.duration.projectsIntro}ms`,
  "--motion-hero-delay": `${motionTokens.delay.hero}ms`,
  "--motion-line-delay": `${motionTokens.delay.hero + motionTokens.delay.line}ms`,
  "--motion-intro-delay": `${motionTokens.delay.intro}ms`,
  "--motion-modal": `${motionTokens.duration.modal}ms`,
  "--motion-exit": `${motionTokens.duration.exit}ms`,
  "--motion-out": motionTokens.easing.out,
  "--motion-standard": motionTokens.easing.standard,
} as CSSProperties;
