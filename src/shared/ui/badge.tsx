import type { ReactNode } from "react";
import { badgeVariants } from "./badge-variants";

type BadgeProps = {
  children: ReactNode;
  variant?: "section" | "tag" | "tagCompact" | "tagStrong";
};

export const Badge = (props: BadgeProps) => {
  const {
    children,
    variant = "tag",
  } = props;
  return <span className={badgeVariants[variant]}>{children}</span>;
};
