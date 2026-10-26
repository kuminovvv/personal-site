"""Verify homepage motion against the static export: python scripts/check-motion.py."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from tempfile import gettempdir

from playwright.sync_api import Error, expect, sync_playwright


OUT = Path(__file__).resolve().parents[1] / "out"
RAIL = "[data-gallery-rail]"
ART = "#lab object"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(OUT), **kwargs)

    def log_message(self, *_args):
        pass


def wait_closed(page):
    expect(page.locator("dialog[open]")).to_have_count(0)
    assert page.evaluate("document.body.style.overflow") != "hidden"


def desktop(page, url):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.add_init_script("""localStorage.setItem('portfolio-locale', 'ru');
        window.motionCalls = [];
        const animate = Element.prototype.animate;
        Element.prototype.animate = function(frames, options) {
            window.motionCalls.push({intro:this.dataset.motionIntro,kind:this.dataset.motion,
                text:this.textContent.trim().slice(0,50),options});
            return animate.call(this, frames, options);
        };
    """)
    page.goto(url, wait_until="networkidle")
    page.wait_for_timeout(1200)
    intro = page.evaluate("motionCalls.filter(call => call.intro)")
    assert [call["intro"] for call in intro] == ["nav", "line", "line", "description"], intro
    assert intro[2]["options"]["delay"] - intro[1]["options"]["delay"] == 130
    assert page.locator("h1").evaluate("e => getComputedStyle(e).fontFamily.toLowerCase().includes('onest')")
    page.locator("#approach h2").scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    heading_calls = lambda: page.evaluate("motionCalls.filter(call=>call.kind==='heading' && call.text==='Сложное — понятным.').length")
    assert heading_calls() == 1
    page.evaluate("scrollTo({top:0,behavior:'instant'})")
    page.locator("#approach h2").scroll_into_view_if_needed()
    page.wait_for_timeout(800)
    assert heading_calls() == 1
    print("PASS: ordered Hero, Onest unchanged, scroll reveals run once")

    rail = page.locator(RAIL)
    cards = rail.locator("[data-gallery-card]")
    for index in range(5):
        rail.evaluate("(e,index) => e.scrollLeft = index * (e.children[1].offsetLeft-e.children[0].offsetLeft)", index)
        cards.nth(index).click()
        dialog = page.locator("dialog[open]")
        expect(dialog).to_be_visible()
        page.wait_for_timeout(60)
        if index == 0:
            opacity = dialog.evaluate("e => Number(getComputedStyle(e).opacity)")
            backdrop = dialog.evaluate("e => Number(getComputedStyle(e,'::backdrop').opacity)")
            assert 0 < opacity < 1, opacity
            assert 0 < backdrop < 1, backdrop
        page.wait_for_timeout(350)
        bounds = dialog.bounding_box()
        viewport = page.viewport_size
        assert abs(bounds["x"]) < 1 and abs(bounds["y"]) < 1, bounds
        assert abs(bounds["width"] - viewport["width"]) < 1, bounds
        assert abs(bounds["height"] - viewport["height"]) < 1, bounds
        assert dialog.evaluate("e => getComputedStyle(e).backgroundColor") == "rgb(255, 255, 255)"
        assert dialog.evaluate("e => getComputedStyle(e, '::backdrop').backgroundColor") == "rgb(255, 255, 255)"
        assert dialog.get_attribute("aria-modal") == "true" and dialog.get_attribute("role") == "dialog"
        assert page.evaluate("document.body.style.overflow") == "hidden"
        if index == 0:
            content = dialog.locator("[data-project-dialog-content]")
            content_box = content.bounding_box()
            assert content_box["height"] < viewport["height"] - 80, content_box
            top_gap = content_box["y"]
            bottom_gap = viewport["height"] - content_box["y"] - content_box["height"]
            assert top_gap >= 24 and bottom_gap >= 24, (top_gap, bottom_gap)
            assert abs(top_gap - bottom_gap) <= 3, (top_gap, bottom_gap, dialog.evaluate("e => ({display:getComputedStyle(e).display, justify:getComputedStyle(e).justifyContent, height:e.clientHeight, scrollHeight:e.scrollHeight, contentMargin:getComputedStyle(e.firstElementChild.nextElementSibling).margin})"))
            page.mouse.move(10, 160)
            expect(dialog.locator("[data-visible]")).to_have_attribute("data-visible", "true")
            assert dialog.evaluate("e => getComputedStyle(e).cursor") == "none"
            assert dialog.locator("[data-visible]").evaluate(
                "e => Math.abs(e.getBoundingClientRect().left + e.offsetWidth/2 - 10) < 1"
            )
            page.mouse.move(viewport["width"] - 1, top_gap / 2)
            assert dialog.evaluate("e => e.scrollWidth <= e.clientWidth + 1"), dialog.evaluate(
                "e => ({scrollWidth:e.scrollWidth, clientWidth:e.clientWidth, cursor:getComputedStyle(e).cursor})"
            )
            page.evaluate("window.dispatchEvent(new Event('blur'))")
            expect(dialog.locator("[data-visible]")).to_have_attribute("data-visible", "false")
            assert dialog.evaluate("e => getComputedStyle(e).cursor") != "none"
            assert dialog.evaluate("e => e.scrollWidth <= e.clientWidth + 1")
            for width in (320, 390, 768, 1024, 1440, 1920):
                page.set_viewport_size({"width": width, "height": 1000})
                page.mouse.move(width - 1, 4)
                assert dialog.evaluate("e => e.scrollWidth <= e.clientWidth + 1"), (width, dialog.evaluate(
                    "e => ({scrollWidth:e.scrollWidth, clientWidth:e.clientWidth})"))
                page.evaluate("window.dispatchEvent(new Event('blur'))")
                assert dialog.evaluate("e => e.scrollWidth <= e.clientWidth + 1"), width
            page.set_viewport_size(viewport)
            page.mouse.move(viewport["width"] / 2, content_box["y"] + content_box["height"]/2)
            expect(dialog.locator("[data-visible]")).to_have_attribute("data-visible", "false")
            assert dialog.evaluate("e => getComputedStyle(e).cursor") != "none"
            page.mouse.move(viewport["width"] / 2, top_gap / 2)
            expect(dialog.locator("[data-visible]")).to_have_attribute("data-visible", "true")
            assert dialog.evaluate("e => getComputedStyle(e).cursor") == "none"
            page.mouse.move(viewport["width"] / 2, viewport["height"] - bottom_gap / 2)
            expect(dialog.locator("[data-visible]")).to_have_attribute("data-visible", "true")
            assert dialog.evaluate("e => getComputedStyle(e).cursor") == "none"
            page.mouse.move(viewport["width"] / 2, content_box["y"] + content_box["height"]/2)
        for _ in range(6):
            page.keyboard.press("Tab")
            assert dialog.evaluate("e=>e.contains(document.activeElement)")
        before = page.evaluate("({y:scrollY,x:document.querySelector('[data-gallery-rail]').scrollLeft})")
        page.keyboard.press("Escape")
        page.wait_for_timeout(45)
        assert dialog.count() == 1, "Exit must keep the dialog mounted"
        wait_closed(page)
        assert cards.nth(index).evaluate("e=>document.activeElement===e")
        after = page.evaluate("({y:scrollY,x:document.querySelector('[data-gallery-rail]').scrollLeft})")
        assert abs(before["y"]-after["y"]) <= 1 and abs(before["x"]-after["x"]) <= 1, (before, after)
    print("PASS: five white viewport modals, vertically centered content, cursor-replacing cross in all margins, focus and scroll lock")

    cards.first.click()
    expect(page.locator("dialog[open]")).to_be_visible()
    page.wait_for_timeout(350)
    history_length = page.evaluate("history.length")
    page.evaluate("history.back()")
    page.wait_for_function("document.querySelector('dialog')?.dataset.closing==='true'")
    page.evaluate("history.forward()")
    page.wait_for_timeout(450)
    expect(page.locator("dialog[open]")).to_be_visible()
    assert "project=soobota" in page.url and page.evaluate("history.length") == history_length
    page.evaluate("history.back()")
    wait_closed(page)
    for mode in ("escape", "button", "backdrop"):
        page.goto(url + "?previous=" + mode, wait_until="networkidle")
        page.goto(url + "?current=" + mode + "#projects", wait_until="networkidle")
        cards.first.click()
        expect(page.locator("dialog[open]")).to_be_visible()
        page.wait_for_timeout(350)
        if mode == "escape":
            page.keyboard.press("Escape")
        elif mode == "button":
            page.get_by_role("button", name="Закрыть описание проекта").click()
        else:
            page.mouse.click(2, 2)
        wait_closed(page)
        page.evaluate("history.back()")
        page.wait_for_url("**/?previous=" + mode)
        expect(page.locator("dialog[open]")).to_have_count(0)
    page.goto(url + "?previous=direct", wait_until="networkidle")
    page.goto(url + "?project=canvas-api&keep=1#projects", wait_until="networkidle")
    expect(page.locator("dialog[open]")).to_be_visible()
    page.wait_for_timeout(350)
    history_length = page.evaluate("history.length")
    page.mouse.click(2, 2)
    wait_closed(page)
    assert "keep=1" in page.url and "project=" not in page.url and page.url.endswith("#projects")
    assert page.evaluate("history.length") == history_length
    page.evaluate("history.back()")
    page.wait_for_url("**/?previous=direct")
    print("PASS: rapid Back/Forward, all UI close methods preserve history, direct URL, query/hash preservation")

    page.wait_for_load_state("networkidle")
    rail = page.locator(RAIL)
    rail.evaluate("e=>e.scrollLeft=0")
    assert page.locator("#projects [aria-live]").count() == 0
    assert page.get_by_role("button", name="Следующий проект", exact=True).count() == 0
    rail.focus()
    expect(rail).to_be_focused()
    page.keyboard.press("ArrowRight")
    page.wait_for_timeout(650)
    assert abs(rail.evaluate("e=>e.scrollLeft") - 432) < 2, rail.evaluate("e=>({position:e.scrollLeft,active:document.activeElement===e, state:location.href})")
    rail.evaluate("e=>e.scrollLeft=1296")
    page.wait_for_timeout(180)
    rail.evaluate("e=>e.scrollLeft=400")
    page.wait_for_timeout(700)
    assert abs(rail.evaluate("e=>e.scrollLeft") - 432) < 2
    print("PASS: no gallery counter/buttons; keyboard scrolling and soft proximity snap")

    page.locator(ART).scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.wait_for_function("document.querySelector('#lab object').contentDocument?.getElementById('Vector_4')")
    layers = "e=>['Vector_4','Vector_6'].map(id=>e.contentDocument.getElementById(id).style.translate)"
    box = page.locator(ART).bounding_box()
    page.mouse.move(box["x"]+box["width"]-15, box["y"]+70)
    page.wait_for_timeout(300)
    moved = page.locator(ART).evaluate(layers)
    assert moved[0] != moved[1] and all(value not in ("", "0px", "0px 0px") for value in moved), moved
    page.mouse.move(5, 5)
    page.wait_for_timeout(80)
    assert page.locator(ART).evaluate(layers) != ["0px 0px", "0px 0px"]
    page.wait_for_timeout(1200)
    assert all(value in ("0px", "0px 0px") for value in page.locator(ART).evaluate(layers))
    page.mouse.move(box["x"]+box["width"]-15, box["y"]+70)
    page.wait_for_timeout(100)
    page.emulate_media(reduced_motion="reduce")
    page.wait_for_timeout(50)
    assert page.locator("html").get_attribute("data-site-motion") == "on"
    assert page.locator(ART).evaluate(layers) != ["", ""]
    page.get_by_label("Анимации на сайте", exact=True).click()
    expect(page.locator("html")).to_have_attribute("data-site-motion", "off")
    assert page.locator(ART).evaluate(layers) == ["", ""]
    print("PASS: orbital depth and return; animations stay enabled despite OS reduction until switched off")

    page.emulate_media(reduced_motion="no-preference")
    page.get_by_label("Анимации на сайте", exact=True).click()
    expect(page.locator("html")).to_have_attribute("data-site-motion", "on")
    page.locator("#contact").scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    cta = page.locator('#contact a[href^="mailto:"]').first
    cta.hover()
    page.wait_for_timeout(450)
    assert cta.locator("svg").evaluate("e=>getComputedStyle(e).translate") != "none"
    cta.focus()
    assert cta.evaluate("e=>Number.parseFloat(getComputedStyle(e).outlineWidth)") >= 2
    for theme in ("light", "dark"):
        page.evaluate("theme=>document.documentElement.classList.toggle('dark',theme==='dark')", theme)
        for width in (320, 390, 768, 1024, 1440, 1920, 2560):
            page.set_viewport_size({"width": width, "height": 1000})
            assert page.evaluate("document.documentElement.scrollWidth <= innerWidth+1"), (theme, width)
    page.set_viewport_size({"width": 1440, "height": 1000})
    for section in page.locator("[data-visual-home] section").all():
        section.scroll_into_view_if_needed()
        page.wait_for_timeout(900)
    page.mouse.move(0, 0)
    page.evaluate("scrollTo({top:0,behavior:'instant'})")
    page.wait_for_timeout(1000)
    page.screenshot(path=str(Path(gettempdir()) / "kuminov-motion-desktop.png"), full_page=True)
    assert not errors, errors
    print("PASS: CTA hover/focus, 7 widths in both themes, no uncaught JS errors")


def alternatives(browser, url):
    context = browser.new_context(java_script_enabled=False, viewport={"width": 1440, "height": 1000})
    page = context.new_page()
    page.goto(url)
    expect(page.locator("h1")).to_be_visible()
    expect(page.locator("[data-gallery-card]")).to_have_count(5)
    assert page.locator("h1").evaluate("e=>getComputedStyle(e).opacity") == "1"
    context.close()
    context = browser.new_context(reduced_motion="reduce", viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True)
    page = context.new_page()
    page.add_init_script("localStorage.setItem('portfolio-motion', 'off'); localStorage.setItem('portfolio-locale', 'ru');")
    page.goto(url, wait_until="networkidle")
    assert page.locator("[data-motion-intro]").evaluate_all("els=>els.every(e=>e.getAnimations().length===0)")
    page.locator("[data-gallery-card]").first.click()
    expect(page.locator("dialog[open]")).to_be_visible()
    assert page.locator("dialog").evaluate("e=>e.getAnimations().every(a=>a.effect.getTiming().duration===0)")
    page.get_by_role("button", name="Закрыть описание проекта").click()
    wait_closed(page)
    page.locator(ART).scroll_into_view_if_needed()
    page.wait_for_timeout(150)
    assert page.locator(ART).evaluate("e=>!e.contentDocument.getElementById('Vector_4').style.translate")
    page.screenshot(path=str(Path(gettempdir()) / "kuminov-motion-mobile.png"), full_page=True)
    context.close()
    print("PASS: server content visible without JavaScript; mobile opt-out modal and static orbit")


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
                desktop(browser.new_page(viewport={"width": 1440, "height": 1000}), url)
                alternatives(browser, url)
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    run()
