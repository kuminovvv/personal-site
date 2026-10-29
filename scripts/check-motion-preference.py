"""Check the enabled motion default and explicit site choices after pnpm run build."""

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


def check(browser, url):
    context = browser.new_context(reduced_motion="reduce", viewport={"width": 1440, "height": 1000})
    context.add_init_script("localStorage.setItem('portfolio-locale', 'ru');")
    page = context.new_page()
    page.goto(url, wait_until="networkidle")
    control = page.get_by_label("Анимации на сайте", exact=True)
    assert page.evaluate("localStorage.getItem('portfolio-motion')") is None
    expect(control).to_have_attribute("aria-checked", "true")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "on")
    assert page.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches")
    assert page.locator('[data-motion-intro="line"]').first.evaluate("e => getComputedStyle(e).animationName") == "intro-line"
    page.wait_for_timeout(1100)
    card = page.locator("[data-gallery-card]").first
    card.hover()
    page.wait_for_timeout(450)
    expect(card.locator("img")).to_have_attribute("src", "/design/visual-portfolio/soobota.svg#animate")
    card.click()
    expect(page.locator("dialog[open]")).to_be_visible()
    assert page.locator("dialog").evaluate("e=>e.getAnimations().some(a=>a.effect.getTiming().duration===300)")
    assert page.locator("dialog").evaluate("e=>getComputedStyle(e,'::backdrop').transitionDuration") == "0.3s"
    page.keyboard.press("Escape")
    expect(page.locator("dialog[open]")).to_have_count(0)
    page.evaluate("scrollTo({top:0,behavior:'instant'})")
    page.reload(wait_until="networkidle")
    expect(control).to_have_attribute("aria-checked", "true")
    assert page.locator('[data-motion-intro="line"]').first.evaluate("e => getComputedStyle(e).animationName") == "intro-line"
    print("PASS: default enables Hero, hover, modal and backdrop under OS reduction; choice persists")

    art = page.locator("#lab object")
    art.scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.wait_for_function("document.querySelector('#lab object').contentDocument?.getElementById('Vector_4')")
    box = art.bounding_box()
    page.mouse.move(box["x"]+box["width"]-20, box["y"]+60)
    page.wait_for_timeout(250)
    assert art.evaluate("e=>e.contentDocument.getElementById('Vector_4').style.translate") not in ("", "0px")
    control.click()
    expect(control).to_have_attribute("aria-checked", "false")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "off")
    assert art.evaluate("e=>e.contentDocument.getElementById('Vector_4').style.translate") == ""
    page.emulate_media(reduced_motion="no-preference")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "off")
    card.hover()
    page.wait_for_timeout(450)
    expect(card.locator("img")).to_have_attribute("src", "/design/visual-portfolio/soobota.svg")
    card.click()
    expect(page.locator("dialog[open]")).to_be_visible()
    assert page.locator("dialog").evaluate("e=>e.getAnimations().every(a=>a.effect.getTiming().duration===0)")
    assert page.locator("dialog").evaluate("e=>getComputedStyle(e,'::backdrop').transitionProperty") == "none"
    page.keyboard.press("Escape")
    expect(page.locator("dialog[open]")).to_have_count(0)
    print("PASS: explicit off stops orbit, CSS hover and modal even when system allows motion")

    rail = page.locator("[data-gallery-rail]")
    control.click()
    expect(control).to_have_attribute("aria-checked", "true")
    rail.evaluate("e=>e.scrollLeft=0")
    rail.focus()
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(50)
    control.click()
    expect(control).to_have_attribute("aria-checked", "false")
    stopped = rail.evaluate("e=>e.scrollLeft")
    page.wait_for_timeout(200)
    assert abs(rail.evaluate("e=>e.scrollLeft") - stopped) < 1
    control.click()
    expect(control).to_have_attribute("aria-checked", "true")
    rail.evaluate("e=>e.scrollLeft=0")
    rail.scroll_into_view_if_needed()
    page.wait_for_timeout(800)
    box = rail.bounding_box()
    page.mouse.move(900, box["y"]+120)
    page.mouse.down()
    for step in range(1, 11):
        page.mouse.move(900-step*24, box["y"]+120)
        page.wait_for_timeout(16)
    page.mouse.up()
    page.wait_for_timeout(30)
    control.click()
    expect(control).to_have_attribute("aria-checked", "false")
    stopped = rail.evaluate("e=>e.scrollLeft")
    page.wait_for_timeout(200)
    assert abs(rail.evaluate("e=>e.scrollLeft") - stopped) < 1
    print("PASS: selecting off immediately stops active native smooth scrolling and drag inertia")

    page.evaluate("localStorage.removeItem('portfolio-motion'); window.dispatchEvent(new StorageEvent('storage', { key: 'portfolio-motion', newValue: null }));")
    expect(control).to_have_attribute("aria-checked", "true")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "on")
    other = context.new_page()
    other.goto(url, wait_until="networkidle")
    expect(other.get_by_label("Анимации на сайте", exact=True)).to_have_attribute("aria-checked", "true")
    control.click()
    expect(control).to_have_attribute("aria-checked", "false")
    expect(other.get_by_label("Анимации на сайте", exact=True)).to_have_attribute("aria-checked", "false")
    expect(other.locator("html")).to_have_attribute("data-site-motion", "off")
    print("PASS: default remains enabled under OS reduction; explicit choice synchronizes across tabs")
    context.close()

    context = browser.new_context(reduced_motion="reduce")
    context.add_init_script("localStorage.setItem('portfolio-locale', 'ru');")
    page = context.new_page()
    page.add_init_script("Storage.prototype.setItem = () => { throw new Error('blocked'); };")
    page.goto(url, wait_until="networkidle")
    control = page.get_by_label("Анимации на сайте", exact=True)
    expect(control).to_have_attribute("aria-checked", "true")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "on")
    control.click()
    expect(control).to_have_attribute("aria-checked", "false")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "off")
    context.close()
    print("PASS: explicit choice works during this visit when storage is blocked")

    context = browser.new_context(reduced_motion="reduce")
    context.add_init_script("localStorage.setItem('portfolio-locale', 'ru');")
    page = context.new_page()
    page.add_init_script("localStorage.setItem('portfolio-motion', 'system');")
    page.goto(url, wait_until="networkidle")
    expect(page.get_by_label("Анимации на сайте", exact=True)).to_have_attribute("aria-checked", "true")
    expect(page.locator("html")).to_have_attribute("data-site-motion", "on")
    context.close()
    print("PASS: legacy system preference now defaults to animations on")


def run():
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch(channel="chrome", headless=True)
            except Error:
                browser = p.chromium.launch(headless=True)
            try:
                check(browser, f"http://127.0.0.1:{server.server_port}/")
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    run()
