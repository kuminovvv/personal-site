import type { Locale } from "@/shared/lib/i18n/locale";
import type { VisualProject } from "./projects";

export type ProjectModalProps = {
  locale: Locale;
  project: VisualProject;
  isOpen: boolean;
  onCloseAction: () => void;
  onExitedAction: () => void;
};
