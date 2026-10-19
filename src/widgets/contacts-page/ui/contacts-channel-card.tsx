import { ArrowRight02StrokeRoundedIcon } from "@/shared/lib/icons";
import type { ContactChannel } from "../model/types";

type Props = {
  channel: ContactChannel;
  label: string;
  description: string;
  action: string;
};

export const ContactsChannelCard = (props: Props) => {
  const { channel, label, description, action } = props;

  return (
    <section className="flex min-w-0 flex-1 flex-col items-start gap-3 rounded-[26px] bg-site-surface px-8 py-7 max-[680px]:rounded-[22px] max-[680px]:p-6">
      <h3 className="font-sans! text-[12px]! font-semibold! tracking-normal! text-site-subtle">
        {label}
      </h3>
      <div className="min-w-0">
        <a
          className="block wrap-anywhere font-heading text-[clamp(18px,2vw,26px)] leading-[1.25] font-semibold text-site-text hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-text"
          href={channel.href}
          target={channel.external ? "_blank" : undefined}
          rel={channel.external ? "noopener noreferrer" : undefined}
        >
          {channel.title}
        </a>
        <p className="mt-2 text-[15px] leading-[1.4] text-site-subtle max-[680px]:text-[14px]">
          {description}
        </p>
      </div>
      <a
        className="mt-auto inline-flex min-h-7 items-center gap-1.5 text-[16px] font-semibold text-site-green-text hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-text dark:text-site-green"
        href={channel.href}
        target={channel.external ? "_blank" : undefined}
        rel={channel.external ? "noopener noreferrer" : undefined}
      >
        {action}
        <ArrowRight02StrokeRoundedIcon aria-hidden="true" size={18} />
      </a>
    </section>
  );
};
