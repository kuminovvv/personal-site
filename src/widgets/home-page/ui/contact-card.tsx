import {
  ArrowRight02StrokeRoundedIcon,
  Mail02StrokeRoundedIcon,
  TelegramStrokeRoundedIcon,
} from "@/shared/lib/icons";

type ContactCardProps = {
  href: string;
  kind: "EMAIL" | "TELEGRAM";
  number: string;
  title: string;
  description: string;
  action: string;
  hasExternalTarget?: boolean;
};

export const ContactCard = (props: ContactCardProps) => {
  const {
    href,
    kind,
    number,
    title,
    description,
    action,
    hasExternalTarget = false,
  } = props;
  return ((
  <a
    className="flex min-w-0 flex-col items-start rounded-[30px] bg-site-surface p-10 max-[1180px]:p-8 max-[400px]:p-6"
    href={href}
    target={hasExternalTarget ? "_blank" : undefined}
    rel={hasExternalTarget ? "noopener noreferrer" : undefined}
  >
    <span className="flex w-full items-center justify-between text-[12px] text-site-subtle [&_i]:grid [&_i]:size-10.5 [&_i]:place-items-center [&_i]:rounded-full [&_i]:bg-site-soft [&_i]:not-italic">
      <b className="inline-flex items-center gap-2">
        {kind === "EMAIL" ? (
          <Mail02StrokeRoundedIcon aria-hidden="true" size={16} className="text-site-green-text dark:text-site-green" />
        ) : (
          <TelegramStrokeRoundedIcon aria-hidden="true" size={16} className="text-site-green-text dark:text-site-green" />
        )}
        {kind}
      </b>
      <i>{number}</i>
    </span>
    <h3 className="mt-7">{title}</h3>
    <p className="mt-3 leading-[1.6]">{description}</p>
    <strong className="mt-auto inline-flex items-center gap-2 pt-6 text-site-green-text dark:text-site-green">
      {action}
      <ArrowRight02StrokeRoundedIcon aria-hidden="true" size={18} />
    </strong>
  </a>
));
};
