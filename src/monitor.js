import {distance as coordinateDistance} from 'ol/coordinate';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import {Point, LineString} from 'ol/geom';

import * as style from './style';
import Notifier from './notification';


export default class Monitor {

    constructor(view, segment, distance) {

      this.segment = segment;

      this.distance = distance;

      this.geolocation = new Geolocation({
        projection: view.getProjection()
      });

      this.positionFeature = new Feature(new Point([]));
      this.positionFeature.setStyle(style.position);

      this.shortestLineFeature = new Feature(new LineString([]));
      this.shortestLineFeature.setStyle(style.shortestLine);

      this.geolocation.on('change:position', this.onPositionChange.bind(this));

      this.notifier = new Notifier()
    }

    onPositionChange(event) {
      const position = event.target.getPosition();
      // fixme: recenter only if not in viewport
      //view.setCenter(position);
      this.positionFeature.getGeometry().setCoordinates(position);

      const closest = this.segment.getClosestPoint(position);
      this.shortestLineFeature.getGeometry().setCoordinates([position, closest]);
      const distance = coordinateDistance(closest, position);

      this.outside = distance > this.distance;
    }

    notify() {
      this.notifier.showNotification('Watch out!', {
          body: 'Your are almost dead',
          image: 'lost.jpg',
          tag: 'outside',
          renotify: true
      });
    }

    set outside(value) {
      if (value) {
        this.notify();
      }
      this.positionFeature.set('outside', value);
      this.shortestLineFeature.set('outside', value);
    }

    get tracking() {
      return this.geolocation.getTracking();
    }

    set tracking(value) {
      this.geolocation.setTracking(value);
    }
}
