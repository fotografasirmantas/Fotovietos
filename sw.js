// Programėlė visada pirma ima naujausius failus iš interneto.
// Be interneto naudoja išsaugotą kopiją.
const CACHE = "fotovietos-v4";
const APP_FILES = [
  "./", "./index.html", "./vietos.js", "./manifest.webmanifest",
  "./icon.svg", "./icon-192.png", "./icon-512.png",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => Promise.all(APP_FILES.map(url => cache.add(url).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const ownFile = url.origin === self.location.origin;
  const leaflet = url.hostname === "unpkg.com";
  if (!ownFile && !leaflet) return;

  // Savi failai imami be naršyklės talpyklos, kad atnaujinimai matytųsi iškart
  const network = ownFile ? fetch(url.href, { cache: "no-cache" }) : fetch(request);

  event.respondWith(
    network
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() =>
        caches.match(request).then(cached =>
          cached || (request.mode === "navigate" ? caches.match("./index.html") : Response.error())
        )
      )
  );
});
