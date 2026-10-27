"""Browser regression checks for the exported project gallery.

Run after pnpm run build: python scripts/check-gallery.py
Requires Python Playwright and Chrome (or Playwright Chromium).
"""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.sync_api import Error, expect, sync_playwright


OUT = Path(__file__).resolve().parents[1] / "out"
RAIL = "[data-gallery-rail]"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(OUT), **kwargs)

    def log_message(self, *_args):
        pass


def position(rail):
    return rail.evaluate("e => e.scrollLeft")


def drag(page, rail, distance=240, pause=False):
    box = rail.bounding_box()
    x, y = min(900, box["width"] - 40), box["y"] + 120
    page.mouse.move(x, y)
    page.mouse.down()
    for step in range(1, 13):
        page.mouse.move(x - distance * step / 12, y)
        page.wait_for_timeout(16)
    if pause:
        page.wait_for_timeout(130)
    page.mouse.up()


def desktop_checks(page, url):
    page.goto(url)
    rail = page.locator(RAIL)
    expect(rail.locator("button").first).to_be_visible()
    assert page.locator("#projects > div > div").count() == 1, "Gallery controls or counter were reintroduced"
    page.wait_for_load_state("networkidle")
    page.wait_for_function("""() => [...document.querySelectorAll('[data-gallery-card]')].every(
        e => e.getAnimations().every(a => a.animationName !== 'projects-assemble'))""")
    for theme in ("light", "dark"):
        page.evaluate("theme => document.documentElement.classList.toggle('dark', theme === 'dark')", theme)
        for width in (320, 390, 768, 1440, 1920, 2560):
            page.set_viewport_size({"width": width, "height": 1000})
            rail.evaluate("e => e.scrollLeft = 0")
            metrics = rail.evaluate("""e => {
                const box = e.getBoundingClientRect();
                return {
                    left: box.left, right: box.right,
                    width: document.documentElement.getBoundingClientRect().width,
                    overflow: document.documentElement.scrollWidth - window.innerWidth,
                    card: e.firstElementChild.getBoundingClientRect().left,
                    content: document.querySelector('[data-visual-home]').getBoundingClientRect().left,
                    snap: getComputedStyle(e).scrollSnapType
                };
            }""")
            assert abs(metrics["left"]) < 1 and abs(metrics["right"] - metrics["width"]) < 1, metrics
            assert metrics["overflow"] <= 1, metrics
            assert abs(metrics["card"] - metrics["content"]) < 1, metrics
            assert metrics["snap"] == "none", metrics
            rail.evaluate("e => e.scrollLeft = 240")
            assert rail.locator("button").first.bounding_box()["x"] < metrics["content"] - 200
            rail.evaluate("e => e.scrollLeft = e.scrollWidth")
            last = rail.locator("button").last.bounding_box()
            expected = min(metrics["content"], metrics["width"] - last["width"] - 32)
            assert abs(last["x"] - expected) < 2, (last, expected)
    print("PASS: full viewport width, initial/last card alignment, no page overflow; 6 widths, both themes")

    page.set_viewport_size({"width": 1440, "height": 1000})
    rail.evaluate("e => e.scrollLeft = 0")
    rail.scroll_into_view_if_needed()
    drag(page, rail)
    start = position(rail)
    samples = []
    for _ in range(8):
        page.wait_for_timeout(35)
        samples.append(position(rail))
    assert start >= 235, start
    assert samples[-1] > start + 30, (start, samples)
    assert all(b >= a for a, b in zip([start] + samples, samples)), samples
    expect(page.locator("dialog[open]")).to_have_count(0)
    page.wait_for_timeout(1000)
    settled = position(rail)
    page.wait_for_timeout(150)
    assert abs(position(rail) - settled) < 1
    print("PASS: drag follows pointer, continuous inertia settles, drag does not open a project")

    rail.evaluate("e => e.scrollLeft = 0")
    drag(page, rail, pause=True)
    stopped = position(rail)
    page.wait_for_timeout(200)
    assert abs(position(rail) - stopped) < 1
    assert abs(stopped - 240) < 2, stopped
    print("PASS: releasing a stationary drag preserves its exact position without snapping")

    rail.evaluate("e => e.scrollLeft = 0")
    drag(page, rail)
    box = rail.bounding_box()
    page.mouse.move(600, box["y"] + 120)
    page.mouse.down()
    stopped = position(rail)
    page.wait_for_timeout(180)
    assert abs(position(rail) - stopped) < 1
    page.mouse.move(600, box["y"] - 30, steps=5)
    page.mouse.up()
    print("PASS: a new press stops inertia immediately")

    for ending in ("pointercancel", "lostpointercapture"):
        rail.evaluate("""e => {
            e.scrollLeft = 0;
            e.addEventListener('pointerdown', event => e.dataset.testPointerId = event.pointerId, {once: true});
        }""")
        box = rail.bounding_box()
        page.mouse.move(700, box["y"] + 120)
        page.mouse.down()
        page.mouse.move(500, box["y"] + 120, steps=8)
        page.wait_for_timeout(30)
        rail.evaluate("""(e, ending) => {
            const pointerId = Number(e.dataset.testPointerId);
            if (ending === 'pointercancel') e.dispatchEvent(new PointerEvent(ending, {pointerId, bubbles: true}));
            else e.releasePointerCapture(pointerId);
            delete e.dataset.testPointerId;
        }""", ending)
        page.mouse.up()
        stopped = position(rail)
        page.wait_for_timeout(180)
        assert abs(position(rail) - stopped) < 1
        assert rail.get_attribute("data-dragging") is None
        expect(page.locator("dialog[open]")).to_have_count(0)
    print("PASS: cancelled drag and lost capture clean up without inertia or accidental clicks")

    rail.evaluate("e => e.scrollLeft = 0")
    drag(page, rail)
    page.mouse.wheel(20, 0)
    page.wait_for_timeout(40)
    stopped = position(rail)
    page.wait_for_timeout(180)
    assert abs(position(rail) - stopped) < 1
    print("PASS: wheel input cancels inertia")

    rail.evaluate("e => e.scrollLeft = 0")
    rail.focus()
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(600)
    assert abs(position(rail) - 432) < 2
    page.keyboard.press("ArrowLeft")
    page.wait_for_timeout(600)
    assert position(rail) < 2
    rail.locator("button").first.click()
    expect(page.locator("dialog[open]")).to_have_count(1)
    page.keyboard.press("Escape")
    expect(page.locator("dialog[open]")).to_have_count(0)
    rail.locator("button").first.focus()
    page.keyboard.press("Enter")
    expect(page.locator("dialog[open]")).to_have_count(1)
    page.keyboard.press("Escape")
    print("PASS: keyboard scrolling, normal card click, Enter and modal close")

    page.emulate_media(reduced_motion="reduce")
    page.get_by_label("Анимации на сайте", exact=True).click()
    expect(page.locator("html")).to_have_attribute("data-site-motion", "off")
    rail.evaluate("e => e.scrollLeft = 0")
    drag(page, rail)
    stopped = position(rail)
    page.wait_for_timeout(250)
    assert abs(position(rail) - stopped) < 1
    rail.focus()
    page.keyboard.press("ArrowRight")
    assert abs(position(rail) - stopped - 432) < 2
    print("PASS: reduced motion disables inertia and animated keyboard scrolling")


