"""Verify exported RU/EN documents, language navigation and translated layouts."""

import json
import re
from html.parser import HTMLParser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import urlparse

from playwright.sync_api import Error, expect, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "out"
CYRILLIC = re.compile("[А-Яа-яЁё]")


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.lang = self.canonical = ""
        self.alternates = {}
        self.links, self.text = [], []
        self.skip = 0
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag in ("head", "script", "style", "noscript"):
            self.skip += 1
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs["href"]
        if tag == "link" and attrs.get("hreflang"):
            self.alternates[attrs["hreflang"]] = attrs["href"]
        if tag == "a":
            self.links.append((attrs.get("href", ""), attrs.get("hreflang")))

    def handle_endtag(self, tag):
        if tag in ("head", "script", "style", "noscript"):
            self.skip -= 1

    def handle_data(self, data):
        if not self.skip and data.strip():
            self.text.append(data.strip())


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(OUT), **kwargs)

    def log_message(self, *_args):
        pass


def shape(value):
    if isinstance(value, dict):
        return {key: shape(item) for key, item in value.items()}
    if isinstance(value, list):
        return [shape(item) for item in value]
    return type(value).__name__


def static_checks():
    ru = json.loads((ROOT / "src/shared/config/site-content.json").read_text(encoding="utf-8"))
    en = json.loads((ROOT / "src/shared/config/site-content.en.json").read_text(encoding="utf-8"))
    assert shape(ru) == shape(en), "Translation resource structure differs"
    catalog = ru["catalog"]
    cases = [*catalog["omsuCases"], catalog["gazpromCase"], *catalog["personalCases"], *catalog["technicalCases"]]
    routes = ["", "projects", "stack", "resume", "contacts", *[f"projects/{case['slug']}" for case in cases]]
    for route in routes:
        route_suffix = f"{route}/" if route else ""
        for locale in ("ru", "en"):
            relative = f"{locale}/{route}"
            doc = Document((OUT / relative / "index.html").read_text(encoding="utf-8"))
            path = "/" + relative.strip("/") + "/" if relative.strip("/") else "/"
            assert doc.lang == locale, (path, doc.lang)
            assert urlparse(doc.canonical).path == path, (path, doc.canonical)
            assert {"ru", "en", "x-default"}.issubset(doc.alternates), path
            assert urlparse(doc.alternates["ru"]).path == "/ru/" + route_suffix, path
            assert urlparse(doc.alternates["en"]).path == "/en/" + route_suffix, path
            assert urlparse(doc.alternates["x-default"]).path == "/" + route_suffix, path
            if locale == "en":
                russian = [text for text in doc.text if CYRILLIC.search(text)]
                assert not russian, (path, russian)
                for href, language in doc.links:
                    if href.startswith("/") and not href.startswith("//") and language != "ru":
                        assert href == "/en" or href.startswith("/en/"), (path, href)
            else:
                for href, language in doc.links:
                    if href.startswith("/") and not href.startswith("//") and language != "en":
                        assert href == "/ru" or href.startswith("/ru/"), (path, href)
        legacy = Document((OUT / route / "index.html").read_text(encoding="utf-8"))
        assert legacy.lang == "ru", route
        assert urlparse(legacy.canonical).path == "/ru/" + route_suffix, route
    print(f"PASS: {len(routes) * 2} localized static pages, correct lang/canonical/hreflang, English text and links")


