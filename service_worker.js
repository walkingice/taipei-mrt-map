var cacheName = 'taipei_mrt_map_v0.001';
var filesToCache = [
    'manifest.json',
    'imgs/ic.png',
    'script.js',
    'taipei.svg',
    'taipei.png',
    '.',
    'index.html' // no slash
];

self.addEventListener('install', function(e) {
    console.log('[SW] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[SW] Caching app shell');
            return cache.addAll(filesToCache).then(function () {
                console.log('[SW] Cache done');
            }, function (e) {
                console.error('[SW] Cache fail', e);
            });
        })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[SW] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[SW] Removing old cache', key);
                    return caches.delete(key).then(function () {
                        console.log('[SW] removed ', key);
                    });
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(e) {
    var log = '[SW] Fetch' + e.request.url;
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if (response) {
                console.log(log, 'using cache');
                return response;
            } else {
                console.log(log, 'remote fetching');
                return fetch(e.request);
            }
        })
    );
});

