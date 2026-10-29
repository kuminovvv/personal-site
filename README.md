# Personal Site — Frontend

Статический персональный сайт на Next.js 16, React 19, Tailwind CSS 4, shadcn/ui и Hugeicons. Пять страниц (`/`, `/projects`, `/stack`, `/resume`, `/contacts`) формируются во время сборки, без API и базы данных.

## Локальная разработка

```powershell
pnpm install
pnpm dev
```

Никакие переменные окружения, Go API и PostgreSQL не требуются. Для предварительного просмотра изменений используйте `pnpm dev`.

## Контент и изображения

- `src/shared/config/site-content.json` — основной источник текста, ссылок, каталога кейсов, внутренних страниц и стека. `src/widgets/stack-page/model/stack-content.ts` лишь импортирует данные оттуда.
- `src/widgets/visual-portfolio/` — композиция и секции визуальной главной; контент и переводы находятся в `model/`.
- `src/shared/config/project-cases.ts` — расширенные описания кейсов: контекст, решения, роль и технологии; каталожные записи связываются по постоянному `slug`.
- `src/widgets/resume-page/model/` — редакционные данные расширенного резюме, `src/widgets/contacts-page/` — представление страницы контактов.
- `public/design/` — локальные изображения и SVG. На главной используются SVG-постеры с анимацией слоёв; исходные растровые изображения сохранены для редактирования.
- `src/shared/lib/content/get-site-content.ts` — типизированный доступ к импортированному JSON без HTTP-запросов.

Для публикации изменений контента или изображений нужно повторно выполнить сборку. Прежняя панель Go `/admin` больше не связана с публичным сайтом; её исходники и данные сохранены отдельно в `../Backend/`.

## Статическая сборка

```powershell
pnpm exec tsc --noEmit
pnpm run lint
pnpm run test:rules
pnpm run build
pnpm run test:responsive
pnpm run test:integrity
```

`pnpm build` создаёт каталог `out/`, который можно разместить на статическом хостинге. `next start` не используется. Внутренние страницы экспортируются как `projects/index.html`, `stack/index.html`, `resume/index.html` и `contacts/index.html`; хостинг должен отдавать `index.html` для соответствующего пути с завершающим `/`.

`pnpm run test:responsive` проверяет все экспортированные маршруты на ширинах 320–1920 px в светлой и тёмной темах, включая выход текста за контейнеры. Для теста нужны Python 3, пакет `playwright` (`pip install playwright`) и установленный Chrome либо Chromium для Playwright.

`pnpm run test:integrity` проверяет ссылки и якоря, заголовки, descriptions, изображения, уникальность slug и соответствие карточек опубликованным проектам; использует только стандартную библиотеку Python.

Серверная оптимизация Next.js отключена для совместимости со статическим экспортом; основные изображения предварительно преобразованы в WebP и выдаются напрямую из `public/`.

Сгенерированные страницы не зависят от Go/PostgreSQL. При изменении данных, изображений или кейсов повторно запустите `pnpm run build`. Канонические ссылки и sitemap используют публичный адрес `https://kuminovvv.com`; при изменении домена обновите конфигурацию metadata и sitemap.

Композиция главной находится в `widgets/visual-portfolio`, общий документ — в `app/root-document.tsx`. Слайсы предоставляют публичный API через `index.ts`; внутренние импорты остаются относительными. ESLint проверяет границы слоёв, публичные импорты, отдельные файлы компонентов, форму props и отсутствие самостоятельных helpers/данных в TSX. `test:rules` проверяет эти ограничения на допустимых и ошибочных примерах.

Конвенции проекта: `AGENTS.md`, `docs/README.md`, `docs/frontend-conventions.md`.

Публикация автоматически выполняется по Git-тегам `vMAJOR.MINOR.PATCH` через GitHub Actions и GitHub Releases. Настройка и диагностика: [docs/deploy-by-tags.md](docs/deploy-by-tags.md).
