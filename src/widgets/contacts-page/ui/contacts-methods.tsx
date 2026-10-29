import type { Locale } from "@/shared/lib/i18n/locale";
import type { ContactChannel } from "../model/types";
import { DirectContactCard } from "./direct-contact-card";
import { ContactChannelList } from "./contact-channel-list";

type Props = {
  telegram: ContactChannel;
  email: ContactChannel;
  locale?: Locale;
};

export const ContactsMethods = (props: Props) => {
  const {
    telegram,
    email,
    locale = "ru",
  } = props;
  const isEnglish = locale === "en";

  return (
    <section
      className="grid min-w-0 grid-cols-[minmax(0,570px)_minmax(0,1fr)] gap-6 max-[900px]:grid-cols-1 max-[680px]:gap-4"
      aria-label={isEnglish ? "Ways to connect" : "Способы связи"}
    >
      <DirectContactCard isEnglish={isEnglish} />
      <ContactChannelList telegram={telegram} email={email} isEnglish={isEnglish} />
    </section>
  );
};
