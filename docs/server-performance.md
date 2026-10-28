# Серверная отдача статического сайта

Применено 27.10.2026 на `178.212.15.69` (Nginx 1.28.3, Ubuntu 26.04).
Версия приложения остаётся `v2.0.2`.

## Конфигурация

В `ops/nginx/` сохранены применённые файлы:

| Файл | Путь на сервере |
| --- | --- |
| `kuminovvv.com.conf` | `/etc/nginx/sites-available/kuminovvv.com` |
| `kuminovvv-performance.conf` | `/etc/nginx/snippets/kuminovvv-performance.conf` |
| `kuminovvv-cache.conf` | `/etc/nginx/conf.d/kuminovvv-cache.conf` |

Из репозитория Ubuntu установлены `libnginx-mod-http-brotli-filter` и
`libnginx-mod-http-brotli-static`. Их load-файлы — в `/etc/nginx/modules-enabled/`.

- Brotli level 5, gzip fallback level 6; минимальный размер — 1024 байта.
- Сжимаются HTML, JS, CSS, JSON, XML, SVG и текстовые payload Next.js.
- PNG/JPEG/WebP/AVIF и WOFF2 повторно не сжимаются.
- `Vary: Accept-Encoding` разделяет варианты ответа в кешах.
- `/_next/static/`: годовой immutable-кеш для имён с хешем.
- Изображения и шрифты без хеша: кеш на час с валидаторами.
- HTML и прочие ответы: `no-cache`, перепроверка ETag/Last-Modified и 304.
- HTTP/2, TLS session cache, sendfile и существующие соединения сохранены.

`gzip_static`/`brotli_static` могут обслуживать sidecar-файлы будущих релизов;
текущий архив их не содержит, поэтому сжатие работает динамически.
Содержимое `releases/` не менялось. `open_file_cache` не включён, чтобы смена
`current` не смешивала открытые файлы разных релизов.

Deploy по тегу не переписывает Nginx: настройки сохранятся при следующих
публикациях. Файлы `ops/nginx/` устанавливаются отдельной операцией.

## Применение и проверка

Резервная копия этой операции: `/root/personal-site-opt-20261027-XocQy1/`.
В ней сохранены site config, `nginx.conf`, список пакетов, включённые модули,
текущий тег и путь `current`.

1. Применить map и gzip-only snippet без `brotli_*`.
2. Выполнить `nginx -t`, затем `systemctl reload nginx`.
3. Дождаться `Cache-Control: no-cache` и `Vary: Accept-Encoding` у `/ru/`.
4. Установить совместимые Brotli-модули и снова выполнить `nginx -t`.
5. Применить полный snippet, проверить Nginx и выполнить reload.
6. Дождаться `Content-Encoding: br` перед финальной проверкой.

Reload асинхронный: сразу после него ответ ещё может обслужить старый worker.
Готовность проверяется по заголовкам. При ошибке применяется предыдущая
конфигурация, сохранённая до этапа.

`ops/nginx/check-delivery.py` запускается на сервере с Python и curl,
поддерживающим Brotli. Пример:

```sh
python3 check-delivery.py --mode brotli \
  --resolve kuminovvv.com:443:127.0.0.1 \
  /ru/ /_next/static/chunks/3-5rdfj_em-40.js \
  /_next/static/chunks/2_-nrpfod4n0v.css \
  /design/visual-portfolio/lab-orbit.svg /og.png
```

Имена хешированных файлов нужно брать из текущей страницы. Скрипт сравнивает
SHA-256 распакованных identity/gzip/br, cache/security headers и `Vary`.
Для предыдущих этапов предусмотрены `--mode baseline` и `--mode gzip`.

| Ресурс | Передавалось до настройки | Brotli после настройки |
| --- | ---: | ---: |
| `/ru/` HTML | 19 505 Б (gzip level 1) | 14 054 Б |
| Крупный JS | 229 595 Б | 67 849 Б |
| Основной CSS | 108 111 Б | 17 557 Б |
| Lab SVG | 4 961 Б | 1 465 Б |

Дополнительно проверены RU/EN, внутренние страницы, HTTP/www-редиректы,
404/403, 304 по ETag, range 206, публичный HTTPS и HTTP/2 в Chromium.
Отчёты `baseline.json`, `gzip.json`, `brotli.json`, `public-check.json`
сохранены в каталоге резервной копии. Задержка внешней сети зависит от маршрута
посетителя; размер файлов не равен полной длительности загрузки страницы.

## Откат

Вернуть сохранённый site config, проверить Nginx и выполнить reload:

```sh
cp /root/personal-site-opt-20261027-XocQy1/kuminovvv.com \
  /etc/nginx/sites-available/kuminovvv.com
nginx -t && systemctl reload nginx
```

Новые map/snippet после этого не используются сайтом. Не удаляйте модули,
пока активная конфигурация содержит `brotli_*`. Релизы, сертификаты и ключи
при таком откате не изменяются.

Документация: [gzip](https://nginx.org/en/docs/http/ngx_http_gzip_module.html),
[expires и заголовки](https://nginx.org/en/docs/http/ngx_http_headers_module.html),
[ngx_brotli](https://github.com/google/ngx_brotli).
