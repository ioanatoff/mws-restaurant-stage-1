self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('static-v1').then(function(cache) {
            for (let i = 1; i <= 10; i++) {
                cache.add(`img/${i}.jpg`);
                cache.add(`restaurant.html?id=${i}`);
            }

            return cache.addAll([
                '/',
                'css/styles.css',
                'css/restaurant.css',
                'css/home.css',
                'js/main.js',
                'js/dbhelper.js',
                'js/restaurant_info.js',
                'data/restaurants.json'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
