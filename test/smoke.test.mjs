// Smoke test: imports the *built* dist (what actually gets published) and
// mounts each component in a jsdom document with minimal realistic props.
// Catches broken exports, malformed markup, and thrown exceptions - not
// full behavioral coverage.
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!doctype html><html><body><div id="app"></div></body></html>`, {
  runScripts: "outside-only",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.CustomEvent = dom.window.CustomEvent;

const {
  CardsList, CountdownTimer, CtaBanner, HeroBanner, ImageBanner, ImageText,
  LevelCentered, MediaGrid, MediaList, ModalBox, OmnichannelChat, TextAccordion,
  TextColumns, TextMessage, TextNotification, TextSection, VideoPlayer, WebinarInvitation,
} = await import("../dist/index.js");

const context = { lang: "es", theme: "light" };

// name -> [Class, props, expectedSelector]
const components = {
  HeroBanner: [HeroBanner, {
    context,
    title: { text: { es: "Titulo Hero" } },
    description: { text: { es: "Descripcion **hero**" } },
    scrollButton: { color: "has-text-white" },
    buttons: { buttons: [{ id: "hero-btn", text: { es: "Empieza" } }] },
  }, "p.title"],
  CardsList: [CardsList, {
    context,
    title: { text: { es: "Cartas" } },
    cards: [{
      header: { text: { es: "Header 1" } },
      content: { title: { text: { es: "Titulo carta" } }, description: { text: { es: "Desc **carta**" } } },
      footer: { buttons: [{ id: "card-btn", href: "#", text: { es: "Ver" } }] },
    }],
  }, ".card"],
  ModalBox: [ModalBox, {
    context,
    card: { title: { text: { es: "Modal titulo" } }, content: { text: { es: "Contenido **modal**" } } },
  }, ".modal-card"],
  WebinarInvitation: [WebinarInvitation, {
    context,
    name: { es: "Webinar" },
    description: { es: "Descripcion webinar" },
    startsOn: { date: "2030-08-01T10:00:00" },
    endOn: { date: "2030-08-01T11:00:00" },
    duration: { text: { es: "1 **hora**" } },
    programFee: { price: "$100", text: { es: "MXN" } },
  }, "#ical-request"],
  CountdownTimer: [CountdownTimer, { context }, ".level-item", (el) => el.setAttribute("start", "2030-01-01T00:00:00")],
  OmnichannelChat: [OmnichannelChat, {
    context,
    whatsapp: { phone: "5215555555555", text: { es: "Hola" } },
    ai: { eventName: "ai-click" },
  }, null],
  TextAccordion: [TextAccordion, {
    context,
    accordion: { items: [{ header: { text: { es: "Item" } }, content: { text: { es: "Contenido" } } }] },
  }, ".message"],
  LevelCentered: [LevelCentered, {
    context,
    items: [{ heading: { text: { es: "Head" } }, title: { text: { es: "Titulo" } } }],
  }, ".level-item"],
  MediaGrid: [MediaGrid, {
    context,
    mediaObjects: { items: [{ description: { text: { es: "Media desc" } } }] },
  }, ".cell"],
  MediaList: [MediaList, {
    context,
    mediaObjects: { items: [{ title: { text: { es: "T" } }, description: { text: { es: "D" } } }] },
    buttons: { eventName: "x", buttons: [] },
  }, "article"],
  VideoPlayer: [VideoPlayer, {
    context,
    video: { src: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
    description: { text: { es: "Video desc" } },
  }, "iframe"],
  ImageText: [ImageText, {
    context,
    image: { src: "https://example.test/img.png" },
    description: { text: { es: "Imagen y texto" } },
  }, "figure"],
  TextSection: [TextSection, { context, content: { text: { es: "Seccion de texto" } } }, ".content"],
  TextMessage: [TextMessage, { context, header: { text: { es: "Header msg" } }, body: { text: { es: "Body msg" } }, erasable: true }, ".message-body"],
  TextNotification: [TextNotification, { context, message: { text: { es: "Notificacion" } } }, ".notification"],
  TextColumns: [TextColumns, {
    context,
    content: { text: { es: "Centro" } },
    leftColumn: { text: { es: "Izq" } },
    rightColumn: { text: { es: "Der" } },
  }, ".columns"],
  CtaBanner: [CtaBanner, { context, content: { text: { es: "CTA" } } }, "section"],
  ImageBanner: [ImageBanner, { context, image: { src: "https://example.test/img.png" } }, "figure"],
};

for (const [name, [Ctor, props, selector, extraSetup, todo]] of Object.entries(components)) {
  test(`${name} mounts without throwing${selector ? ` and renders ${selector}` : ""}`, { todo }, () => {
    document.body.innerHTML = "";
    const el = new Ctor(props);
    if (extraSetup) extraSetup(el);
    document.body.appendChild(el);
    assert.ok(el.isConnected, `${name} should be attached to the document`);
    if (selector) {
      assert.ok(el.querySelector(selector), `expected ${name} to render a "${selector}" element`);
    }
  });
}
