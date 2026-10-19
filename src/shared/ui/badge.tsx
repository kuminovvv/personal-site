const variants = {
  section: "mb-4 inline-flex min-h-9.75 items-center rounded-full bg-site-surface px-6.5 text-[14px] font-medium text-site-text",
  tag: "min-w-18 rounded-full bg-site-soft px-3.5 py-2 text-center text-[12px] text-site-subtle",
  tagCompact: "min-w-0 rounded-full bg-site-soft px-3.5 py-2 text-center text-[12px] text-site-subtle",
  tagStrong: "min-w-18 rounded-full bg-site-soft px-3.5 py-2 text-center text-[12px] text-site-text",
} as const;

type BadgeProps = {
  children: React.ReactNode;
  variant?: "section" | "tag" | "tagCompact" | "tagStrong";
};

export const Badge = ({ children, variant = "tag" }: BadgeProps) => (
  <span className={variants[variant]}>{children}</span>
);
