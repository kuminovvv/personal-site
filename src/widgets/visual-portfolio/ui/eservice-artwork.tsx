import type { Locale } from "@/shared/lib/i18n/locale";
import {moduleColors, taskColors, taskTimes, getCopy} from "../model/eservice-artwork";
import { EserviceDashboard } from "./eservice-dashboard";


type EserviceArtworkProps = { locale?: Locale };

export const EserviceArtwork = (props: EserviceArtworkProps) => {
  const {
    locale = "ru",
  } = props;
  const copy = getCopy(locale);
  return (
    <div className="relative h-[455px] w-[364px] origin-top-left max-[520px]:scale-[.76]">
      <span className="absolute -left-[85px] top-[130px] font-[family-name:var(--font-visual-display)] text-[130px] leading-[1.05] font-extrabold tracking-[-5.46px] text-site-preview-text-g/80">
        SERVICE
      </span>
      <div className="absolute left-[20px] top-[186.18px] flex h-[217.803px] w-[331.722px] items-center justify-center">
        <div className="h-[186px] w-[314px] -rotate-6 rounded-[19px] bg-site-preview-surface transition-transform duration-[var(--motion-hover)] ease-[var(--motion-out)] [@media(pointer:fine)]:site-motion:group-hover:-translate-y-[6px] site-motion:group-focus-visible:-translate-y-[6px]" />
      </div>
      <div className="absolute left-[11.51px] top-[207px] flex h-[243.288px] w-[331.434px] items-center justify-center">
        <EserviceDashboard copy={copy} moduleColors={moduleColors} taskColors={taskColors} taskTimes={taskTimes} />
      </div>
    </div>
  );
};
