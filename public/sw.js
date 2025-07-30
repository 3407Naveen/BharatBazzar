const CACHE_NAME = 'bharatbazzar-v1';
const urlsToCache = [
  '/',
  '/create',
  '/dashboard',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // Return a fallback page when offline
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline product creation
self.addEventListener('sync', (event) => {
  if (event.tag === 'product-sync') {
    event.waitUntil(syncProducts());
  }
});

async function syncProducts() {
  // This would sync offline created products when back online
  const offlineProducts = await getOfflineProducts();
  for (const product of offlineProducts) {
    try {
      // Send to server when online
      await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Remove from offline storage after successful sync
      await removeOfflineProduct(product.id);
    } catch (error) {
      console.log('Sync failed for product:', product.id);
    }
  }
}

async function getOfflineProducts() {
  // Get products from IndexedDB or localStorage
  return [];
}

async function removeOfflineProduct(productId) {
  // Remove synced product from offline storage
}