import {loadFeaturesXhr} from 'ol/featureloader';
import GPX from 'ol/format/GPX';

import {setTrack} from './store';

export function load(url) {
  const loader = loadFeaturesXhr(url, new GPX(), (features) => {
    for (const feature of features) {
      const geometry = feature.getGeometry();
      const type = geometry.getType();
      let line;
      if (type === 'MultiLineString') {
        line = geometry.getLineString(0);
      } else if (type === 'LineString') {
        line = geometry;
      }
      if (line) {
        // FIXME: only keep XY
        setTrack(line.getCoordinates());
      }
    }
  });
  loader();
}
