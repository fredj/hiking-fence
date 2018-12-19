/* global clients */

const matchAllWindow = {
  type: 'window',
  includeUncontrolled: true
};

self.addEventListener('install', (event) => {

});

self.addEventListener('activate', event => {
  // event.waitUntil(clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  if (event.action) {
    clients.matchAll(matchAllWindow).then((windowClients) => {
      for (const windowClient of windowClients) {
        windowClient.postMessage({
          action: event.action
        });
      }
    });
  } else {
    // focus on window
    const promise = clients.matchAll(matchAllWindow).then((windowClients) => {
      for (const windowClient of windowClients) {
        return windowClient.focus();
      }
    });
    event.waitUntil(promise);
  }
});

self.addEventListener('notificationclose', (event) => {

});

// debug
self.addEventListener('fetch', (event) => {
  console.log('sw fetch', event.request.url);
});