def browser_checks(browser, origin):
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    context.add_init_script("localStorage.setItem('portfolio-motion', 'off'); localStorage.setItem('portfolio-locale', 'ru');")
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(origin + "/ru/?project=soobota#projects", wait_until="networkidle")
    dialog = page.get_by_role("dialog")
    expect(dialog).to_be_visible()
    page.evaluate("""() => {
        window.modalBeforeSwitch = document.querySelector('dialog[open]');
        window.homeBeforeSwitch = document.querySelector('[data-visual-home]');
    }""")
    dialog.get_by_role("link", name="English", exact=True).click()
    page.wait_for_url("**/en/?project=soobota#projects")
    expect(page.locator("html")).to_have_attribute("lang", "en")
    expect(dialog).to_be_visible()
    assert page.evaluate("document.querySelector('dialog[open]') === window.modalBeforeSwitch")
    assert page.evaluate("document.querySelector('[data-visual-home]') === window.homeBeforeSwitch")
    assert page.evaluate("getComputedStyle(document.querySelector('dialog')).opacity") == "1"
    assert not CYRILLIC.search(dialog.inner_text())
    dialog.get_by_role("link", name="Русский", exact=True).click()
    page.wait_for_url("**/ru/?project=soobota#projects")
    expect(dialog).to_be_visible()
    assert page.evaluate("document.querySelector('dialog[open]') === window.modalBeforeSwitch")
    assert page.locator("html").get_attribute("lang") == "ru"
    dialog.get_by_role("link", name="English", exact=True).click()
    page.wait_for_url("**/en/?project=soobota#projects")
    expect(dialog).to_be_visible()
    assert page.evaluate("document.querySelector('dialog[open]') === window.modalBeforeSwitch")
    page.reload(wait_until="networkidle")
    expect(dialog).to_be_visible()
    dialog.get_by_role("link", name="Русский", exact=True).click()
    page.wait_for_url("**/ru/?project=soobota#projects")
    expect(page.locator("html")).to_have_attribute("lang", "ru")
    expect(dialog).to_be_visible()
    page.keyboard.press("Escape")
    expect(dialog).to_have_count(0)
    page.goto(origin + "/en/resume/", wait_until="networkidle")
    page.get_by_role("navigation", name="Site language", exact=True).first.get_by_role("link", name="Русский", exact=True).press("Enter")
    page.wait_for_url("**/ru/resume/")
    expect(page.locator("html")).to_have_attribute("lang", "ru")
    print("PASS: language changes preserve page, modal query and anchor; direct reload and keyboard switching work")

    for route in ("", "projects/", "stack/", "resume/", "contacts/", "projects/soobota/"):
        page.goto(origin + "/en/" + route, wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        for theme in ("light", "dark"):
            page.evaluate("theme => document.documentElement.classList.toggle('dark', theme === 'dark')", theme)
            for width in (320, 390, 768, 1024, 1440, 1920):
                page.set_viewport_size({"width": width, "height": 1000})
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), (route, theme, width)
    assert not errors, errors
    context.close()
    context = browser.new_context(java_script_enabled=False)
    page = context.new_page()
    page.goto(origin + "/en/projects/soobota/")
    expect(page.locator("html")).to_have_attribute("lang", "en")
    assert not CYRILLIC.search(page.locator("body").inner_text())
    context.close()
    print("PASS: English layout at six widths in both themes; translations visible without JavaScript; no JS errors")