def touch_checks(browser, url):
    context = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    context.add_init_script("localStorage.setItem('portfolio-locale', 'ru');")
    page = context.new_page()
    page.goto(url, wait_until="networkidle")
    rail = page.locator(RAIL)
    rail.scroll_into_view_if_needed()
    box = rail.bounding_box()
    session = context.new_cdp_session(page)
    y = box["y"] + 100
    session.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": 330, "y": y}]})
    for x in range(310, 90, -20):
        session.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": x, "y": y}]})
        page.wait_for_timeout(16)
    session.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
    page.wait_for_timeout(500)
    assert position(rail) > 100, position(rail)
    expect(page.locator("dialog[open]")).to_have_count(0)
    print("PASS: native mobile swipe scrolls without opening a project")
    context.close()


def run():
    if not (OUT / "index.html").exists():
        raise SystemExit("Run pnpm run build first")
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch(channel="chrome", headless=True)
            except Error:
                browser = p.chromium.launch(headless=True)
            try:
                url = f"http://127.0.0.1:{server.server_port}/"
                page = browser.new_page(viewport={"width": 1440, "height": 1000})
                page.add_init_script("localStorage.setItem('portfolio-locale', 'ru');")
                desktop_checks(page, url)
                touch_checks(browser, url)
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    run()
