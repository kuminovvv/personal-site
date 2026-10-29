import type { Locale } from "@/shared/lib/i18n/locale";
import { LanguageSwitcher } from "@/shared/ui/language-switcher";
import type { ProjectDetail } from "../model/project-details";

type ProjectModalHeaderProps = { detail: ProjectDetail; locale: Locale };

export const ProjectModalHeader = (props: ProjectModalHeaderProps) => {
  const {
    detail,
    locale,
  } = props;
  return (
    <div className="sticky top-0 z-10 flex min-h-[45px] items-center justify-between gap-4 bg-white/95 py-2">
      <span className="font-[family-name:var(--font-visual-mono)] text-[13px] leading-[1.1] tracking-[.0182px] text-site-modal-surface max-[640px]:text-[10px]">{detail.eyebrow}</span>
      <div className="flex shrink-0 items-center gap-4 max-[640px]:gap-2">
        <LanguageSwitcher locale={locale} className="text-site-modal-text" />
      </div>
    </div>
  );
};
