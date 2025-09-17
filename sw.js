// sw.js
const CACHE_NAME = 'zoka-cache-v4';
const ASSETS = [
  './',
  './index.html?v=8',
  './manifest.webmanifest?v=8',
  './sw.js?v=8'
];
/* install/activate/fetch ostaje isto kao ranije */

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
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request))
    );
  }
});
