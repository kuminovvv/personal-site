# Автоматическая публикация Next.js сайта через Caddy

Сайт использует **Next.js 16** в режиме `output: "export"`.
GitHub Actions собирает каталог `out/` и публикует `site.tar.gz` в GitHub Releases.
На сервере `82.114.228.134` Caddy отдаёт файлы из
`/var/www/kuminovvv.com/current` с автоматическим HTTPS.
Серверный systemd-таймер раз в две минуты получает новый релиз, проверяет
его SHA-256, обновляет символьную ссылку `current` и откатывает при ошибке
проверки HTTPS.

## Новый релиз

После изменений в `main` создайте **новый** тег SemVer, например `v3.0.2`:

```bash
git switch main
git pull --ff-only
git tag v3.0.2
git push origin v3.0.2
```

1. `.github/workflows/release.yml` проверяет, что тег принадлежит `main`.
2. Выполняются TypeScript, ESLint, тесты, Next.js static export и проверка ссылок.
3. Архив `site.tar.gz` публикуется в GitHub Releases вместе с SHA-256.
4. `personal-site-deploy.timer` проверяет наличие нового релиза на сервере.
5. Служба `personal-site-deploy.service` обновляет сайт атомарно, с
   автоматическим восстановлением предыдущей версии при ошибке.

Изменения `main` без нового тега не публикуются. Для обновления достаточно
создать и отправить новый тег, ручная загрузка на сервер не нужна.
На VPS не нужны Node.js, pnpm, GitHub-токен или SSH-ключ GitHub Actions.

## Первоначальная установка и диагностика

На Ubuntu/Debian установите конфигурацию из `main`:

```bash
git clone --branch main https://github.com/kuminovvv/personal-site.git
cd personal-site
sudo bash ops/caddy/install.sh
```

DNS A-записи `kuminovvv.com` и `www.kuminovvv.com` должны вести на
`82.114.228.134`; Caddy автоматически запрашивает и обновляет сертификаты.

```bash
systemctl status caddy personal-site-deploy.timer
systemctl list-timers personal-site-deploy.timer
journalctl -u personal-site-deploy.service -n 100 --no-pager
cat /var/www/kuminovvv.com/.deployed-tag
readlink -f /var/www/kuminovvv.com/current
curl -I https://kuminovvv.com/
```

В `ops/caddy/Caddyfile` задано кеширование хешированных
`/_next/static/*`, заголовки безопасности и компрессия.
Предыдущие архивы сохраняются в `releases/`, чтобы можно было откатиться.
Старые конфигурации Nginx остались только в истории Git.
