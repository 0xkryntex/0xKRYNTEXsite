const CACHE_NAME = 'kryntex-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', evt => {
  console.log('[SW] Install');
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  console.log('[SW] Activate');
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  // não logar tudo — mas log de erro
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      if (resp) return resp;
      return fetch(evt.request).catch(err => {
        console.error('[SW] Fetch failed; returning offline fallback.', err);
        // opcional: return caches.match('/offline.html');
        throw err;
      });
    })
  );
});
