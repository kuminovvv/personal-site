"""Smoke-тест Astro-сборки нового визуального портфолио.

Запуск: pnpm run build && python scripts/check-smoke.py
Требования: Python 3, playwright, установленный Chrome.
"""

from __future__ import annotations

import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / "dist"
ROUTES = (
    "/",
    "/ru/",
    "/en/",
    "/projects/",
    "/en/projects/",
    "/stack/",
    "/resume/",
    "/contacts/",
    "/projects/soobota/",
)


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIST), **kwargs)

    def log_message(self, *_args):
        pass


def check() -> int:
    if not (DIST / "index.html").exists():
        print("Сначала выполните pnpm run build: нет dist/index.html")
        return 2
    if not (DIST / "404.html").exists():
        print("Нет dist/404.html")
        return 2

    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_port}"
    problems: list[str] = []

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(channel="chrome", headless=True)
            try:
                for width in (390, 1440):
                    context = browser.new_context(viewport={"width": width, "height": 900})
                    page = context.new_page()
                    page.on("pageerror", lambda error: problems.append(f"pageerror: {error}"))
                    page.on(
                        "console",
                        lambda message: problems.append(f"console: {message.text}")
                        if message.type == "error"
                        else None,
                    )
                    for route in ROUTES:
                        response = page.goto(base + route, wait_until="networkidle")
                        if response is None or response.status != 200:
                            problems.append(f"{width}px {route}: HTTP {response and response.status}")
                            continue
                        page.evaluate("document.fonts.ready")
                        overflow = page.evaluate(
                            "document.documentElement.scrollWidth - window.innerWidth"
                        )
                        if overflow > 2:
                            problems.append(f"{width}px {route}: overflow +{overflow}px")
                        if page.locator("h1").count() != 1:
                            problems.append(f"{width}px {route}: h1 != 1")
                        height = page.evaluate("document.body.scrollHeight")
                        for y in range(0, height, 700):
                            page.evaluate(f"window.scrollTo(0, {y})")
                            page.wait_for_timeout(40)
                        page.wait_for_timeout(400)
                        broken = page.evaluate(
                            "[...document.images]"
                            ".filter((image) => image.complete && image.naturalWidth === 0)"
                            ".map((image) => image.src)"
                        )
                        if broken:
                            problems.append(f"{width}px {route}: broken images {broken[:3]}")

                    page.goto(base + "/", wait_until="networkidle")
                    page.wait_for_timeout(500)
                    page.locator("[data-gallery-card]").first.scroll_into_view_if_needed()
                    page.wait_for_timeout(200)
                    page.locator("[data-gallery-card]").first.click()
                    page.wait_for_timeout(600)
                    if not page.evaluate("!!document.querySelector('dialog[open]')"):
                        problems.append("gallery: project dialog did not open")
                    page.keyboard.press("Escape")
                    page.wait_for_timeout(500)
                    if page.evaluate("!!document.querySelector('dialog[open]')"):
                        problems.append("gallery: project dialog did not close on Escape")

                    page.goto(base + "/projects/", wait_until="networkidle")
                    page.wait_for_timeout(300)
                    theme = page.locator("[data-theme-toggle]")
                    if not theme.is_visible():
                        problems.append("projects: theme toggle is not visible")
                    else:
                        theme.click()
                        page.wait_for_timeout(150)
                        if not page.evaluate(
                            "document.documentElement.classList.contains('dark')"
                        ):
                            problems.append("projects: theme toggle does not add dark")
                        page.reload(wait_until="networkidle")
                        if not page.evaluate(
                            "document.documentElement.classList.contains('dark')"
                        ):
                            problems.append("projects: theme does not persist")

                    if width == 390:
                        page.locator("[data-mobile-menu] summary").click()
                        if not page.evaluate(
                            "document.querySelector('[data-mobile-menu]').open"
                        ):
                            problems.append("390px: mobile menu does not open")
                        page.keyboard.press("Escape")
                        if page.evaluate("document.querySelector('[data-mobile-menu]').open"):
                            problems.append("390px: mobile menu does not close on Escape")

                    page.goto(base + "/", wait_until="networkidle")
                    page.wait_for_timeout(500)
                    page.locator("[role='switch']").first.click()
                    page.wait_for_timeout(200)
                    if page.evaluate("document.documentElement.dataset.siteMotion") != "off":
                        problems.append("home: motion switch does not disable motion")
                    page.reload(wait_until="networkidle")
                    page.wait_for_timeout(300)
                    if page.evaluate("document.documentElement.dataset.siteMotion") != "off":
                        problems.append("home: motion preference does not persist")

                    page.goto(base + "/en/", wait_until="networkidle")
                    page.wait_for_timeout(400)
                    if "I connect ideas" not in page.locator("h1").inner_text():
                        problems.append("en: English hero copy is missing")

                    context.close()
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()

    for problem in problems:
        print("ERROR:", problem)
    print(f"Проверено {len(ROUTES) * 2} страниц. Ошибок: {len(problems)}")
    return 1 if problems else 0


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    sys.exit(check())
