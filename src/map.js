import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile.js';
import TileJSON from 'ol/source/TileJSON.js';

const mapbox_token = 'pk.eyJ1IjoiZnJlZGoiLCJhIjoiMndGNGNINCJ9.yG14Tih1Vtuge0hsjL0grA';

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
    })
  ],
  loadTilesWhileInteracting: true,
  view: view
});
