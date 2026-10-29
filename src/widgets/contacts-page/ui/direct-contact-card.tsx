type DirectContactCardProps = { isEnglish: boolean };

export const DirectContactCard = (props: DirectContactCardProps) => {
  const {
    isEnglish,
  } = props;
  return <div className="flex min-w-0 flex-col items-start gap-4.25 rounded-[26px] bg-site-contact-surface px-9.5 pt-9 pb-7.5 text-white dark:bg-site-contact-surface-b max-[680px]:rounded-[22px] max-[680px]:p-6"><span className="text-[12px] font-semibold text-site-contact-surface-c">{isEnglish ? "01 / DIRECT CONTACT" : "01 / ПРЯМАЯ СВЯЗЬ"}</span><h2 className="font-heading text-[33px]! leading-[1.22]! font-bold tracking-[-0.035em] max-[680px]:text-[27px]!"><>{isEnglish ? "Let's get" : "Давайте сразу"}<span className="block">{isEnglish ? "to the point." : "к сути."}</span></></h2><p className="max-w-119 text-[16px] leading-[1.46] text-site-contact-text max-[680px]:text-[14px]">{isEnglish ? "Briefly describe the task, context and desired result. We will discuss the details in writing." : "Коротко расскажите о задаче, контексте и желаемом результате. Детали обсудим в переписке."}</p><DirectContactFooter isEnglish={isEnglish} /></div>;
};
import { DirectContactFooter } from "./direct-contact-footer";
