import type { ContactChannel } from "../model/types";
import { ContactsChannelCard } from "./contacts-channel-card";

type Props = {
  telegram: ContactChannel;
  email: ContactChannel;
};

export const ContactsMethods = (props: Props) => {
  const { telegram, email } = props;

  return (
    <section
      className="grid min-w-0 grid-cols-[minmax(0,570px)_minmax(0,1fr)] gap-6 max-[900px]:grid-cols-1 max-[680px]:gap-4"
      aria-label="Способы связи"
    >
      <div className="flex min-w-0 flex-col items-start gap-4.25 rounded-[26px] bg-[#22272b] px-9.5 pt-9 pb-7.5 text-white dark:bg-[#1b2023] max-[680px]:rounded-[22px] max-[680px]:p-6">
        <span className="text-[12px] font-semibold text-[#35d775]">01 / ПРЯМАЯ СВЯЗЬ</span>
        <h2 className="font-heading text-[33px]! leading-[1.22]! font-bold tracking-[-0.035em] max-[680px]:text-[27px]!">
          Давайте сразу
          <span className="block">к сути.</span>
        </h2>
        <p className="max-w-119 text-[16px] leading-[1.46] text-[#b5bbb7] max-[680px]:text-[14px]">
          Коротко расскажите о задаче, контексте и желаемом результате. Детали обсудим в переписке.
        </p>
        <div className="mt-auto flex items-center gap-5.5 pt-1 max-[400px]:gap-4">
          <span aria-hidden="true" className="grid size-28 shrink-0 place-items-center rounded-full bg-site-green font-heading text-[60px] font-black leading-none text-[#0d2315] max-[400px]:size-20 max-[400px]:text-[43px]">
            K.
          </span>
          <div className="min-w-0">
            <p className="font-heading text-[18px] leading-[1.3] font-semibold max-[400px]:text-[15px]">
              Код. Структура.
              <span className="block">Результат.</span>
            </p>
            <p className="mt-2 text-[14px] leading-[1.25] text-[#b5bbb7] max-[400px]:text-[12px]">
              Интерфейсы, данные, архитектура.
            </p>
          </div>
        </div>
      </div>
      <div className="grid min-w-0 grid-rows-2 gap-5 max-[680px]:gap-4">
        <ContactsChannelCard
          channel={telegram}
          label="TELEGRAM · БЫСТРАЯ СВЯЗЬ"
          description="Для коротких вопросов и обсуждения проекта."
          action="Открыть Telegram"
        />
        <ContactsChannelCard
          channel={email}
          label="EMAIL · ПОДРОБНОСТИ"
          description="Для предложений, технических заданий и деталей."
          action="Написать письмо"
        />
      </div>
    </section>
  );
};
