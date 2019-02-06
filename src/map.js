import {Map, View} from 'ol';
import {Tile as TileLayer} from 'ol/layer';
import {TileJSON as TileJSONSource} from 'ol/source';

const mapbox_token = 'pk.eyJ1IjoiZnJlZGoiLCJhIjoiMndGNGNINCJ9.yG14Tih1Vtuge0hsjL0grA';

export const view = new View({
  center: [0, 0],
  zoom: 0
});

export const map = new Map({
  controls: [],
  layers: [
    new TileLayer({
      preload: Infinity,
      source: new TileJSONSource({
        url: `https://api.mapbox.com/v4/mapbox.outdoors.json?secure&access_token=${mapbox_token}`,
        crossOrigin: 'anonymous'
      })
    })
  ],
  view: view
});
