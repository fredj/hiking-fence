import {Feature} from 'ol';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {GPX} from 'ol/format';
import {LineString, Polygon} from 'ol/geom';
import {loadFeaturesXhr} from 'ol/featureloader';

import * as style from './style';
import {map, view} from './map';
import {getBufferCoordinates} from './geom';
import Monitor from './monitor';


/**
 * @type {LineString}
 */
const segmentGeometry = new LineString([]);

/**
 * @type {Feature}
 */
const segmentFeature = new Feature(segmentGeometry);
segmentFeature.setStyle(style.track);

/**
 * @type {Polygon}
 */
const bufferGeometry = new Polygon([]);

/**
 * @type {Feature}
 */
const bufferFeature = new Feature(bufferGeometry);
bufferFeature.setStyle(style.buffer);

const searchParams = new URLSearchParams(location.search);

const fenceWidth = searchParams.has('width') ? searchParams.get('width') : 75;

const loader = loadFeaturesXhr(searchParams.get('gpx'), new GPX(), (features, projection) => {
  for (const feature of features) {
    const geom = feature.getGeometry();
    const type = geom.getType();
    if (type === 'MultiLineString' || type === 'LineString') {
      geom.transform(projection, view.getProjection());
      if (geom.getLineString) {
        // MultiLineString
        segmentGeometry.setCoordinates(geom.getLineString(0).getCoordinates());
      } else {
        segmentGeometry.setCoordinates(geom.getCoordinates());
      }
      const polygonCoordinates = getBufferCoordinates(segmentGeometry, view.getProjection(), fenceWidth);
      bufferGeometry.setCoordinates(polygonCoordinates);
      view.fit(bufferGeometry);
    }
  }
});
loader();

map.setTarget('map');

const monitor = new Monitor(view, segmentGeometry, fenceWidth);

map.addLayer(
  new VectorLayer({
    source: new VectorSource({
      features: [
        segmentFeature, bufferFeature
      ]
    }),
    updateWhileInteracting: true
  })
);
map.addLayer(
  new VectorLayer({
    source: new VectorSource({
      features: [
        monitor.positionFeature, monitor.shortestLineFeature
      ]
    }),
    updateWhileInteracting: true
  })
);

const startButton = document.querySelector('.controls .start');
const stopButton = document.querySelector('.controls .stop');

startButton.addEventListener('click', () => {
  monitor.tracking = true;
  startButton.style.display = 'none';
  stopButton.style.display = '';
});

stopButton.addEventListener('click', () => {
  monitor.tracking = false;
  startButton.style.display = '';
  stopButton.style.display = 'none';
});
