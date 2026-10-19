import { cn } from "@/shared/lib/utils";

const minWidths: Record<string, string> = {
  React: "min-w-25",
  TypeScript: "min-w-35.5",
  "Next.js": "min-w-28",
  "Tailwind CSS": "min-w-40",
  "shadcn/ui": "min-w-36",
  Go: "min-w-17.75",
  PostgreSQL: "min-w-35.25",
  Redis: "min-w-24.75",
  RabbitMQ: "min-w-34.25",
  Docker: "min-w-26.75",
  "AG Grid": "min-w-29",
  "Canvas API": "min-w-36",
  Sass: "min-w-22.75",
  FSD: "min-w-29",
  "Redux Toolkit": "min-w-36",
  "REST API": "min-w-22.75",
};

export const StackTechnologyTag = ({ label }: { label: string }) => (
  <span className={cn("inline-flex min-h-9.5 items-center justify-center rounded-full bg-site-soft px-3.5 text-[13px] leading-none text-site-subtle max-[680px]:min-w-0", minWidths[label])}>
    {label}
  </span>
);
