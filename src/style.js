import {Circle, Fill, Stroke, Style} from 'ol/style';


export const track = [
  new Style({
    stroke: new Stroke({
      color: '#FFF',
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

const positionBackgroundStyle = new Style({
  image: new Circle({
    radius: 10,
    fill: new Fill({
      color: '#FFF'
    })
  })
});

const positionOutside = [
  positionBackgroundStyle,
  new Style({
    image: new Circle({
      radius: 8,
      fill: new Fill({
        color: 'red'
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
        color: 'green'
      })
    })
  })
];

const shortestLineOutside = [
  new Style({
    stroke: new Stroke({
      color: '#FFF',
      width: 8,
      lineDash: [8, 14]
    })
  }),
  new Style({
    stroke: new Stroke({
      color: 'red',
      width: 4,
      lineDash: [8, 14]
    })
  })
];
