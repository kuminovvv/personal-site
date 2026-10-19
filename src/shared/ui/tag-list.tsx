import { Badge } from "./badge";
import { cn } from "@/shared/lib/utils";

type TagListProps = {
  tags: readonly string[];
  variant?: "tag" | "tagCompact" | "tagStrong";
  className?: string;
};

export const TagList = ({ tags, variant = "tag", className }: TagListProps) => (
  <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
    {tags.map((tag) => (
      <Badge key={tag} variant={variant}>{tag}</Badge>
    ))}
  </div>
);
