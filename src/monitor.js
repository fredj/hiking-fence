import {distance as coordinateDistance} from 'ol/coordinate';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import {LineString} from 'ol/geom';

import {setGeolocation, store} from './store';
import * as style from './style';
import Notifier from './notification';


export default class Monitor {

  constructor() {

    this.geolocation = new Geolocation();

    this.shortestLineFeature = new Feature(new LineString([]));
    this.shortestLineFeature.setStyle(style.shortestLine);

    this.geolocation.on('change:position', this.onPositionChange.bind(this));

    this.notifier = new Notifier(this.onAction.bind(this));

    this.fenceWidth = undefined;

    /**
     * @type {number}
     */
    this.difference = 0;

    /**
     * @type {boolean}
     */
    this.outside = false;

    /**
     * @type {boolean}
     */
    this.mutted = false;

    store.subscribe(() => this.onStoreChange());
  }

  onStoreChange() {
    const state = store.getState();
    if (state.fenceWidth) {
      this.fenceWidth = state.fenceWidth;
    }
  }

  onAction(eventData) {
    this.mutted = eventData.action === 'mute';
    this.notify();
  }

  onPositionChange(event) {
    setGeolocation(event.target.getPosition());

    return;
    const closest = this.segment.getClosestPoint(position);
    this.shortestLineFeature.getGeometry().setCoordinates([position, closest]);
    const distance = coordinateDistance(closest, position);

    this.difference = distance - this.fenceWidth;
    this.outside = this.difference > 0;
  }

  notify() {
    const actions = [];
    if (this.mutted) {
      actions.push({
        action: 'Unmute',
        title: 'Unmute'
      });
    } else {
      actions.push({
        action: 'mute',
        title: 'Mute'
      });
    }
    this.notifier.showNotification('You are lost!', {
      body: `${Math.round(this.difference)}m away from the track `,
      image: 'img/lost.jpg',
      tag: 'outside',
      renotify: !this.mutted,
      actions: actions
    });
  }

//  set outside(value) {
//    if (value) {
//      this.notify();
//    }
//    this.positionFeature.set('outside', value);
//    this.shortestLineFeature.set('outside', value);
//  }

  get tracking() {
    return this.geolocation.getTracking();
  }

  set tracking(value) {
    this.geolocation.setTracking(value);
    if (!value) {
      setGeolocation(null);
    }
    this.shortestLineFeature.set('visible', value);
  }
}
