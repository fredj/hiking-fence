export default class Notifier {

  constructor(actionHandler) {
    navigator.serviceWorker.register('service-worker.js').then((registration) => {
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          this.registration = registration;

          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.action) {
              actionHandler(event.data);
            }
          });
        }
      });
    });
  }

  showNotification(title, options) {
    if (this.registration) {
      this.registration.showNotification(title, options);
    }
  }
}
