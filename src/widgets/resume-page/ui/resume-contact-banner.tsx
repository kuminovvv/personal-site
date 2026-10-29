import Link from "next/link";
import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons";
import type { Locale } from "@/shared/lib/i18n/locale";
import { getResumeUiCopy } from "../model/ui-copy";

type ResumeContactBannerProps = {
  telegramHref: string;
  email?: string;
  locale?: Locale;
};

export const ResumeContactBanner = (props: ResumeContactBannerProps) => {
  const {
    telegramHref,
    email,
    locale = "ru",
  } = props;
  const isEnglish = locale === "en";
  const copy = getResumeUiCopy(locale);

  return (
    <section className="mt-8 flex min-h-31 items-center justify-between gap-8 rounded-[26px] bg-site-contact-surface px-8 py-7 text-white max-[680px]:flex-col max-[680px]:items-start max-[680px]:gap-5 max-[680px]:p-6" aria-labelledby="resume-contact-title">
      <div>
        <h2 id="resume-contact-title" className="font-heading text-[21px] leading-[1.3] font-bold max-[680px]:text-[18px]">{copy.bannerTitle}</h2>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-site-contact-text">
          {copy.bannerLead}{email ? (isEnglish ? ` or at ${email}` : ` или на ${email}`) : ""}.
        </p>
      </div>
      <Link
        className="inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-full bg-site-green px-7 text-[14px] font-medium text-site-on-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        href={telegramHref}
        target={telegramHref.startsWith("https:") ? "_blank" : undefined}
        rel={telegramHref.startsWith("https:") ? "noopener noreferrer" : undefined}
      >
        {copy.bannerButton} <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={20} />
      </Link>
    </section>
  );
};
