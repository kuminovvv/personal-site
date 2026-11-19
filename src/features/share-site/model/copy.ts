import { createDictionary } from "@/shared/lib/i18n/dictionary";

export const getShareCopy = createDictionary("share", {
  ru: { copied: "Ссылка скопирована", error: "Не удалось скопировать", idle: "Поделиться сайтом" },
  en: { copied: "Link copied", error: "Could not copy", idle: "Share the site" },
});