def language_motion_checks(browser, origin):
    context = browser.new_context(viewport={"width": 1440, "height": 1000})
    page = context.new_page()
    page.add_init_script("""localStorage.setItem('portfolio-locale', 'ru');
        window.portfolioRevealCalls = [];
        window.portfolioIntroStarts = 0;
        window.projectIntroStarts = 0;
        document.addEventListener('animationstart', event => {
            if (event.target.dataset.motionIntro === 'line') window.portfolioIntroStarts++;
            if (event.target.hasAttribute('data-project-intro')) window.projectIntroStarts++;
        });
        const originalAnimate = Element.prototype.animate;
        Element.prototype.animate = function(frames, options) {
            if (this.dataset.motionIntro || this.dataset.motion)
                window.portfolioRevealCalls.push(this.dataset.motionIntro || this.dataset.motion);
            return originalAnimate.call(this, frames, options);
        };
    """)
    page.goto(origin + "/ru/", wait_until="networkidle")
    page.wait_for_timeout(2200)
    assert page.evaluate("portfolioIntroStarts") == 2
    first_card = page.locator("[data-gallery-card]").first
    assert first_card.evaluate("e => e.getBoundingClientRect().top < innerHeight")
    assert first_card.evaluate("e => getComputedStyle(e).opacity === '1'")
    assert first_card.evaluate("e => e.style.opacity === ''")
    page.evaluate("scrollTo({top: 500, behavior: 'instant'})")
    page.wait_for_timeout(200)
    page.evaluate("scrollTo({top: 0, behavior: 'instant'})")
    assert first_card.evaluate("e => getComputedStyle(e).opacity === '1'")
    assert page.evaluate("portfolioRevealCalls.filter(x => x === 'card').length") == 0

    before_switch = page.evaluate("portfolioRevealCalls.length")
    project_starts = page.evaluate("projectIntroStarts")
    assert project_starts == 6
    page.evaluate("window.homeBeforeSwitch = document.querySelector('[data-visual-home]')")
    page.get_by_role("navigation", name="Навигация по главной").get_by_role("link", name="English").click()
    page.wait_for_url("**/en/")
    page.wait_for_load_state("networkidle")
    assert page.evaluate("document.querySelector('[data-visual-home]') === window.homeBeforeSwitch")
    assert page.evaluate("portfolioRevealCalls.length") == before_switch
    assert page.evaluate("portfolioIntroStarts") == 2
    assert page.evaluate("projectIntroStarts") == project_starts
    assert page.locator("[data-gallery-card]").first.evaluate("e => getComputedStyle(e).opacity === '1'")

    page.get_by_role("navigation", name="Home page navigation").get_by_role("link", name="Русский").click()
    page.wait_for_url(origin + "/ru/")
    page.wait_for_load_state("networkidle")
    assert page.evaluate("portfolioRevealCalls.length") == before_switch
    assert page.evaluate("projectIntroStarts") == project_starts

    page.locator("[data-gallery-card]").first.click()
    expect(page.get_by_role("dialog")).to_be_visible()
    page.get_by_role("dialog").get_by_role("link", name="English", exact=True).click()
    page.wait_for_url("**/en/?project=soobota")
    expect(page.get_by_role("dialog")).to_be_visible()
    page.keyboard.press("Escape")
    expect(page.get_by_role("dialog")).to_have_count(0)
    assert page.url == origin + "/en/", page.url
    assert page.locator("html").get_attribute("lang") == "en"
    assert page.get_by_role("navigation", name="Home page navigation").count() == 1

    page.goto(origin + "/en/", wait_until="networkidle")
    page.wait_for_timeout(1100)
    assert page.evaluate("portfolioIntroStarts") == 2
    context.close()
    print("PASS: first-screen cards stay visible; scroll and RU/EN switches do not replay intro or flash cards")


