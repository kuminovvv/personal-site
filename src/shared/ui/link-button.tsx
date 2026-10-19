import Link from "next/link";
import {
  ArrowRight02StrokeRoundedIcon,
  ArrowUpRight01StrokeRoundedIcon,
} from "@/shared/lib/icons";
import { cn } from "@/shared/lib/utils";

const tones = {
  green: "bg-site-green text-site-on-green hover:brightness-95",
  surface: "bg-site-surface text-site-text hover:bg-site-accent-soft dark:hover:text-site-text",
  soft: "bg-site-soft text-site-text",
} as const;

const sizes = {
  default: "min-h-13.25 px-8",
  hero: "min-h-14 px-8",
  header: "min-h-12.25 gap-1 px-5 font-normal hover:bg-site-sage",
  job: "min-h-12.25 min-w-37.5 px-5 font-normal max-[400px]:min-w-11 max-[400px]:px-3",
  next: "min-w-46.25 justify-between gap-3 self-start px-5 py-3.75 text-[14px] font-normal hover:bg-site-soft [&_svg]:size-5.5",
  footer: "h-10.5 min-w-40 gap-4 px-5 text-[13px] font-normal max-[580px]:min-w-0",
} as const;

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  tone?: "green" | "surface" | "soft";
  size?: "default" | "hero" | "header" | "job" | "next" | "footer";
  arrow?: "right" | "up-right";
  className?: string;
};

export const LinkButton = ({
  href,
  children,
  tone = "green",
  size = "default",
  arrow,
  className,
}: LinkButtonProps) => {
  const Icon = arrow === "up-right" ? ArrowUpRight01StrokeRoundedIcon : ArrowRight02StrokeRoundedIcon;

  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[16px] font-medium [&_svg]:shrink-0 [&_svg]:stroke-current",
        tones[tone],
        sizes[size],
        className,
      )}
      href={href}
    >
      {children}
      {arrow && <Icon aria-hidden="true" size={24} />}
    </Link>
  );
};
