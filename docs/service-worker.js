// remove all service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister()
    }
  }).catch(function (err) {
    console.log('Service Worker registration failed: ', err);
  });
}

// remove old cache from nwhacks2018_static
oldCachePrefix = "sw-precache-v3";
caches.keys().then(function (cacheNames) {
  cacheNames.filter(function (cacheName) { 
    return cacheName.startsWith(oldCachePrefix);
  }).map(function (cacheName) {
    return caches.delete(cacheName);
  });
});

// force new service worker to activate
self.addEventListener('install', event => {
  self.skipWaiting();
});
