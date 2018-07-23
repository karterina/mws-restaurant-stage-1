// new cache
let myCache = "restaurants-rviews-cache"

// urls to add to the new cahce
let urls = [
  "./sw.js",
  "/",
  "./index.html",
  "./restaurant.html",
  "./css/styles.css",
  "./js/dbhelper.js",
  "./js/main.js",
  "./js/restaurant_info.js",
  "./data/restaurants.json",
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
]

// installing the service worker
self.addEventListener("install", e => {
  e.waitUntil(caches.open(myCache).then(cache => cache.addAll(urls)).then(self.skipWaiting()));
});

// activating
self.addEventListener("activate", e => {
  e.waitUntil(self.clients.claim());
});

// returning visited pages when offline
// from https://getinstance.info/articles/javascript/introduction-to-service-workers/
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(e.request);
      })
  )
});
