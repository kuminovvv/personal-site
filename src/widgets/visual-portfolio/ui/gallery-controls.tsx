import { ArrowRight02StrokeRoundedIcon } from "@/shared/lib/icons/arrow-right-02-stroke-rounded";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualExtraText } from "../model/locale-content";

type GalleryControlsProps = {
  locale?: Locale;
  activeIndex: number;
  itemCount: number;
  atStart: boolean;
  atEnd: boolean;
  onPreviousAction: () => void;
  onNextAction: () => void;
};

export const GalleryControls = ({ locale = "ru", activeIndex, itemCount, atStart, atEnd, onPreviousAction, onNextAction }: GalleryControlsProps) => (
  <div className="mt-5 flex items-center justify-between gap-4 px-(--gallery-inset)" aria-label={getVisualExtraText(locale).galleryControls}>
    <span className="font-[family-name:var(--font-visual-mono)] text-[11px] leading-none tracking-[.08em] text-[#686d69]" aria-live="polite">
      {String(activeIndex + 1).padStart(2, "0")} / {String(itemCount).padStart(2, "0")}
    </span>
    <div className="flex gap-2">
      <button type="button" onClick={onPreviousAction} disabled={atStart} aria-label={getVisualExtraText(locale).galleryPrevious} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe3df] text-[#1a2e22] transition-[opacity,background-color] duration-[var(--motion-quick)] ease-[var(--motion-out)] hover:bg-[#f3f5f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2e22] disabled:pointer-events-none disabled:opacity-30"><ArrowRight02StrokeRoundedIcon aria-hidden="true" size={17} className="rotate-180" /></button>
      <button type="button" onClick={onNextAction} disabled={atEnd} aria-label={getVisualExtraText(locale).galleryNext} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe3df] text-[#1a2e22] transition-[opacity,background-color] duration-[var(--motion-quick)] ease-(--motion-out) hover:bg-[#f3f5f3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2e22] disabled:pointer-events-none disabled:opacity-30"><ArrowRight02StrokeRoundedIcon aria-hidden="true" size={17} /></button>
    </div>
  </div>
);
