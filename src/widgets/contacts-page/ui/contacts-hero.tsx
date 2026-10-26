import type { Locale } from "@/shared/lib/i18n/locale";

export const ContactsHero = ({ locale = "ru" }: { locale?: Locale }) => (
    <header
        className="flex flex-col items-start gap-4.5 rounded-site-32 bg-site-surface p-8 max-[680px]:gap-5 max-[680px]:rounded-[26px] max-[680px]:p-6">
        <div>
            <h1 className="font-heading text-[clamp(29px,4vw,54px)] leading-[1.15] font-bold tracking-[-0.025em]">
                {locale === "en" ? "Write to me." : "Напишите мне."}
                <span className="block">{locale === "en" ? "Let's discuss the task." : "Обсудим задачу."}</span>
            </h1>
        </div>
        <p className="max-w-292 text-[18px] leading-[1.45] text-site-subtle max-[680px]:text-[15px]">
            {locale === "en" ? "Work proposals, development and joint projects. Choose a convenient way to get in touch — no forms or extra steps." : "Рабочие предложения, разработка, совместные проекты. Выберите удобный способ связи — без форм и лишних шагов."}
        </p>
    </header>
);
