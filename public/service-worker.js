const CACHE_VERSION = 'better-timer-v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/app.js',
  '/manifest.webmanifest'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(evt.request).then((networkResponse) => {
        if (evt.request.method === 'GET' && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(evt.request, responseClone);
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      if (evt.request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});

self.addEventListener('push', (evt) => {
  const data = evt.data ? evt.data.json() : {};
  const title = data.title || 'Timer Alert';
  const options = {
    body: data.body || 'Your timer has finished!',
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-192x192.svg',
    vibrate: [200, 100, 200],
    tag: 'timer-notification',
    requireInteraction: true
  };
  
  evt.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (evt) => {
  evt.notification.close();
  evt.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
