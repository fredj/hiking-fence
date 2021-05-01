import {Map, View} from 'ol';
import {Tile as TileLayer} from 'ol/layer';
import {TileJSON as TileJSONSource} from 'ol/source';

const token = 'RT4ksaerAd67XEsgQmSo';

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
        url: `https://api.maptiler.com/maps/topo/tiles.json?key=${token}`,
        tileSize: 512,
        crossOrigin: 'anonymous'
      })
    })
  ],
  view: view
});
