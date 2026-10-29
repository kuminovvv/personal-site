import type { ReactNode } from "react";
import { TagList } from "@/shared/ui/tag-list";

type StackCardProps = {
  label: string;
  title: string;
  tags: readonly string[];
  indicator?: ReactNode;
  children: ReactNode;
};

export const StackCard = (props: StackCardProps) => {
  const {
    label,
    title,
    tags,
    indicator,
    children,
  } = props;
  return ((
  <article className="min-w-0 rounded-[28px] bg-site-surface p-9 max-[1180px]:p-7 max-[900px]:p-8 max-[680px]:p-7 [&_h3]:my-7 [&_h3]:mb-4 [&_h3]:text-[21px] [&>div:last-child]:mt-6">
    <span className="flex items-center gap-1.75 text-[11px] text-site-subtle [&_i]:size-1.75 [&_i]:rounded-full [&_i]:bg-site-green">
      {indicator ?? <i />}
      {label}
    </span>
    <h3>{title}</h3>
    {children}
    <TagList className="min-w-0" tags={tags} variant="tagCompact" />
  </article>
));
};
