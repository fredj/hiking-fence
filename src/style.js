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
  return feature.get('outside') ? positionOutside : positionInside;
}

export function shortestLine(feature) {
  return feature.get('outside') ? shortestLineOutside : shortestLineInside;
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

const shortestLineBackgroundStyle = new Style({
  stroke: new Stroke({
    color: '#FFF',
    width: 8,
    lineDash: [8, 14]
  })
})

const shortestLineInside = [
  shortestLineBackgroundStyle,
  new Style({
    stroke: new Stroke({
      color: 'green',
      width: 4,
      lineDash: [8, 14]
    })
  })
];

const shortestLineOutside = [
  shortestLineBackgroundStyle,
  new Style({
    stroke: new Stroke({
      color: 'red',
      width: 4,
      lineDash: [8, 14]
    })
  })
];
