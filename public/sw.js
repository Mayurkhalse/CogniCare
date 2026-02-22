// public/sw.js
// A very basic service worker for PWA capabilities

const CACHE_NAME = 'cognicare-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // In a real app, you'd cache your main JS/CSS bundles
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
