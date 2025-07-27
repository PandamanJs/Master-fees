// Service Worker for performance optimization
const CACHE_NAME = 'masterfees-v1';
const STATIC_CACHE = 'masterfees-static-v1';
const API_CACHE = 'masterfees-api-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/src/main.tsx',
  '/src/index.css',
  // Add critical fonts
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== API_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      caches.open(API_CACHE)
        .then((cache) => {
          return fetch(request)
            .then((response) => {
              // Cache successful GET requests for 5 minutes
              if (request.method === 'GET' && response.status === 200) {
                const responseClone = response.clone();
                // Set cache with expiration
                cache.put(request, responseClone);
                setTimeout(() => {
                  cache.delete(request);
                }, 5 * 60 * 1000); // 5 minutes
              }
              return response;
            })
            .catch(() => {
              // Return cached version if network fails
              return cache.match(request);
            });
        })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(request).then((response) => {
          // Cache successful responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE)
              .then((cache) => cache.put(request, responseClone));
          }
          return response;
        });
      })
  );
});