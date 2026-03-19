const CACHE_NAME = 'poetic-soul-v2';

// Install Event - Only cache offline fallback page or core assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting service worker to become the active service worker
});

// Activate Event - Clean up old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of all pages immediately
  );
});

// Fetch Event - Network First Strategy (Always fetch latest code)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before caching it
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, responseToCache);
          }
        });
        return response;
      })
      .catch(() => {
        // If network fails (offline), return cached version
        return caches.match(event.request);
      })
  );
});
