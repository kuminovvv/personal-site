import { LinkButton } from "@/shared/ui/link-button";

export const Banner = ({
  title,
  description,
  href,
  label,
}: {
  title: string;
  description: string;
  href: string;
  label: string;
}) => {
  return (
    <div className="mt-12 flex min-h-36 items-center justify-between gap-9 rounded-[25px] bg-site-surface p-10 text-site-text max-[900px]:p-8 max-[680px]:mt-9 max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-6 max-[680px]:p-6 [&_h3]:text-[23px] max-[680px]:[&_h3]:text-[19px] [&_p]:mt-3.5 [&_p]:text-[15px] [&_p]:leading-[1.6] [&_p]:text-site-subtle">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <LinkButton href={href} arrow="right">
        {label}
      </LinkButton>
    </div>
  );
};
