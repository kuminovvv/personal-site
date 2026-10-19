import "server-only";
import siteContent from "@/shared/config/site-content.json";

export type SiteContent = typeof siteContent;

export const getSiteContent = async (): Promise<SiteContent> => siteContent;
