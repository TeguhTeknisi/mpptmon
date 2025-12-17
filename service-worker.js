const CACHE_NAME = 'mppt-monitoring-v1.2';

const urlsToCache = [
  '/mpptmon/',
  '/mpptmon/index.html',
  '/mpptmon/mqtt.min.js',
  '/mpptmon/chart.js',
  '/mpptmon/icons/icon-192x192.png',
  '/mpptmon/icons/icon-512x512.png'
];

// Install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/mpptmon/')
  );
});
