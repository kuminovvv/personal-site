import type { getStackContent } from "../model/stack-content";
import type { Locale } from "@/shared/lib/i18n/locale";

export const StackIntro = ({ content, locale = "ru" }: { content: ReturnType<typeof getStackContent>["intro"]; locale?: Locale }) => {
  const intro = content;

  return (
    <header className="grid grid-cols-[minmax(0,1fr)_278px] items-center gap-13 max-[900px]:grid-cols-[minmax(0,1fr)_240px] max-[680px]:grid-cols-1 max-[680px]:gap-5" aria-labelledby="stack-title">
      <div className="min-w-0">
        <p className="text-[12px] font-semibold leading-none text-site-green-text dark:text-site-green">{intro.eyebrow}</p>
        <h1 id="stack-title" className="mt-3 font-heading text-[clamp(25px,2.1vw,35px)] leading-[1.12] font-bold tracking-[-0.05em] max-[680px]:text-[clamp(24px,6.3vw,34px)]">
          {intro.title}
        </h1>
        <p className="mt-3 text-[17px] leading-[1.45] text-site-subtle max-[680px]:text-[16px]">{intro.description}</p>
      </div>
      <aside className="flex min-h-28.5 flex-col justify-center gap-2 rounded-[18px] bg-site-surface px-5 py-4 max-[680px]:min-h-0" aria-label={locale === "en" ? "Core specialization" : "Основная специализация"}>
        <p className="text-[11px] font-semibold text-site-green-text dark:text-site-green">{intro.focusLabel}</p>
        <p className="font-heading text-[20px] leading-[1.25] font-bold">{intro.focus}</p>
        <p className="text-[13px] text-site-subtle">{intro.focusDescription}</p>
      </aside>
    </header>
  );
};
