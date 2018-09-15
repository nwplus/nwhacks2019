const CACHE_NAME = 'nw-cache';
const CACHED_ROUTES = [
  '/',
];

this.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHED_ROUTES))
  );
});

// Offline-first
this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
