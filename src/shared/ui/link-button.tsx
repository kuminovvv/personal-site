import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight02StrokeRoundedIcon,
  ArrowUpRight01StrokeRoundedIcon,
} from "@/shared/lib/icons";
import { cn } from "@/shared/lib/utils";
import { linkButtonSizes, linkButtonTones } from "./link-button-variants";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  tone?: "green" | "surface" | "soft";
  size?: "default" | "hero" | "header" | "job" | "next" | "footer";
  arrow?: "right" | "up-right";
  className?: string;
};

export const LinkButton = (props: LinkButtonProps) => {
  const {
    href,
    children,
    tone = "green",
    size = "default",
    arrow,
    className,
  } = props;
  const Icon = arrow === "up-right" ? ArrowUpRight01StrokeRoundedIcon : ArrowRight02StrokeRoundedIcon;

  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-[16px] font-medium [&_svg]:shrink-0 [&_svg]:stroke-current",
        linkButtonTones[tone],
        linkButtonSizes[size],
        className,
      )}
      href={href}
    >
      {children}
      {arrow && <Icon aria-hidden="true" size={24} />}
    </Link>
  );
};
