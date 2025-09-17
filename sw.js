// sw.js (primer)
const CACHE_NAME = 'zoka-cache-v5';
const ASSETS = [
  './',
  './index.html?v=81',
  './manifest.webmanifest?v=81',
  './sw.js?v=81'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
  }
});
