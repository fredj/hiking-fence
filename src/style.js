import {Circle, Fill, Stroke, Style} from 'ol/style';

const positionBackgroundStyle = new Style({
  image: new Circle({
    radius: 10,
    fill: new Fill({
      color: '#fff'
    })
  })
});

const positionOutside = [
  positionBackgroundStyle,
  new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({
        color: '#f54435'
      })
    })
  })
];

const positionInside = [
  positionBackgroundStyle,
  new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({
        color: '#56b151'
      })
    })
  })
];

const shortestLineOutside = [
  new Style({
    stroke: new Stroke({
      color: '#fff',
      width: 8,
      lineDash: [8, 14]
    })
  }),
  new Style({
    stroke: new Stroke({
      color: '#f54435',
      width: 4,
      lineDash: [8, 14]
    })
  })
];


export const track = [
  new Style({
    stroke: new Stroke({
      color: '#fff',
      width: 8
    })
  }),
  new Style({
    stroke: new Stroke({
      color: '#3399CCFF',
      width: 4
    })
  })
];

export const buffer = [
  new Style({
    fill: new Fill({
      color: '#3399CC33'
    })
  })
];

export function position(feature) {
  if (feature.get('visible')) {
    return feature.get('outside') ? positionOutside : positionInside;
  }
}

export function shortestLine(feature) {
  if (feature.get('visible')) {
    return feature.get('outside') ? shortestLineOutside : null;
  }
}
