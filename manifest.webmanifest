// sw.js
const CACHE_NAME = 'zoka-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  // dodaj ovde ikonice ako ih imaš:
  // './icon-192.png',
  // './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Cache-first za iste domene (GitHub Pages ili lokalno)
  if (new URL(req.url).origin === location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req).then((res) => {
        // pokušaj da dopuniš keš u hodu
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(()=>{});
        return res;
      }).catch(() => caches.match('./index.html')))
    );
  }
});
