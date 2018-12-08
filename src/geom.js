import buffer from '@turf/buffer';

export function getBuffer(line, distance) {
  if (line) {
    return buffer(line, distance / 1000).geometry;
  }
}
