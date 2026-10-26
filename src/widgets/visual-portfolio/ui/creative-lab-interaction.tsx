"use client";

import { useOrbitInteraction } from "../model/use-orbit-interaction";
import Image from "next/image";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualExtraText } from "../model/locale-content";

export const CreativeLabInteraction = ({ locale = "ru" }: { locale?: Locale }) => {
  const { objectRef, onLoad, onPointerMove, onPointerLeave } = useOrbitInteraction();
  const alt = getVisualExtraText(locale).labImage;

  return (
    <div className="relative flex h-[536px] min-h-0 items-center justify-center overflow-hidden max-[1050px]:h-auto max-[1050px]:min-h-[420px] max-[640px]:min-h-[280px]">
      <object ref={objectRef} type="image/svg+xml" data="/design/visual-portfolio/lab-orbit.svg" role="img" tabIndex={-1} aria-label={alt} onLoad={onLoad} className="block aspect-[788/555.237] h-auto w-full max-w-[788px]">
        <Image src="/design/visual-portfolio/lab-orbit.svg" width={788} height={555} alt={alt} />
      </object>
      <div aria-hidden="true" className="absolute inset-0 z-10" onMouseMove={onPointerMove} onMouseLeave={onPointerLeave} />
    </div>
  );
};
