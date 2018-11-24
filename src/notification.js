export default class Notifier {

  constructor() {
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        navigator.serviceWorker.register('service-worker.js').then((registration) => {
          this.registration = registration;
        })
      }
    });
  }

  showNotification(title, options) {
    this.registration.showNotification(title, options);
  }
}
