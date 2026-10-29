import type { ContactChannel } from "../model/types";
import { ContactsChannelCard } from "./contacts-channel-card";

type ContactChannelListProps = { telegram: ContactChannel; email: ContactChannel; isEnglish: boolean };

export const ContactChannelList = (props: ContactChannelListProps) => {
  const {
    telegram,
    email,
    isEnglish,
  } = props;
  return <div className="grid min-w-0 grid-rows-2 gap-5 max-[680px]:gap-4"><ContactsChannelCard channel={telegram} label={isEnglish ? "TELEGRAM · QUICK CONTACT" : "TELEGRAM · БЫСТРАЯ СВЯЗЬ"} description={isEnglish ? "For quick questions and project discussions." : "Для коротких вопросов и обсуждения проекта."} action={isEnglish ? "Open Telegram" : "Открыть Telegram"} /><ContactsChannelCard channel={email} label={isEnglish ? "EMAIL · DETAILS" : "EMAIL · ПОДРОБНОСТИ"} description={isEnglish ? "For proposals, technical briefs and details." : "Для предложений, технических заданий и деталей."} action={isEnglish ? "Write an email" : "Написать письмо"} /></div>;
};
