import type { ContactChannel } from "../model/types";
import { ContactsCallToAction } from "./contacts-call-to-action";
import { ContactsDirections } from "./contacts-directions";
import { ContactsHero } from "./contacts-hero";
import { ContactsMethods } from "./contacts-methods";

type Props = {
  channels: ContactChannel[];
};

export const ContactsPageContent = (props: Props) => {
  const { channels } = props;
  const telegram = channels.find((channel) => channel.kind === "TELEGRAM");
  const email = channels.find((channel) => channel.kind === "EMAIL");

  if (!telegram || !email) {
    throw new Error("Для страницы контактов необходимы ссылки Telegram и Email.");
  }

  return (
    <article className="mt-7 flex flex-col gap-7.5 max-[680px]:mt-6 max-[680px]:gap-5" data-page="contacts">
      <ContactsHero />
      <ContactsMethods telegram={telegram} email={email} />
      <ContactsDirections />
      <ContactsCallToAction telegramHref={telegram.href} />
    </article>
  );
};
