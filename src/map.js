import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import TileJSON from 'ol/source/TileJSON.js';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import {Point} from 'ol/geom';
import {containsCoordinate} from 'ol/extent';


import {getBuffer} from './geom';
import {store} from './store';
import * as style from './style';


const mapbox_token = 'pk.eyJ1IjoiZnJlZGoiLCJhIjoiMndGNGNINCJ9.yG14Tih1Vtuge0hsjL0grA';

const trackFeature = new Feature();
trackFeature.setStyle(style.track);

const bufferFeature = new Feature();
bufferFeature.setStyle(style.buffer);

const geolocationFeature = new Feature();
geolocationFeature.setStyle(style.position);

const shortestLineFeature = new Feature();
shortestLineFeature.setStyle(style.shortestLine);

const geojson = new GeoJSON();

export const view = new View({
  center: [0, 0],
  zoom: 0
});

export const map = new Map({
  controls: [],
  layers: [
    new TileLayer({
      source: new TileJSON({
        url: `https://api.mapbox.com/v4/mapbox.outdoors.json?secure&access_token=${mapbox_token}`,
        crossOrigin: 'anonymous'
      })
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [
          geolocationFeature, shortestLineFeature,
          trackFeature, bufferFeature
        ]
      }),
      updateWhileInteracting: true
    })
  ],
  loadTilesWhileInteracting: true,
  view: view
});


function getGeometryObject(geometry, projection) {
  return geojson.readGeometry(geometry).transform('EPSG:4326', projection);
}

store.subscribe(() => {
  const state = store.getState();
  const projection = view.getProjection();
  if (state.track) {
    trackFeature.setGeometry(getGeometryObject(state.track, projection));
    if (state.fenceWidth) {
      const buffer = getBuffer(state.track, state.fenceWidth);
      bufferFeature.setGeometry(getGeometryObject(buffer, projection));

      view.fit(bufferFeature.getGeometry());
    }
  }

  if (state.geolocation) {
    geolocationFeature.setGeometry(getGeometryObject(state.geolocation, projection));
    // if (!containsCoordinate(view.calculateExtent(), position)) {
    //   this.view.animate({
    //     center: position,
    //     duration: 250
    //   });
    // }
  } else {
    geolocationFeature.setGeometry(null);
  }
});
