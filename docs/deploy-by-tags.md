# Публикация Astro-сайта через GitHub Releases и Caddy

Исходники и пайплайн находятся в `main`. Теги `vMAJOR.MINOR.PATCH`
запускают GitHub Actions, который проверяет Astro 7, собирает `dist/` и
публикует `site.tar.gz` в GitHub Releases. Сервер `82.114.228.134`
забирает архив по systemd-таймеру раз в две минуты, проверяет SHA-256,
атомарно переключает `current` и откатывает при ошибке HTTPS-проверки.
Доступ GitHub Actions к SSH, токены на VPS и Node.js на сервере не нужны.

## Первичная установка на новом VPS

1. Подключитесь к серверу по SSH, проверьте ОС (скрипт поддерживает
   Debian/Ubuntu), доступность портов 80/443 и отсутствие других сайтов,
   для которых нужен текущий Nginx.
2. Склонируйте репозиторий и запустите установку:

   ```bash
   git clone --branch main https://github.com/kuminovvv/personal-site.git
   cd personal-site
   bash ops/caddy/install.sh
   ```

3. Убедитесь, что `systemctl is-active caddy` возвращает `active`.
   Скрипт устанавливает Caddy, unit- и timer-файлы из `ops/caddy/`,
   создаёт пользователя `site-deploy` и каталоги в
   `/var/www/kuminovvv.com`. После проверки конфигурации он выключает
   Nginx, если тот обслуживал этот VPS. Если запуск Caddy не удался,
   скрипт пытается запустить Nginx обратно.
4. Перенаправьте записи A для `kuminovvv.com` и `www.kuminovvv.com`
   на `82.114.228.134`. Удалите/измените старые AAAA, если есть.
   Caddy автоматически запрашивает TLS-сертификаты после корректной DNS
   маршрутизации. Проверьте `journalctl -u caddy -n 100 --no-pager`.

**Не меняйте DNS, пока не подтверждён доступ к новому серверу и не
проверено его состояние.** Прежний публичный origin — `178.212.15.69`.
Домен на новом сервере будет отдавать 404, пока не опубликован первый релиз.
Для переключения без простоя заранее загрузите готовые файлы в
`current` или согласуйте короткое окно переезда.

## Публикация релиза

Выполните после настройки Caddy, DNS и HTTPS:

```bash
git switch main
git pull --ff-only
git tag v3.0.1
git push origin v3.0.1
```

GitHub Actions принимает только теги, коммит которых принадлежит `main`.
После успешных проверок архив появляется в Releases. Новые теги должны
увеличивать версию. Публикация коммитов без тегов сайт не обновляет.

## Проверка

```bash
systemctl status caddy personal-site-deploy.timer
systemctl start personal-site-deploy.service
journalctl -u personal-site-deploy.service -n 100 --no-pager
cat /var/www/kuminovvv.com/.deployed-tag
readlink -f /var/www/kuminovvv.com/current
curl -I --resolve kuminovvv.com:443:127.0.0.1 https://kuminovvv.com/
curl -I --resolve kuminovvv.com:443:127.0.0.1 https://kuminovvv.com/en/
```

Сервер хранит версии в `releases/`. `ops/caddy/preserve-static-assets.py`
сохраняет старые хешированные файлы `/_astro/*` для клиентов с кешированным
HTML, а `precompress-release.py` создаёт gzip/Brotli-версии файлов.
Caddy также поддерживает динамическое zstd/gzip сжатие. Статика и
сертификаты обслуживаются напрямую Caddy, без Nginx или Node.js.

Исторические параметры старого Nginx описаны в
[server-performance.md](server-performance.md).
