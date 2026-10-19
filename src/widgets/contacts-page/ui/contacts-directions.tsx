const directions = [
  {
    number: "01",
    title: "Frontend-разработка",
    description: "Сложные интерфейсы, SPA, React и TypeScript.",
  },
  {
    number: "02",
    title: "Архитектура и качество",
    description: "Структура приложения, производительность и развитие продукта.",
  },
  {
    number: "03",
    title: "Совместные",
    description: "Продуктовые идеи, инженерные задачи и сотрудничество.",
  },
] as const;

export const ContactsDirections = () => (
  <section aria-labelledby="contacts-directions-title">
    <div className="mb-5">
      <p className="text-[12px] font-semibold text-site-green-text dark:text-site-green">02 / НАПРАВЛЕНИЯ</p>
      <h2 id="contacts-directions-title" className="mt-2 font-heading text-[29px]! leading-[1.25]! font-semibold max-[680px]:text-[23px]!">
        Что можем обсудить
      </h2>
    </div>
    <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[680px]:grid-cols-1 max-[680px]:gap-3">
      {directions.map((direction) => (
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
