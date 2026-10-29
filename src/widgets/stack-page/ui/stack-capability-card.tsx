import { StackTechnologyTag } from "./stack-technology-tag";
import type { stackContent } from "../model/stack-content";

type Props = {
  item: (typeof stackContent.capabilities)[number];
};

export const StackCapabilityCard = (props: Props) => {
  const {
    item,
  } = props;
  return (
  <article className="flex min-h-63.75 min-w-0 flex-col rounded-[19px] bg-site-surface p-8 max-[900px]:p-6 max-[680px]:min-h-0 max-[680px]:p-6">
    <p className="text-[11px] leading-none font-semibold text-site-green-text dark:text-site-green">{item.category}</p>
    <h3 className="mt-7 font-heading text-[20px] leading-[1.2] font-bold tracking-[-0.035em]">{item.title}</h3>
    <p className="mt-5 text-[14px] leading-[1.5] text-site-subtle">{item.description}</p>
    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
      {item.technologies.map((tech) => (
        <StackTechnologyTag label={tech} key={tech} />
      ))}
    </div>
  </article>
  );
};
