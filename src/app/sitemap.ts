import type { MetadataRoute } from "next";
import { projectCases } from "@/shared/config/project-cases";
import { localizeHref } from "@/shared/lib/i18n/locale";

export const dynamic = "force-static";

const sitemap = (): MetadataRoute.Sitemap => {
  const origin = "https://kuminovvv.com";
  const paths = ["/", "/projects/", "/stack/", "/resume/", "/contacts/", ...projectCases.map(({ slug }) => `/projects/${slug}/`)];
  return paths.flatMap((path) => (["ru", "en"] as const).map((locale) => ({
    url: origin + localizeHref(path, locale),
    alternates: { languages: { ru: origin + path, en: origin + localizeHref(path, "en") } },
  })));
};

export default sitemap;
