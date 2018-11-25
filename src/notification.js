export default class Notifier {

  constructor() {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.register('service-worker.js').then((registration) => {
          this.registration = registration;
        });

        navigator.serviceWorker.addEventListener('message', (event) => {
          console.log('from service worker:', event);
        });
      }
    });
  }

  showNotification(title, options) {
    if (this.registration) {
      this.registration.showNotification(title, options);
    }
  }
}
