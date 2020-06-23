// self.addEventListener("install", event => {
//     console.log("Service Worker installing.");
// });

// self.addEventListener("activate", event => {
//     console.log("Service Worker activating.");
// });

const CACHE_NAME = "V1";
const STATIC_CACHE_URLS = ["/", "/build/css/main.min.css", "/build/js/main.min.js"];

self.addEventListener("install", event => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
    );
});

self.addEventListener("activate", event => {
    console.log("Service Worker activating.");
});
<<<<<<< HEAD
self.addEventListener("fetch", event => {
    console.log(`Request of ${event.request.url}`);

    // default behaviour: request the network
    event.respondWith(fetch(event.request));
});
=======
>>>>>>> 60b232c8ef07ae9d0dd6b4a684255f6647e1c32a
