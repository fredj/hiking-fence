import Map from 'ol/Map';
import View from 'ol/View';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GPX from 'ol/format/GPX';
import GeoJSON from 'ol/format/GeoJSON';
import {Fill, Stroke, Style} from 'ol/style';

import buffer from '@turf/buffer';

const geojson = new GeoJSON({
  featureProjection: 'EPSG:3857'
});

const view = new View({
  center: [0, 0],
  zoom: 0
});
const buffered = new VectorSource();

const track = new VectorSource({
  url: 'track.gpx',
  format: new GPX()
});
track.on('addfeature', (event) => {
  const geom = event.feature.getGeometry();
  if (geom.getType() == 'MultiLineString') {
    const polygon = geojson.readFeature(buffer(geojson.writeGeometryObject(geom), 0.05));
    buffered.addFeature(polygon);
    view.fit(polygon.getGeometry());
  }
});

const map = new Map({
  target: 'map',
  controls: [],
  layers: [
    new VectorLayer({
      source: track,
      style: new Style({
        stroke: new Stroke({
          color: '#3399CCFF',
          width: 3
        })
      })
    }),
    new VectorLayer({
      source: buffered,
      style: new Style({
        fill: new Fill({
          color: '#3399CC11'
        })
      })
    })
  ],
  view: view
});
