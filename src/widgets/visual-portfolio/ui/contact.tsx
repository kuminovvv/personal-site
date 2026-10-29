import type { Locale } from "@/shared/lib/i18n/locale";
import { getVisualText } from "../model/locale-content";
import { ContactChannels } from "./contact-channels";
import { ContactFooter } from "./contact-footer";
import { ContactLead } from "./contact-lead";
import {CONTACT_CHANNELS} from "../model/contact-channels";

type ContactProps = { locale?: Locale };

export const Contact = (props: ContactProps) => {
  const {
    locale = "ru",
  } = props;
  const copy = getVisualText(locale);
  return (
  <section
    id="contact"
    aria-labelledby="visual-contact-title"
    className="relative left-1/2 w-[calc(100%+2*var(--visual-page-inset))] -translate-x-1/2 bg-site-switch-border text-site-switch-accent-c min-[1600px]:min-h-[1292px]"
  >
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-[70px] px-6 pt-[97px] pb-[65px] sm:px-10 2xl:px-0 max-[768px]:gap-12 max-[768px]:pt-16 max-[768px]:pb-9">
      <span className="font-[family-name:var(--font-visual-mono)] text-[14px] leading-none tracking-[.0065em] text-site-contact-text-b">
        {copy.contactLabel}
      </span>

      <h2
        id="visual-contact-title"
        className="flex flex-col font-[family-name:var(--visual-heading-font-stack)]! leading-[.95]! font-semibold max-[768px]:gap-1"
      >
        <span data-motion="line" className="text-[clamp(48px,8.54vw,164px)] tracking-[-.051em] text-white">
          {copy.contactTitle[0]}
        </span>
        <span data-motion="line" data-motion-order="1" className="-mt-[13px] text-[clamp(40px,7.71vw,148px)] tracking-[-.045em] text-site-switch-accent-b max-[768px]:mt-0">
          {copy.contactTitle[1]}
        </span>
      </h2>

      <div className="grid grid-cols-[minmax(0,858px)_minmax(0,554px)] items-start gap-[108px] max-[1100px]:grid-cols-1 max-[1100px]:gap-12">
        <ContactLead copy={copy} locale={locale} />
        <ContactChannels channels={CONTACT_CHANNELS} />
      </div>

      <div className="border-t border-site-switch-accent pt-[38px]">
        <p data-motion="heading" className="font-[family-name:var(--visual-heading-font-stack)] text-[clamp(48px,11.3vw,217px)] leading-[.97] font-semibold tracking-[-.056em] text-site-switch-accent-b">
          kuminovvv
        </p>
      </div>

      <ContactFooter copy={copy} locale={locale} />
    </div>
  </section>
  );
};
