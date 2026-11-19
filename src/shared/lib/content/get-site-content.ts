import "server-only";
import siteContent from "@/shared/config/site-content.json";
import englishContent from "@/shared/config/site-content.en.json";
import type { Locale } from "@/shared/lib/i18n/locale";
import { createDictionary } from "@/shared/lib/i18n/dictionary";

export type SiteContent = typeof siteContent;

const getContent = createDictionary<SiteContent>("site", { ru: siteContent, en: englishContent });

export const getSiteContent = async (locale: Locale = "ru"): Promise<SiteContent> => getContent(locale);
