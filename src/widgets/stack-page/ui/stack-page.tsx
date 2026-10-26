import { StackIntro } from "./stack-intro";
import { StackPrimaryCard } from "./stack-primary-card";
import { StackCapabilityCard } from "./stack-capability-card";
import { StackProjectExample } from "./stack-project-example";
import { StackSectionHeading } from "./stack-section-heading";
import { StackActionBanner } from "./stack-action-banner";
import { getStackContent } from "../model/stack-content";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getStackUiCopy } from "../model/ui-copy";

export const StackPage = ({ locale = "ru" }: { locale?: Locale }) => {
  const stackContent = getStackContent(locale);
  const copy = getStackUiCopy(locale);
  return (
  <article className="pt-8 max-[680px]:pt-7" data-page="stack">
    <StackIntro content={stackContent.intro} locale={locale} />

    <section className="mt-8 grid grid-cols-2 gap-5 max-[900px]:grid-cols-1" aria-label={copy.core}>
      {stackContent.primary.map((item) => (
        <StackPrimaryCard item={item} locale={locale} key={item.kind} />
      ))}
    </section>

    <section className="mt-8" aria-labelledby="stack-capabilities">
      <div id="stack-capabilities">
        <StackSectionHeading title={copy.tools} description={copy.toolsMeta} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
        {stackContent.capabilities.map((item) => (
          <StackCapabilityCard item={item} key={item.category} />
        ))}
      </div>
    </section>

    <section className="mt-8" aria-labelledby="stack-examples">
      <div id="stack-examples">
        <StackSectionHeading title={copy.where} description={copy.whereMeta} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
        {stackContent.examples.map((item) => (
          <StackProjectExample item={item} locale={locale} key={item.category} />
        ))}
      </div>
    </section>

    <div className="mt-8">
      <StackActionBanner content={stackContent.banner} locale={locale} />
    </div>
  </article>
  );
};
