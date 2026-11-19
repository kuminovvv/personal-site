# Правила Personal Site (Astro 2.0)

`AGENTS.md` — точка входа. Актуальный стек и структура описаны в [README.md](README.md). Документы в `docs/` частично перенесены из Next.js-версии и носят исторический характер; при конфликте приоритет у этого файла и README.

## Стек

- **Astro 7**, `output: "static"`, маршруты в `src/pages`.
- **Tailwind CSS 4** + семантические токены `site-*` в `src/styles/`.
- **React 19** только для интерактивных островов. Статические секции — обычный HTML/React-разметка без гидратации.
- **Vanilla JS** для темы, меню и language persistence.

## Инварианты

1. **Не гидрируйте статику.** `client:*` допустим только для реально интерактивных блоков: галерея, модалка, orbit-эффект, motion switch. Новые статические секции не должны становиться островами.
2. **Не импортируйте `next/*`.** Для ссылок и изображений есть `@/compat/link` и `@/compat/image`.
3. **Контент — в данных.** Тексты, кейсы и переводы живут в `src/shared/config` и `src/widgets/*/model`, а не в JSX/Astro-разметке.
4. **Один React-компонент на `.tsx`**, типы — в отдельных `.ts`. Для Astro-компонентов — один компонент на файл.
5. **Максимум 250 строк** в исходном `.ts`, `.tsx`, `.astro`, `.css`, `.md`.
6. **Стили** — Tailwind-классы и `site-*` токены. Не создавайте CSS Modules и отдельные CSS-файлы компонентов.
7. **Изображения** — через `@/compat/image`; SVG для визуальной главной, растровые — в `public/design`.
8. **Шрифты** — только из `public/fonts` и `src/styles/fonts.css`. Не подключайте Google Fonts по URL.
9. **Доступность**: сохраняйте `aria-*`, `alt`, `aria-hidden` для декоративных элементов, focus trap и Escape в модалке.
10. **RU/EN**: новые тексты добавляйте в оба словаря; не оставляйте русские строки в английских маршрутах.

## Команды

```powershell
pnpm check
pnpm run build
pnpm run test:integrity
pnpm run test:responsive
pnpm run test:smoke
```

## Структура

- `src/pages` — маршруты и локали.
- `src/layouts` — общий layout, тема, меню.
- `src/components` — visual home, header, footer, language switcher.
- `src/compat` — `Link` и `Image`.
- `src/widgets/visual-portfolio` — новая визуальная главная и её интерактив.
- `src/widgets/projects-catalog`, `stack-page`, `resume-page`, `contacts-page` — внутренние страницы.
- `src/shared` — конфиг, i18n, иконки, UI.
- `src/styles` — Tailwind, visual tokens, шрифты.
- `public` — изображения, шрифты, robots, OG.
