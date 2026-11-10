import { useSyncExternalStore } from "react";
import { isMotionReduced, setMotionPreference, subscribeMotionPreference } from "@/shared/lib/motion/preference";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualExtraText } from "../model/locale-content";

import {getMotionServerSnapshot} from "../model/snapshots";

type MotionPreferenceControlProps = { locale?: Locale };

export const MotionPreferenceControl = (props: MotionPreferenceControlProps) => {
  const {
    locale = "ru",
  } = props;
  const animationsEnabled = useSyncExternalStore(subscribeMotionPreference, () => !isMotionReduced(), getMotionServerSnapshot);
  const copy = getVisualExtraText(locale);

  return (
    <label className="inline-flex min-h-11 cursor-pointer items-center gap-3 rounded-full text-[12px] text-site-switch-accent-c">
      <span>{copy.motion}</span>
      <button
        aria-checked={animationsEnabled}
        aria-label={copy.motionAria}
        className="group/switch relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-site-switch-accent outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-site-switch-accent-b focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-switch-border)]"
        onClick={() => setMotionPreference(animationsEnabled ? "off" : "on")}
        role="switch"
        type="button"
      >
        <span
          className={`pointer-events-none block size-5 rounded-full bg-site-switch-accent-c shadow-sm transition-transform duration-200 ${
            animationsEnabled
              ? "translate-x-[21px] bg-site-switch-border"
              : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
};
