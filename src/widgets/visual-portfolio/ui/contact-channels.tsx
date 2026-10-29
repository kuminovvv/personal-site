import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons/arrow-up-right-01-stroke-rounded";
import type {ContactChannel} from "../model/contact-channels";

type ContactChannelsProps = { channels: readonly ContactChannel[] };

export const ContactChannels = (props: ContactChannelsProps) => {
  const {
    channels,
  } = props;
  return (
    <div data-motion="fade" data-motion-order="3" className="border-t border-site-switch-accent">
      {channels.map(({ label, description, href }) => (
        <a key={label} href={href} target={href.startsWith("https:") ? "_blank" : undefined} rel={href.startsWith("https:") ? "noopener noreferrer" : undefined} className="group flex min-h-[94px] items-center justify-between gap-5 border-b border-site-switch-accent py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-switch-accent-b)]">
          <span className="flex flex-col gap-[7px]"><span className="font-[family-name:var(--visual-heading-font-stack)] text-[31px] leading-[1.1] font-bold tracking-[-.0085em] text-site-switch-accent-c underline decoration-transparent decoration-1 underline-offset-6 transition-[text-decoration-color] duration-(--motion-quick) group-hover:decoration-[var(--site-switch-accent-b)] group-focus-visible:decoration-[var(--site-switch-accent-b)]">{label}</span><span className="font-[family-name:var(--font-visual-mono)] text-[11px] leading-[1.08] tracking-[.0025em] text-site-contact-text-d">{description}</span></span>
          <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={27} strokeWidth={1.8} className="shrink-0 text-site-switch-accent-b transition-transform duration-(--motion-hover) ease-(--motion-out) site-motion:group-hover:translate-x-0.5 site-motion:group-hover:-translate-y-0.5 site-motion:group-focus-visible:translate-x-0.5 site-motion:group-focus-visible:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
};
