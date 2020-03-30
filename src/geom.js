import GeoJSON from 'ol/format/GeoJSON';

import buffer from '@turf/buffer';

export function getBufferCoordinates(geom, projection, distance) {
  const format = new GeoJSON({
    featureProjection: projection
  });
  const geojsonGeom = format.writeGeometryObject(geom);
  const bufferFeature = format.readFeature(buffer(geojsonGeom, distance / 1000));

  return bufferFeature.getGeometry().getCoordinates();
}
