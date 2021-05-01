import {Feature} from 'ol';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {GPX} from 'ol/format';
import {LineString, Polygon} from 'ol/geom';

import * as style from './style';
import {map, view} from './map';
import {getBufferCoordinates} from './geom';
import Monitor from './monitor';

// ui
import '@material/mwc-fab';

import './style.css';


const segmentGeometry = new LineString([]);

const segmentFeature = new Feature(segmentGeometry);
segmentFeature.setStyle(style.track);

const bufferGeometry = new Polygon([]);

const bufferFeature = new Feature(bufferGeometry);
bufferFeature.setStyle(style.buffer);

const searchParams = new URLSearchParams(location.search);

const fenceWidth = searchParams.has('width') ? searchParams.get('width') : 75;

fetch(searchParams.get('gpx')).then(response => response.text()).then(data => {
  const reader = new GPX();
  const features = reader.readFeatures(data, {
    featureProjection: view.getProjection()
  });
  for (const feature of features) {
    const geom = feature.getGeometry();
    const type = geom.getType();
    if (type === 'MultiLineString' || type === 'LineString') {
      // geom.transform(projection, view.getProjection());
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


document.querySelector('.monitor').addEventListener('click', event => {
  monitor.tracking = !monitor.tracking;
  event.target.icon = monitor.tracking ? 'stop' : 'play_arrow';
});
