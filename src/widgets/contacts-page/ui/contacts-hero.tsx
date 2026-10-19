export const ContactsHero = () => (
    <header
        className="flex flex-col items-start gap-4.5 rounded-site-32 bg-site-surface p-8 max-[680px]:gap-5 max-[680px]:rounded-[26px] max-[680px]:p-6">
        <div>
            <h1 className="font-heading text-[clamp(29px,4vw,54px)] leading-[1.15] font-bold tracking-[-0.025em]">
                Напишите мне.
                <span className="block">Обсудим задачу.</span>
            </h1>
        </div>
        <p className="max-w-292 text-[18px] leading-[1.45] text-site-subtle max-[680px]:text-[15px]">
            Рабочие предложения, разработка, совместные проекты. Выберите удобный способ связи — без форм и лишних
            шагов.
        </p>
    </header>
);
