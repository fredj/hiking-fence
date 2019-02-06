import {distance as coordinateDistance} from 'ol/coordinate';
import {Feature, Geolocation} from 'ol';
import {Point, LineString} from 'ol/geom';
import {containsCoordinate} from 'ol/extent';

import * as style from './style';
import Notifier from './notification';


export default class Monitor extends EventTarget {

  constructor(view, segment, distance) {
    super();

    this.view = view;

    this.segment = segment;

    /**
     * @type {number}
     */
    this.distance = distance;

    this.geolocation = new Geolocation({
      projection: this.view.getProjection()
    });

    this.positionFeature = new Feature(new Point([]));
    this.positionFeature.setStyle(style.position);

    this.shortestLineFeature = new Feature(new LineString([]));
    this.shortestLineFeature.setStyle(style.shortestLine);

    this.geolocation.on('change:position', this.onPositionChange.bind(this));

    this.notifier = new Notifier(this.onAction.bind(this));

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
  }

  onAction(eventData) {
    this.mutted = eventData.action === 'mute';
    this.notify();
  }

  onPositionChange(event) {
    const position = event.target.getPosition();
    // fixme: recenter only if not in viewport
    if (!containsCoordinate(this.view.calculateExtent(), position)) {
      this.view.animate({
        center: position,
        duration: 250
      });
    }

    this.positionFeature.getGeometry().setCoordinates(position);

    const closest = this.segment.getClosestPoint(position);
    this.shortestLineFeature.getGeometry().setCoordinates([position, closest]);
    const distance = coordinateDistance(closest, position);

    this.difference = distance - this.distance;
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

  set outside(value) {
    if (value) {
      this.notify();
    }
    this.positionFeature.set('outside', value);
    this.shortestLineFeature.set('outside', value);

    const event = new CustomEvent('change', {
      detail: {
        outside: value,
        difference: this.difference
      }
    });
    this.dispatchEvent(event);
  }

  get tracking() {
    return this.geolocation.getTracking();
  }

  set tracking(value) {
    this.geolocation.setTracking(value);
    this.positionFeature.set('visible', value);
    this.shortestLineFeature.set('visible', value);
  }
}
