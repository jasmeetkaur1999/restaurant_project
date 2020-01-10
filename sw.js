const cacheName = "v6";
const cacheassests = ['./',
'./index.html',
'./restaurant.html?id=1',
'./restaurant.html?id=2',
'./restaurant.html?id=3',
'./restaurant.html?id=4',
'./restaurant.html?id=5',
'./restaurant.html?id=6',
'./restaurant.html?id=7',
'./restaurant.html?id=8',
'./restaurant.html?id=9',
'./restaurant.html?id=10',
'./css/styles.css',
'./js/dbhelper.js',
'./js/main.js',
'./js/restaurant_info.js',
'./data/restaurants.json',
'./img/1.jpg',
'./img/2.jpg',
'./img/3.jpg',
'./img/4.jpg',
'./img/5.jpg',
'./img/6.jpg',
'./img/7.jpg',
'./img/8.jpg',
'./img/9.jpg',
'./img/10.jpg'
]

//call install event 
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      cache.addAll(cacheassests);
    })
    .then(() => self.skipWaiting()) //put the files in the cache // available for offline viewing
  )
})
self.addEventListener("activate", e => {
  console.log('service worker: activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all (
        cacheNames.map(cache =>  {
          if (cache !== cacheName) {
            console.log('service Worker: clearing old chche');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('service worker: Fetching');
  e.respondWith(
    fetch(e.request)
    .then(res => {
    const resClone = res.clone();
    caches
    .open(cacheName)
    .then(cache => {
      cache.put(e.request, resClone)
    })
    return res;
  }).catch(err => caches.match(e.request).then(res => res))
  

  )
})