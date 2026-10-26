import type { SiteContent } from "@/shared/lib/content/get-site-content";
import {CatalogIntro} from "./catalog-intro";
import {CatalogSectionHeading} from "./catalog-section-heading";
import {CompanyHeading} from "./company-heading";
import {CompactCaseCard} from "./compact-case-card";
import type { Locale } from "@/shared/lib/i18n/locale";

export const ProjectsCatalog = ({ content, locale = "ru" }: { content: SiteContent["catalog"]; locale?: Locale }) => (
    <section className="pt-6.5 max-[680px]:pt-7" aria-label={locale === "en" ? "Project catalog" : "Каталог проектов"} data-page="projects">
        <CatalogIntro content={content.intro}/>
        <div className="mt-6.5 flex flex-col gap-12">
            <CatalogSectionHeading {...content.commercialHeading}/>
            <div id="omsu">
                <CompanyHeading
                    {...content.university}
                />
                <div className="mt-4 grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
                    {content.omsuCases.map((work) => <CompactCaseCard key={work.slug} work={work} locale={locale}/>)}
                </div>
            </div>

            <div>
                <CompanyHeading
                    {...content.company}
                />
                <div className="mt-4 grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
                    <CompactCaseCard work={content.gazpromCase} locale={locale}/>
                </div>
            </div>

            <CatalogSectionHeading {...content.personalHeading} className="mt-8"/>
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
                {content.personalCases.map((work) => <CompactCaseCard work={work} locale={locale} key={work.slug}/>)}
            </div>
            <CatalogSectionHeading {...content.technicalHeading} className="mt-8"/>
            <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
                {content.technicalCases.map((work) => <CompactCaseCard work={work} locale={locale} key={work.slug}/>)}
            </div>
        </div>
        <div
            className="mt-6.5 flex min-h-19 items-center justify-between gap-6 rounded-[20px] bg-[#22272b] px-5.75 py-2.75 text-white max-[680px]:flex-col max-[680px]:items-start">
            <div>
                <h2 className="font-heading text-[21px] leading-[1.2] font-bold tracking-[-0.04em] max-[680px]:text-[17px]">{content.closing.title}</h2>
                <p className="mt-1.75 text-[14px] text-[#b5bbb7]">{content.closing.description}</p>
            </div>
            <span className="text-[12px] font-semibold text-site-green-text dark:text-site-green">{content.closing.signature}</span>
        </div>
    </section>
);
