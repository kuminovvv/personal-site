import type { Locale } from "@/shared/lib/i18n/locale";
import type { SiteContent } from "@/shared/lib/content/get-site-content";
import { CatalogSectionHeading } from "./catalog-section-heading";
import { CompanyHeading } from "./company-heading";
import { CompactCaseCard } from "./compact-case-card";

export const CatalogCases = (props: { content: SiteContent["catalog"]; locale: Locale }) => {
  const {
    content,
    locale,
  } = props;
  return <div className="mt-6.5 flex flex-col gap-12"><CatalogSectionHeading {...content.commercialHeading}/><div id="omsu"><CompanyHeading {...content.university}/><div className="mt-4 grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">{content.omsuCases.map((work) => <CompactCaseCard key={work.slug} work={work} locale={locale}/>)}</div></div><div><CompanyHeading {...content.company}/><div className="mt-4 grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1"><CompactCaseCard work={content.gazpromCase} locale={locale}/></div></div><CatalogSectionHeading {...content.personalHeading} className="mt-8"/><div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">{content.personalCases.map((work) => <CompactCaseCard work={work} locale={locale} key={work.slug}/>)}</div><CatalogSectionHeading {...content.technicalHeading} className="mt-8"/><div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">{content.technicalCases.map((work) => <CompactCaseCard work={work} locale={locale} key={work.slug}/>)}</div></div>;
};
