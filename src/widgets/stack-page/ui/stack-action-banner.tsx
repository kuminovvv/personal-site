import { LinkButton } from "@/shared/ui/link-button";
import { localizeHref, type Locale } from "@/shared/lib/i18n/locale";
import type { getStackContent } from "../model/stack-content";
import { getStackUiCopy } from "../model/ui-copy";

type StackActionBannerProps = { content: ReturnType<typeof getStackContent>["banner"]; locale?: Locale };

export const StackActionBanner = (props: StackActionBannerProps) => {
  const {
    content,
    locale = "ru",
  } = props;
  const banner = content;
  const copy = getStackUiCopy(locale);

  return (
    <section className="flex min-h-30.75 flex-wrap items-center justify-between gap-6 rounded-site-32 bg-site-contact-surface p-8 text-white max-[680px]:p-6" aria-label={copy.projectsAria}>
      <div className="min-w-0">
        <h2 className="font-heading text-[19px] leading-[1.2] font-bold">{banner.title}</h2>
        <p className="mt-2 text-[13px] text-site-contact-text">{banner.description}</p>
      </div>
      <LinkButton href={localizeHref(banner.href, locale)} size="default" arrow="right" className="min-h-12.25 px-6 text-[13px]">
        {banner.label}
      </LinkButton>
    </section>
  );
};
