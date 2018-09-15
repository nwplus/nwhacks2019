var CACHE_NAME = 'nw-cache'
var CACHED_ROUTES = ['/']

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHED_ROUTES);
    })
  );
});
