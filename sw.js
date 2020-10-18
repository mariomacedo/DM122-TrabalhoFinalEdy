const cacheName = "app-shell-v2";
const assetsToCache = ["offline.html"];

function removeOldCache(key) {
  if (key !== cacheName) {
    console.log(`[Service Worker] Removing old cache: ${key}`);
    return caches.delete(key);
  }
}

async function cacheCleanUp() {
  const keyList = await caches.keys();
  return Promise.all(keyList.map(removeOldCache));
}

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName);
  return cache.addAll(assetsToCache);
}

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing service worker...", event);
  event.waitUntil(cacheCleanUp());
  event.waitUntil(cacheStaticAssets());
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activating service worker...", event);
  return self.clients.claim();
});

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(cacheName);
    return cache.match(request);
  }
}

async function cacheFirst(request) {
  try {
    const cache = await caches.open(cacheName);
    return cache.match(request);
  } catch (error) {
    return await fetch(request);
  }
}

self.addEventListener("fetch", (event) => {
  //console.log(`[Service Worker] Fetch event: ${event.request.url}`);
  event.respondWith(cacheFirst(event.request));
});
