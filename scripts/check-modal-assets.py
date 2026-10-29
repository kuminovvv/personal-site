"""Verify modal asset intent loading and the available close controls."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import Error, expect, sync_playwright

OUT = Path(__file__).resolve().parents[1] / "out"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(OUT), **kwargs)

    def log_message(self, *_args):
        pass


def check(browser, origin):
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    context.add_init_script("localStorage.setItem('portfolio-motion', 'off')")
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    requests = []
    page.on("request", lambda request: requests.append(request.url))
    page.goto(origin + "/ru/", wait_until="networkidle")
    assert not any("/modals/" in url for url in requests), "Avoid loading every modal on initial navigation"
    card = page.locator('[data-project-slug="soobota"]')
    card.hover()
    page.wait_for_function("performance.getEntriesByType('resource').some(e => e.name.endsWith('/modals/soobota.svg'))")
    assert page.locator("dialog[open]").count() == 0, "Intent should preload without opening"
    assert not any("/modals/" in url and not url.endswith("/soobota.svg") for url in requests)
    card.click()
    dialog = page.locator("dialog[open]")
    expect(dialog).to_be_visible()
    image = dialog.locator("img")
    expect(image).to_have_attribute("loading", "eager")
    expect(image).to_have_attribute("fetchpriority", "high")
    page.wait_for_function("document.querySelector('dialog img')?.complete && document.querySelector('dialog img').naturalWidth > 0")
    assert dialog.locator("[data-project-dialog-content] button").count() == 0
    close = dialog.get_by_role("button", name="Закрыть описание проекта")
    assert close.bounding_box()["width"] <= 1, "No visible close button for mouse users"
    page.keyboard.press("Tab")
    expect(close).to_be_focused()
    assert close.bounding_box()["width"] > 1, "Keyboard users can discover the close action"
    close.press("Enter")
    expect(page.locator("dialog[open]")).to_have_count(0)
    expect(card).to_be_focused()
    assert not errors, errors
    context.close()
    print("PASS: intent loads only the selected modal artwork; eager image, keyboard close and focus restoration")


def run():
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as playwright:
            try:
                browser = playwright.chromium.launch(channel="chrome", headless=True)
            except Error:
                browser = playwright.chromium.launch(headless=True)
            try:
                check(browser, f"http://127.0.0.1:{server.server_port}")
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    run()
