const CACHE_NAME = "version-1";
const urlsToCatche = ['index.html', 'offline.html'];
const self = this;
//indtall sw
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("open the cache");
                return cache.addAll(urlsToCatche);
            })
    )
})
//listen for request
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html'))
            })
    )
})
//activate the SW
self.addEventListener('activate', (event) => {
const cacheWhitelist=[];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map((cacheName)=>{
                if (!cacheWhitelist.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})