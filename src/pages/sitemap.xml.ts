import type { APIRoute } from "astro";
import { projectCases } from "@/shared/config/project-cases";

const SITE = "https://kuminovvv.com";

const paths = [
  "/",
  "/projects/",
  "/stack/",
  "/resume/",
  "/contacts/",
  ...projectCases.map((project) => `/projects/${project.slug}/`),
];

export const GET: APIRoute = () => {
  const urls = ["ru", "en"].flatMap((locale) =>
    paths.map(
      (path) =>
        `  <url><loc>${SITE}/${locale}${path === "/" ? "/" : path}</loc><changefreq>monthly</changefreq></url>`,
    ),
  );

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
};