def country_defaults_checks(browser, origin):
    for country in ("RU", "DE"):
        context = browser.new_context(locale="ru-RU")
        page = context.new_page()
        lookups = []

        def mock_country(route):
            lookups.append(1)
            route.fulfill(status=200, content_type="application/json",
                          body=json.dumps({"success": True, "country_code": country}))

        page.route("https://ipwho.is/?fields=success,country_code", mock_country)
        page.goto(origin + "/?source=geo#projects", wait_until="networkidle")
        if country == "RU":
            page.wait_for_url("**/ru/?source=geo#projects")
            assert page.locator("html").get_attribute("lang") == "ru"
            assert page.locator("html").get_attribute("data-locale-pending") is None
            assert page.evaluate("sessionStorage.getItem('portfolio-auto-locale')") == "ru"
            page.reload(wait_until="networkidle")
            assert page.locator("html").get_attribute("lang") == "ru"
            page.get_by_role("navigation", name="Навигация по главной").get_by_role("link", name="English").click()
            page.wait_for_url("**/en/?source=geo#projects")
            assert page.evaluate("localStorage.getItem('portfolio-locale')") == "en"
            page.goto(origin + "/", wait_until="networkidle")
            page.wait_for_url("**/en/")
        else:
            page.wait_for_url("**/en/?source=geo#projects")
            assert page.locator("html").get_attribute("lang") == "en"
            assert page.locator("html").get_attribute("data-skip-portfolio-motion") is None
            assert page.evaluate("sessionStorage.getItem('portfolio-auto-locale')") == "en"
            assert page.evaluate("localStorage.getItem('portfolio-locale')") is None
            page.goto(origin + "/", wait_until="networkidle")
            page.wait_for_url("**/en/")
            page.get_by_role("navigation", name="Home page navigation").get_by_role("link", name="Русский").click()
            page.wait_for_url(origin + "/ru/")
            assert page.evaluate("localStorage.getItem('portfolio-locale')") == "ru"
            page.reload(wait_until="networkidle")
            assert page.locator("html").get_attribute("lang") == "ru"
        assert len(lookups) == 1, (country, len(lookups))
        context.close()

    context = browser.new_context(locale="en-US")
    page = context.new_page()
    page.route("https://ipwho.is/?fields=success,country_code", lambda route: route.abort())
    page.goto(origin + "/", wait_until="networkidle")
    page.wait_for_url("**/en/")
    context.close()

    context = browser.new_context(locale="ru-RU")
    page = context.new_page()
    page.route("https://ipwho.is/?fields=success,country_code",
               lambda route: route.fulfill(status=200, content_type="application/json",
                                           body=json.dumps({"success": True, "country_code": "FR"})))
    page.goto(origin + "/projects/soobota/?source=case#work", wait_until="networkidle")
    page.wait_for_url("**/en/projects/soobota/?source=case#work")
    assert page.locator("html").get_attribute("lang") == "en"
    context.close()
    print("PASS: Russian and foreign IP defaults, browser-language fallback, session cache and persistent manual choice")


def first_english_visit_motion_checks(browser, origin):
    for entry in ("country", "cached", "preference", "direct"):
        context = browser.new_context(viewport={"width": 1440, "height": 1000}, locale="ru-RU")
        page = context.new_page()
        page.add_init_script("""window.portfolioRevealCalls = [];
            document.addEventListener('animationstart', event => {
                if (event.target.dataset.motionIntro) window.portfolioRevealCalls.push(event.target.dataset.motionIntro);
            });
        """)
        if entry == "country":
            page.route("https://ipwho.is/?fields=success,country_code",
                       lambda route: route.fulfill(status=200, content_type="application/json",
                                                   body=json.dumps({"success": True, "country_code": "DE"})))
        if entry == "cached":
            page.add_init_script("sessionStorage.setItem('portfolio-auto-locale', 'en');")
        if entry == "preference":
            page.add_init_script("localStorage.setItem('portfolio-locale', 'en');")
        page.goto(origin + ("/en/" if entry == "direct" else "/"), wait_until="networkidle")
        page.wait_for_url("**/en/")
        assert page.locator("html").get_attribute("data-skip-portfolio-motion") is None, entry
        page.wait_for_function("portfolioRevealCalls.length === 4")
        assert page.evaluate("portfolioRevealCalls") == ["nav", "line", "line", "description"], entry
        page.wait_for_timeout(1100)
        assert len(page.evaluate("portfolioRevealCalls")) == 4, entry
        context.close()
    print("PASS: first EN entrance animates after geo, cached or saved locale redirect and direct URL")


def run():
    static_checks()
    server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            try:
                browser = p.chromium.launch(channel="chrome", headless=True)
            except Error:
                browser = p.chromium.launch(headless=True)
            try:
                browser_checks(browser, f"http://127.0.0.1:{server.server_port}")
                language_motion_checks(browser, f"http://127.0.0.1:{server.server_port}")
                country_defaults_checks(browser, f"http://127.0.0.1:{server.server_port}")
                first_english_visit_motion_checks(browser, f"http://127.0.0.1:{server.server_port}")
            finally:
                browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == "__main__":
    run()
