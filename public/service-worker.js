self.addEventListener('install', function(event) {
  console.log('install');
  event.waitUntil(skipWaiting());
});

self.addEventListener('activate', function(event) {
  console.log('activate');
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log('fetch');
});

self.addEventListener('message', (event) => {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage(event.data));
  })
});
