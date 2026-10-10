/* Update CACHE_VERSION whenever the app's static files change. */
const CACHE_VERSION = 'khaksar-english-typing-v1.0.1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './assets/css/styles.css',
  './assets/js/data.js',
  './assets/js/typing-engine.js',
  './assets/js/storage.js',
  './assets/js/statistics.js',
  './assets/js/app.js',
  './assets/icons/favicon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response && response.ok && (response.type === 'basic' || response.type === 'default')) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match('./index.html');
        throw new Error('Resource is unavailable offline: ' + request.url);
      });
    })
  );
});
