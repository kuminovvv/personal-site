export const linkButtonTones = {
  green: "bg-site-green text-site-on-green hover:brightness-95",
  surface: "bg-site-surface text-site-text hover:bg-site-accent-soft dark:hover:text-site-text",
  soft: "bg-site-soft text-site-text",
} as const;

export const linkButtonSizes = {
  default: "min-h-13.25 px-8",
  hero: "min-h-14 px-8",
  header: "min-h-12.25 gap-1 px-5 font-normal hover:bg-site-sage",
  job: "min-h-12.25 min-w-37.5 px-5 font-normal max-[400px]:min-w-11 max-[400px]:px-3",
  next: "min-w-46.25 justify-between gap-3 self-start px-5 py-3.75 text-[14px] font-normal hover:bg-site-soft [&_svg]:size-5.5",
  footer: "h-10.5 min-w-40 gap-4 px-5 text-[13px] font-normal max-[580px]:min-w-0",
} as const;
