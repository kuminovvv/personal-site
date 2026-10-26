"use client";

import { useSyncExternalStore } from "react";
import { isMotionReduced, setMotionPreference, subscribeMotionPreference } from "@/shared/lib/motion/preference";
import { Switch } from "@/shared/ui/switch";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualExtraText } from "../model/locale-content";

const getServerSnapshot = (): boolean => true;

export const MotionPreferenceControl = ({ locale = "ru" }: { locale?: Locale }) => {
  const animationsEnabled = useSyncExternalStore(subscribeMotionPreference, () => !isMotionReduced(), getServerSnapshot);
  const copy = getVisualExtraText(locale);

  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full text-[12px] text-[#f7fff7]">
      <span>{copy.motion}</span>
      <Switch
        aria-label={copy.motionAria}
        checked={animationsEnabled}
        onCheckedChange={(checked) => setMotionPreference(checked ? "on" : "off")}
      />
    </label>
  );
};
