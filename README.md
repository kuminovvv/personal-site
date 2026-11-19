# Personal Site — Astro 2.0

Новая версия персонального сайта Ильи Куминова на **Astro 7**: визуальное портфолио, RU/EN, интерактивная галерея проектов, модальные окна и анимации.

Рабочая ветка `main` содержит Astro-версию, объединённую с `astro-v2`. Предыдущая Next.js-версия доступна в истории `master`.

## Стек

- **Astro 7** — статическая генерация, маршруты, острова.
- **React 19** — только для интерактивных островов: галерея, модалка, orbit-эффект, переключатель анимаций. Остальные секции — обычный HTML.
- **Tailwind CSS 4** — стили и токены `site-*`.
- **Vanilla JS** — тема, мобильное меню, language persistence.

Статические секции не гидрируются. В браузер попадает только React-рантайм для островов, а не весь сайт.

## Локальная разработка

```powershell
pnpm install
pnpm dev
```

Сборка:

```powershell
pnpm build
pnpm preview
```

`dist/` — готовый статический сайт.

## Маршруты

- `/`, `/ru/` — русская главная;
- `/en/` — английская главная;
- `/projects/`, `/stack/`, `/resume/`, `/contacts/` и их `/ru/`, `/en/` версии;
- 7 кейсов в каждом языке;
- `404.html`.

## Интерактивность

- **Галерея** — горизонтальный drag/scroll, клавиатура, открытие проекта;
- **Модалка** — `<dialog>`, history API (`?project=slug`), focus trap, Escape;
- **Orbit-эффект** — интерактивная SVG-композиция Creative Lab;
- **Анимации** — IntersectionObserver + Web Animations API, с переключателем и `prefers-reduced-motion`;
- **Тема и язык** — `localStorage`, без клиентского роутера.

## Контент

- `src/shared/config/site-content.json` и `site-content.en.json` — основной контент;
- `src/shared/config/project-cases.ts` и `project-cases.en.ts` — кейсы;
- `src/widgets/visual-portfolio/model/` — тексты и данные визуальной главной;
- `src/widgets/resume-page/model/`, `src/widgets/stack-page/model/` — данные внутренних страниц.

## Изображения и шрифты

- `public/design/visual-portfolio/` — SVG/PNG для новой главной и модалок;
- `public/design/` — изображения внутренних страниц;
- `public/fonts/` — сабсеты Roboto Flex, Unbounded, Onest, Golos Text, Geist Mono;
- `src/styles/fonts.css` — подключение шрифтов.

Шрифты ограничены по используемым весам и символам. При добавлении новых языков или символов проверьте наличие глифов.

## Проверки

```powershell
pnpm check                 # Astro + TypeScript
pnpm run test:integrity    # ссылки, якоря, SEO, кейсы
pnpm run test:responsive   # 36 маршрутов × 13 ширин × 2 темы
pnpm run test:smoke        # галерея, модалка, тема, меню, motion, RU/EN
```

Для Python-проверок:

```powershell
pip install -r requirements-dev.txt
```

## Деплой

- отдавать `dist/`;
- gzip/Brotli для HTML/CSS/JS/SVG;
- `Cache-Control: public, max-age=31536000, immutable` для хешированных `/_astro/*`, сутки для `/fonts/*`;
- короткий cache для HTML;
- `404.html` для неизвестных маршрутов.

Релизы публикуются тегами `v*` через GitHub Actions. На сервере `82.114.228.134`
используется Caddy с автоматическим HTTPS и systemd-таймером обновлений.
Первичная настройка и пошаговый порядок переключения DNS описаны в
[`docs/deploy-by-tags.md`](docs/deploy-by-tags.md).

## Структура

```text
src/
  pages/        маршруты и RU/EN-версии
  layouts/      общий layout, тема, меню
  components/   VisualHome, SiteHeader, SiteFooter, LanguageSwitcher
  compat/       Link и Image вместо next/*
  widgets/      visual-portfolio, projects-catalog, stack-page, resume-page, contacts-page
  shared/       конфиг, контент, i18n, иконки, UI
  styles/       Tailwind 4, токены, шрифты
```
