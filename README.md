# Personal Site — Frontend

Статический персональный сайт на Next.js 16, React 19, Tailwind CSS 4, shadcn/ui и Hugeicons. Пять страниц (`/`, `/projects`, `/stack`, `/resume`, `/contacts`) формируются во время сборки, без API и базы данных.

## Локальная разработка

```powershell
pnpm install
pnpm dev
```

Никакие переменные окружения, Go API и PostgreSQL не требуются. Для предварительного просмотра изменений используйте `pnpm dev`.

## Контент и изображения

- `src/shared/config/site-content.json` — основной источник текста, ссылок, каталога кейсов, главной страницы и стека. `src/widgets/stack-page/model/stack-content.ts` лишь импортирует данные оттуда.
- `src/shared/config/project-cases.ts` — расширенные описания кейсов: контекст, решения, роль и технологии; каталожные записи связываются по постоянному `slug`.
- `src/widgets/resume-page/model/` — редакционные данные расширенного резюме, `src/widgets/contacts-page/` — представление страницы контактов.
- `public/design/` — локальные изображения и SVG. На главной используются оптимизированные WebP; исходные PNG сохранены для редактирования.
- `src/shared/lib/content/get-site-content.ts` — типизированный доступ к импортированному JSON без HTTP-запросов.

Для публикации изменений контента или изображений нужно повторно выполнить сборку. Прежняя панель Go `/admin` больше не связана с публичным сайтом; её исходники и данные сохранены отдельно в `../Backend/`.

## Статическая сборка

```powershell
pnpm exec tsc --noEmit
pnpm run lint
pnpm run build
pnpm run test:responsive
pnpm run test:integrity
```

`pnpm build` создаёт каталог `out/`, который можно разместить на статическом хостинге. `next start` не используется. Внутренние страницы экспортируются как `projects/index.html`, `stack/index.html`, `resume/index.html` и `contacts/index.html`; хостинг должен отдавать `index.html` для соответствующего пути с завершающим `/`.

`pnpm run test:responsive` проверяет все экспортированные маршруты на ширинах 320–1920 px в светлой и тёмной темах, включая выход текста за контейнеры. Для теста нужны Python 3, пакет `playwright` (`pip install playwright`) и установленный Chrome либо Chromium для Playwright.

`pnpm run test:integrity` проверяет ссылки и якоря, заголовки, descriptions, изображения, уникальность slug и соответствие карточек опубликованным проектам; использует только стандартную библиотеку Python.

Серверная оптимизация Next.js отключена для совместимости со статическим экспортом; основные изображения предварительно преобразованы в WebP и выдаются напрямую из `public/`.

Сгенерированные страницы не зависят от Go/PostgreSQL. При изменении данных, изображений или кейсов повторно запустите `pnpm run build`. Канонические ссылки и sitemap добавляются после определения постоянного публичного адреса сайта — localhost для них не используется.

Конвенции проекта: `AGENTS.md`, `docs/README.md`, `docs/frontend-conventions.md`.

Публикация автоматически выполняется по Git-тегам `vMAJOR.MINOR.PATCH` через GitHub Actions и GitHub Releases. Настройка и диагностика: [docs/deploy-by-tags.md](docs/deploy-by-tags.md).
