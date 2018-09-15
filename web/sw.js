var CACHE_NAME = 'nw-cache'
var CACHED_ROUTES = ['/']

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHED_ROUTES);
    })
  );
});

// Offline-first
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
