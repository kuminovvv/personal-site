import type { ContactChannel } from "../model/types";
import { ContactsChannelCard } from "./contacts-channel-card";
import type { Locale } from "@/shared/lib/i18n/locale";

type Props = {
  telegram: ContactChannel;
  email: ContactChannel;
  locale?: Locale;
};

export const ContactsMethods = (props: Props) => {
  const { telegram, email, locale = "ru" } = props;
  const en = locale === "en";

  return (
    <section
      className="grid min-w-0 grid-cols-[minmax(0,570px)_minmax(0,1fr)] gap-6 max-[900px]:grid-cols-1 max-[680px]:gap-4"
      aria-label={en ? "Ways to connect" : "Способы связи"}
    >
      <div className="flex min-w-0 flex-col items-start gap-4.25 rounded-[26px] bg-[#22272b] px-9.5 pt-9 pb-7.5 text-white dark:bg-[#1b2023] max-[680px]:rounded-[22px] max-[680px]:p-6">
        <span className="text-[12px] font-semibold text-[#35d775]">{en ? "01 / DIRECT CONTACT" : "01 / ПРЯМАЯ СВЯЗЬ"}</span>
        <h2 className="font-heading text-[33px]! leading-[1.22]! font-bold tracking-[-0.035em] max-[680px]:text-[27px]!">
          {en ? "Let's get" : "Давайте сразу"}
          <span className="block">{en ? "to the point." : "к сути."}</span>
        </h2>
        <p className="max-w-119 text-[16px] leading-[1.46] text-[#b5bbb7] max-[680px]:text-[14px]">
          {en ? "Briefly describe the task, context and desired result. We will discuss the details in writing." : "Коротко расскажите о задаче, контексте и желаемом результате. Детали обсудим в переписке."}
        </p>
        <div className="mt-auto flex items-center gap-5.5 pt-1 max-[400px]:gap-4">
          <span aria-hidden="true" className="grid size-28 shrink-0 place-items-center rounded-full bg-site-green font-heading text-[60px] font-black leading-none text-[#0d2315] max-[400px]:size-20 max-[400px]:text-[43px]">
            K.
          </span>
          <div className="min-w-0">
            <p className="font-heading text-[18px] leading-[1.3] font-semibold max-[400px]:text-[15px]">
              {en ? "Code. Structure." : "Код. Структура."}
              <span className="block">{en ? "Result." : "Результат."}</span>
            </p>
            <p className="mt-2 text-[14px] leading-[1.25] text-[#b5bbb7] max-[400px]:text-[12px]">
              {en ? "Interfaces, data, architecture." : "Интерфейсы, данные, архитектура."}
            </p>
          </div>
        </div>
      </div>
      <div className="grid min-w-0 grid-rows-2 gap-5 max-[680px]:gap-4">
        <ContactsChannelCard
          channel={telegram}
          label={en ? "TELEGRAM · QUICK CONTACT" : "TELEGRAM · БЫСТРАЯ СВЯЗЬ"}
          description={en ? "For quick questions and project discussions." : "Для коротких вопросов и обсуждения проекта."}
          action={en ? "Open Telegram" : "Открыть Telegram"}
        />
        <ContactsChannelCard
          channel={email}
          label={en ? "EMAIL · DETAILS" : "EMAIL · ПОДРОБНОСТИ"}
          description={en ? "For proposals, technical briefs and details." : "Для предложений, технических заданий и деталей."}
          action={en ? "Write an email" : "Написать письмо"}
        />
      </div>
    </section>
  );
};
