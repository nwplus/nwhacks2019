self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('nw-cache').then(function(cache) {
     return cache.addAll([
       '/',
     ]);
   })
 );
});
