import Link from "next/link";
import { ArrowUpRight01StrokeRoundedIcon } from "@/shared/lib/icons";

type ResumeHeroProps = { telegramHref: string };

export const ResumeHero = (props: ResumeHeroProps) => {
  const { telegramHref } = props;

  return (
    <header className="grid grid-cols-[minmax(0,1fr)_389px] items-center gap-13 max-[900px]:grid-cols-[minmax(0,1fr)_300px] max-[900px]:gap-6 max-[680px]:grid-cols-1 max-[680px]:gap-6">
      <div className="min-w-0">
        <span className="inline-flex min-h-9 items-center rounded-full bg-site-surface px-6 text-[12px] font-medium text-site-text">
          ОПЫТ / РАЗРАБОТКА
        </span>
        <h1 className="mt-5 font-heading text-[clamp(30px,3.25vw,47px)] leading-[1.2] font-bold tracking-[-0.045em] max-[680px]:text-[clamp(28px,7vw,40px)]">
          Frontend-разработчик.
        </h1>
        <p className="mt-2.5 text-[19px] leading-[1.5] font-medium max-[680px]:text-[16px]">
          Создаю интерфейсы, работаю с архитектурой и сложными данными.
        </p>
        <p className="mt-3.5 max-w-205 text-[15px] leading-[1.5] text-site-subtle max-[680px]:text-[14px]">
          6+ лет коммерческого опыта. React, TypeScript, корпоративные SPA и разработка собственных сервисов.
        </p>
      </div>
      <aside className="flex min-w-0 flex-col rounded-[20px] bg-site-surface p-8 max-[900px]:p-6 max-[680px]:p-6" aria-label="Связаться со мной">
        <span className="text-[11px] font-semibold text-site-green-text dark:text-site-green">ОТКРЫТ К ДИАЛОГУ</span>
        <strong className="mt-2 font-heading text-[23px] leading-tight font-bold">Илья Куминов</strong>
        <span className="mt-2.5 text-[13px] text-site-subtle">Frontend / React</span>
        <Link
          href={telegramHref}
          target={telegramHref.startsWith("https:") ? "_blank" : undefined}
          rel={telegramHref.startsWith("https:") ? "noopener noreferrer" : undefined}
          className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-site-green px-4 text-center text-[14px] font-medium text-site-on-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-site-text"
        >
          Связаться в Telegram
          <ArrowUpRight01StrokeRoundedIcon aria-hidden="true" size={20} />
        </Link>
      </aside>
    </header>
  );
};
