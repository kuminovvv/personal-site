import Link from "next/link";
import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons";

export const InnerPageBreadcrumb = (props: { section: string }) => {
  const {
    section,
  } = props;
  return <div className="flex flex-wrap items-center justify-between gap-4"><span className="text-[12px] font-semibold tracking-[.04em] text-site-subtle">{section}</span><Link className="inline-flex items-center gap-1.5 text-[13px] text-site-text hover:text-site-green-text dark:hover:text-site-green [&_svg]:stroke-current" href="/">На главную <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={18} /></Link></div>;
};
