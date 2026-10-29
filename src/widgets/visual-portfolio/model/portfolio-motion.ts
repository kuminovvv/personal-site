import type {RevealKind} from "@/shared/lib/motion/reveal";

export const REVEAL_KINDS: readonly RevealKind[] = [
  "heading",
  "line",
  "panel",
  "card",
  "diagram",
  "accent",
  "fade",
];

export const isRevealKind = (value: string | undefined): value is RevealKind =>
  value !== undefined && REVEAL_KINDS.some((kind) => kind === value);
