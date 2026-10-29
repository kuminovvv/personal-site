type DirectContactFooterProps = { isEnglish: boolean };

export const DirectContactFooter = (props: DirectContactFooterProps) => {
  const {
    isEnglish,
  } = props;
  return <div className="mt-auto flex items-center gap-5.5 pt-1 max-[400px]:gap-4"><span aria-hidden="true" className="grid size-28 shrink-0 place-items-center rounded-full bg-site-green font-heading text-[60px] font-black leading-none text-site-contact-accent max-[400px]:size-20 max-[400px]:text-[43px]">K.</span><div className="min-w-0"><p className="font-heading text-[18px] leading-[1.3] font-semibold max-[400px]:text-[15px]">{isEnglish ? "Code. Structure." : "Код. Структура."}<span className="block">{isEnglish ? "Result." : "Результат."}</span></p><p className="mt-2 text-[14px] leading-[1.25] text-site-contact-text max-[400px]:text-[12px]">{isEnglish ? "Interfaces, data, architecture." : "Интерфейсы, данные, архитектура."}</p></div></div>;
};
