import type { SiteContent } from "@/shared/lib/content/get-site-content";
import type { Locale } from "@/shared/lib/i18n/locale";
import { CatalogIntro } from "./catalog-intro";
import { CatalogCases } from "./catalog-cases";

type ProjectsCatalogProps = { content: SiteContent["catalog"]; locale?: Locale };

export const ProjectsCatalog = (props: ProjectsCatalogProps) => {
  const {
    content,
    locale = "ru",
  } = props;
  return <section className="pt-6.5 max-[680px]:pt-7" aria-label={locale === "en" ? "Project catalog" : "Каталог проектов"} data-page="projects"><CatalogIntro content={content.intro}/><CatalogCases content={content} locale={locale}/><div className="mt-6.5 flex min-h-19 items-center justify-between gap-6 rounded-[20px] bg-site-contact-surface px-5.75 py-2.75 text-white max-[680px]:flex-col max-[680px]:items-start"><div><h2 className="font-heading text-[21px] leading-[1.2] font-bold tracking-[-0.04em] max-[680px]:text-[17px]">{content.closing.title}</h2><p className="mt-1.75 text-[14px] text-site-contact-text">{content.closing.description}</p></div><span className="text-[12px] font-semibold text-site-green-text dark:text-site-green">{content.closing.signature}</span></div></section>;
};
