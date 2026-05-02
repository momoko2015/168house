const CACHE_NAME = '88loft-v3';
const ASSETS = [
    '/',
    '/hk.html',
    '/jp.html',
    '/cn.html',
    '/usa.html',
    '/wanted.html',
    '/404.html',
    '/style.css',
    '/app.js',
    '/utils.js',
    '/logo.png'
];

// Install and Cache Assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(ASSETS);
        })
    );
});

// Activate and Clean up Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Clearing old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Stale-While-Revalidate Strategy
self.addEventListener('fetch', event => {
    // Skip non-GET requests and API calls for fresh data
    if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // If response is valid, update cache
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    
                    // If network returns 404 for a page navigation, try serving 404.html from cache
                    if (networkResponse.status === 404 && event.request.mode === 'navigate') {
                        return cache.match('/404.html');
                    }
                    
                    return networkResponse;
                }).catch(() => {
                    // If network fails completely (offline), and it's a navigation, return 404.html or offline page
                    if (event.request.mode === 'navigate') {
                        return cache.match('/404.html');
                    }
                });

                return response || fetchPromise;
            });
        })
    );
});
