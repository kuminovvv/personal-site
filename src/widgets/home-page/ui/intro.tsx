import type { ReactNode } from "react";
import { Badge } from "@/shared/ui/badge";
import { formatSectionNumber, type SiteSection } from "@/shared/config/site-sections";

export const Intro = (props: {
  section: SiteSection;
  title: string;
  description: string;
  aside?: ReactNode;
}) => {
  const {
    section,
    title,
    description,
    aside,
  } = props;

  return (
    <div className="mb-14 flex scroll-mt-7.5 items-start justify-between gap-10 max-[900px]:mb-11 max-[680px]:mb-9 max-[680px]:block [&_p]:mt-5 [&_p]:max-w-200 [&_p]:text-[17px] [&_p]:leading-[1.6] [&_p]:text-site-subtle max-[680px]:[&_p]:mt-4 max-[680px]:[&_h2]:text-[clamp(27px,7vw,38px)]" id={section}>
      <div>
        <Badge variant="section">{formatSectionNumber(section)}</Badge>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {aside}
    </div>
  );
};
