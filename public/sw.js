// Service Worker for Barro & Fuego PWA
// Caches static assets and catalog data for offline access

const CACHE_NAME = 'barro-fuego-v1'
const STATIC_CACHE = 'static-v1'
const DATA_CACHE = 'data-v1'

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/favicon.svg',
]

// Install: cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Some assets may not exist yet, that's OK
      })
    }).then(() => self.skipWaiting())
  )
})

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DATA_CACHE)
          .map((name) => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch: network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // API requests: network first, then cache
  if (url.pathname.includes('/rest/v1/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseClone = response.clone()
          caches.open(DATA_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => caches.match(request))
    )
    return
  }

  // Static assets: cache first, then network
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        return cached || fetch(request).then((response) => {
          const responseClone = response.clone()
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        }).catch(() => {
          // Fallback for navigation requests
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/')
          }
        })
      })
    )
    return
  }

  // External resources: network first
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  )
})

// Message handler for cache updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  if (event.data && event.data.type === 'CACHE_CATALOG') {
    // Pre-cache catalog data
    event.waitUntil(
      caches.open(DATA_CACHE).then((cache) => {
        return cache.add(event.data.url).catch(() => {})
      })
    )
  }
})
