self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("kryntex-cache").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((resp) => {
      return resp || fetch(e.request);
    })
  );
});
