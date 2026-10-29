import { getContactDirections } from "../model/directions";
import type { Locale } from "@/shared/lib/i18n/locale";



type ContactsDirectionsProps = { locale?: Locale };

export const ContactsDirections = (props: ContactsDirectionsProps) => {
  const {
    locale = "ru",
  } = props;
  const isEnglish = locale === "en";
  const items = getContactDirections(locale);
  return (
  <section aria-labelledby="contacts-directions-title">
    <div className="mb-5">
      <p className="text-[12px] font-semibold text-site-green-text dark:text-site-green">{isEnglish ? "02 / DIRECTIONS" : "02 / НАПРАВЛЕНИЯ"}</p>
      <h2 id="contacts-directions-title" className="mt-2 font-heading text-[29px]! leading-[1.25]! font-semibold max-[680px]:text-[23px]!">
        {isEnglish ? "What we can discuss" : "Что можем обсудить"}
      </h2>
    </div>
    <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1 max-[680px]:gap-3">
      {items.map((direction) => (
        <article
          key={direction.number}
          className="min-w-0 rounded-[18px] bg-site-surface p-8 max-[680px]:p-6"
        >
          <span className="text-[11px] font-semibold text-site-green-text dark:text-site-green">
            {direction.number}
          </span>
          <h3 className="mt-3 font-heading text-[18px] leading-[1.3] font-semibold max-[680px]:text-[17px]">
            {direction.title}
          </h3>
          <p className="mt-3 text-[14px] leading-[1.4] text-site-subtle">
            {direction.description}
          </p>
        </article>
      ))}
    </div>
  </section>
  );
};
