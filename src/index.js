import {map} from './map';
import Monitor from './monitor';
import {load} from './gpx';
import {setFenceWidth} from './store';

const searchParams = new URLSearchParams(location.search);

setFenceWidth(searchParams.has('width') ? searchParams.get('width') : 75);

load(searchParams.get('gpx'));

map.setTarget('map');

const monitor = new Monitor();

document.querySelector('.start').addEventListener('click', () => {
  monitor.tracking = true;
});

document.querySelector('.stop').addEventListener('click', () => {
  monitor.tracking = false;
});

document.querySelector('.abc').addEventListener('click', () => {
  setFenceWidth(50);
});
