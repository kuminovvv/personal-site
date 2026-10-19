import { StackIntro } from "./stack-intro";
import { StackPrimaryCard } from "./stack-primary-card";
import { StackCapabilityCard } from "./stack-capability-card";
import { StackProjectExample } from "./stack-project-example";
import { StackSectionHeading } from "./stack-section-heading";
import { StackActionBanner } from "./stack-action-banner";
import { stackContent } from "../model/stack-content";

export const StackPage = () => (
  <article className="pt-8 max-[680px]:pt-7" data-page="stack">
    <StackIntro />

    <section className="mt-8 grid grid-cols-2 gap-5 max-[900px]:grid-cols-1" aria-label="Основные технологии">
      {stackContent.primary.map((item) => (
        <StackPrimaryCard item={item} key={item.kind} />
      ))}
    </section>

    <section className="mt-8" aria-labelledby="stack-capabilities">
      <div id="stack-capabilities">
        <StackSectionHeading title="Инструменты под конкретные задачи" description="Без условных процентов владения" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
        {stackContent.capabilities.map((item) => (
          <StackCapabilityCard item={item} key={item.category} />
        ))}
      </div>
    </section>

    <section className="mt-8" aria-labelledby="stack-examples">
      <div id="stack-examples">
        <StackSectionHeading title="Где применяю" description="Не теория — реальные проекты" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1">
        {stackContent.examples.map((item) => (
          <StackProjectExample item={item} key={item.category} />
        ))}
      </div>
    </section>

    <div className="mt-8">
      <StackActionBanner />
    </div>
  </article>
);
