const CACHE_NAME = 'calorie-tracker-v16';
const ASSETS = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/calorie-calculator.js',
    './js/food-database.js',
    './js/exercise-database.js',
    './js/storage.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Install: cache all assets, activate immediately
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches, take control immediately
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys
                .filter(k => k !== CACHE_NAME)
                .map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// Fetch: NETWORK-FIRST — always try to get latest, fall back to cache offline
self.addEventListener('fetch', event => {
    // Don't cache external API calls
    if (event.request.url.includes('api.anthropic.com')) {
        event.respondWith(fetch(event.request));
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Got a fresh response — update the cache
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => {
                // Network failed — serve from cache (offline support)
                return caches.match(event.request)
                    .then(cached => cached || caches.match('./index.html'));
            })
    );
});
