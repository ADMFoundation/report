// Service Worker - sw.js

const CACHE_NAME = "ee-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/style.css",
    "/script.js",
    "/E-E_App_192.png",
    "/E-E_App_512.png"
    "/adm-foundation/adm-foundation/dist/style.css",
    "/adm-foundation/adm-foundation/src/style.css",
    "/adm-foundation/admfoundation/src/LICENSE.txt",
    "/adm-foundation/admfoundation/src/README.md",
    "/adm-foundation/dist/style.css",
    "/adm-foundation/src/style.css",
    "/adm-foundation/LICENSE.txt",
    "/adm-foundation/README.md",
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache)
          .then(() => {
            console.log("All resources cached successfully");
          })
          .catch((error) => {
            console.error("Failed to cache all resources:", error);
            // Optionally: You might decide to delete the cache here if caching failed completely.
            // return caches.delete(CACHE_NAME);
          });
      })
      .catch((error) => {
        console.error("Failed to open cache:", error);
      })
  );
});

// Fetch resources from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log("Deleting old cache:", cache);
              return caches.delete(cache);
            }
          })
        );
      })
  );
});
