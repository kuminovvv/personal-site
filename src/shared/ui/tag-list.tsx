import { cn } from "@/shared/lib/utils";
import { Badge } from "./badge";

type TagListProps = {
  tags: readonly string[];
  variant?: "tag" | "tagCompact" | "tagStrong";
  className?: string;
};

export const TagList = (props: TagListProps) => {
  const {
    tags,
    variant = "tag",
    className,
  } = props;
  return (
  <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
    {tags.map((tag) => (
      <Badge key={tag} variant={variant}>{tag}</Badge>
    ))}
  </div>
  );
};
