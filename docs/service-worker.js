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

// remove old caches
oldCaches = [
  "sw-precache-v3--https://www.nwhacks.io/", // from nwhacks2018_static
];
caches.keys().then(function (cacheNames) {
  cacheNames.filter(function (cacheName) {
    return (oldCaches.indexOf(cacheName) > -1)
  }).map(function (cacheName) {
    return caches.delete(cacheName);
  });
});
