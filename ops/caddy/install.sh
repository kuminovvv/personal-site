#!/usr/bin/env bash
# Run as root on the target host from a checkout of this repository.
set -Eeuo pipefail

if [[ "$(id -u)" != 0 ]]; then
    echo "Run as root: sudo bash ops/caddy/install.sh" >&2
    exit 1
fi
if ! command -v apt-get >/dev/null; then
    echo "Supported hosts: Debian/Ubuntu with apt-get" >&2
    exit 1
fi

repo="$(cd "$(dirname "$0")/../.." && pwd)"
export DEBIAN_FRONTEND=noninteractive
if ! command -v caddy >/dev/null || ! command -v python3 >/dev/null || ! command -v brotli >/dev/null || ! command -v curl >/dev/null; then
    apt-get update
    apt-get install -y caddy python3 curl brotli ca-certificates
fi
python3 -c 'import sys; assert sys.version_info >= (3, 9), "Python 3.9+ required"'

if ! getent group site-deploy >/dev/null; then
    groupadd --system site-deploy
fi
if ! id -u site-deploy >/dev/null 2>&1; then
    useradd --system --gid site-deploy --home-dir /nonexistent --shell /usr/sbin/nologin site-deploy
fi
install -d -m 0755 -o site-deploy -g site-deploy /var/www/kuminovvv.com
install -d -m 0755 -o site-deploy -g site-deploy /var/www/kuminovvv.com/releases
install -d -m 0755 -o site-deploy -g site-deploy /var/www/kuminovvv.com/uploads
install -d -m 0755 /usr/local/libexec/personal-site
install -m 0644 "$repo/scripts/deploy-latest-release.py" /usr/local/libexec/personal-site/deploy-latest-release.py
install -m 0644 "$repo/ops/caddy/precompress-release.py" /usr/local/libexec/personal-site/precompress-release.py
install -m 0644 "$repo/ops/caddy/preserve-static-assets.py" /usr/local/libexec/personal-site/preserve-static-assets.py
install -m 0644 "$repo/ops/caddy/personal-site-deploy.service" /etc/systemd/system/personal-site-deploy.service
install -m 0644 "$repo/ops/caddy/personal-site-deploy.timer" /etc/systemd/system/personal-site-deploy.timer

# Validate the candidate before changing the running web server.
caddy validate --config "$repo/ops/caddy/Caddyfile" --adapter caddyfile
install -d -m 0755 /etc/caddy
if [[ -f /etc/caddy/Caddyfile ]]; then
    cp -a /etc/caddy/Caddyfile "/etc/caddy/Caddyfile.backup.$(date +%Y%m%d%H%M%S)"
fi
install -m 0644 "$repo/ops/caddy/Caddyfile" /etc/caddy/Caddyfile

nginx_was_active=false
if systemctl is-active --quiet nginx; then
    nginx_was_active=true
    systemctl stop nginx
fi

if ! systemctl enable --now caddy || ! systemctl reload caddy; then
    echo "Caddy failed; attempting to restore the previous web server" >&2
    systemctl stop caddy || true
    if [[ "$nginx_was_active" == true ]]; then
        systemctl start nginx || true
    fi
    exit 1
fi
if [[ "$nginx_was_active" == true ]]; then
    systemctl disable nginx
fi

systemctl daemon-reload
systemctl enable --now personal-site-deploy.timer

echo "Caddy and release polling are configured."
echo "Confirm A/AAAA records for kuminovvv.com and www.kuminovvv.com point to this server."
echo "The site becomes available after Caddy acquires a certificate and a v* release is published."
