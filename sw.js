// Service Worker - sw.js
console.log("Service Worker loaded successfully.");

const CACHE_NAME = "ee-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/style.css",
    "/script.js",
    "/E-E_App_192.png",
    "/E-E_App_512.png",  // <-- Added missing comma
    "/adm-foundation/dist/style.css",
    "/adm-foundation/src/style.css",
    "/adm-foundation/LICENSE.txt",
    "/adm-foundation/README.md",
    "/google1eeb1b109c640f49.html"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("Opened cache");
                return cache.addAll(urlsToCache)
                    .then(() => console.log("All resources cached successfully"))
                    .catch((error) => console.error("Failed to cache all resources:", error));
            })
            .catch((error) => console.error("Failed to open cache:", error))
    );
});

// Fetch resources from cache
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
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
