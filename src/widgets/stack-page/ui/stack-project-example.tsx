import Link from "next/link";
import { localizeHref, type Locale } from "@/shared/lib/i18n/locale";
import type { stackContent } from "../model/stack-content";

type Props = {
  item: (typeof stackContent.examples)[number];
  locale?: Locale;
};

export const StackProjectExample = (props: Props) => {
  const {
    item,
    locale = "ru",
  } = props;
  const content = (
    <>
      <p className="text-[10px] leading-none font-semibold text-site-green-text dark:text-site-green">{item.category}</p>
      <h3 className="mt-3 text-[16px] leading-[1.15] font-semibold">{item.title}</h3>
      <p className="mt-2 text-[12px] leading-[1.35] text-site-subtle">{item.description}</p>
      <p className="mt-2 text-[11px] leading-[1.4] font-medium text-site-subtle">{item.technologies}</p>
    </>
  );

  const classes = "block min-h-37.75 min-w-0 rounded-[17px] bg-site-surface px-5.25 py-5 text-site-text max-[680px]:min-h-0";

  return item.href ? (
    <Link href={localizeHref(item.href, locale)} className={classes} aria-label={`${locale === "en" ? "Details" : "Подробнее"}: ${item.title}`}>
      {content}
    </Link>
  ) : (
    <article className={classes}>{content}</article>
  );
};
