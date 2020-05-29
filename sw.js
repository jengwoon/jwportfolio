let cacheName = 'portfolio-1';
let filesToCache = [
  'index.html', 'about.html', 'skills.html', 'work.html', 'contact.html',
  'style-nav.css', 'style.css', 'style-about.css', 'style-skills.css', 'style-work.css', 'style-contact.css',
  'home/buildings.jpg', 'home/home-me.jpg',
  'about/avatar.jpg', 'about/birds.jpg', 'about/frisbee.jpg', 'about/nusbeyond.jpg', 'about/scenery.jpg',
  'skills/computer.jpg', 'skills/orange.jpg','skills/work.jpg',
  'images/airplane.jpg', 'images/bells.jpg', 'images/camera.jpg', 'images/christmas.jpg', 'images/elephant.jpg',
  'images/japanguy.jpg', 'images/scenery2.jpg', 'images/scenery3.jpg', 'images/scenery4.jpg', 'images/smiles.jpg',
  'contact/avatar.jpg', 'contact/bulb.jpg',
  'script.js',
]

/* 
start the service worker, when the user access
the website online. This will add the all the files 
listed in filesToCache to the browser cache.
*/
self.addEventListener('install', function(e){
  console.log("on install")
    console.log(cacheName);
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log("Adding files to cache")
      return cache.addAll(filesToCache)
    })
  )
})

/*
If offline or if the file exists in the cache, then it will fetch the files from cache
*/
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request,{
        cacheName: cacheName
    }).then(function(response){
        console.log("Fetching "+e.request.url);
      return response || fetch (e.request)
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});