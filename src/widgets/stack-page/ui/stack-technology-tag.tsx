import { minWidths } from "../model/technology-widths";
import { cn } from "@/shared/lib/utils";



type StackTechnologyTagProps = { label: string };

export const StackTechnologyTag = (props: StackTechnologyTagProps) => {
  const {
    label,
  } = props;
  return (
  <span className={cn("inline-flex min-h-9.5 items-center justify-center rounded-full bg-site-soft px-3.5 text-[13px] leading-none text-site-subtle max-[680px]:min-w-0", minWidths[label])}>
    {label}
  </span>
  );
};
