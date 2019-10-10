import {Feature} from 'ol';
import {Vector as VectorSource} from 'ol/source';
import {Vector as VectorLayer} from 'ol/layer';
import {GPX} from 'ol/format';
import {LineString, Polygon} from 'ol/geom';
import {loadFeaturesXhr} from 'ol/featureloader';

import {getUser, signIn} from './auth';
import * as style from './style';
import {map, view} from './map';
import {getBufferCoordinates} from './geom';
import Monitor from './monitor';

import './component/app-avatar.js';

// ui
import '@polymer/app-layout/app-layout.js';
import '@material/mwc-fab';

// firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';

/**
 * @type {LineString}
 */
const segmentGeometry = new LineString([]);

/**
 * @type {Feature}
 */
const segmentFeature = new Feature(segmentGeometry);
segmentFeature.setStyle(style.track);

/**
 * @type {Polygon}
 */
const bufferGeometry = new Polygon([]);

/**
 * @type {Feature}
 */
const bufferFeature = new Feature(bufferGeometry);
bufferFeature.setStyle(style.buffer);

const searchParams = new URLSearchParams(location.search);

const fenceWidth = searchParams.has('width') ? searchParams.get('width') : 75;

const loader = loadFeaturesXhr(searchParams.get('gpx'), new GPX(), (features, projection) => {
  for (const feature of features) {
    const geom = feature.getGeometry();
    const type = geom.getType();
    if (type === 'MultiLineString' || type === 'LineString') {
      geom.transform(projection, view.getProjection());
      if (geom.getLineString) {
        // MultiLineString
        segmentGeometry.setCoordinates(geom.getLineString(0).getCoordinates());
      } else {
        segmentGeometry.setCoordinates(geom.getCoordinates());
      }
      const polygonCoordinates = getBufferCoordinates(segmentGeometry, view.getProjection(), fenceWidth);
      bufferGeometry.setCoordinates(polygonCoordinates);
      view.fit(bufferGeometry);
    }
  }
});
loader();

map.setTarget('map');

const monitor = new Monitor(view, segmentGeometry, fenceWidth);

map.addLayer(
  new VectorLayer({
    source: new VectorSource({
      features: [
        segmentFeature, bufferFeature
      ]
    }),
    updateWhileInteracting: true
  })
);
map.addLayer(
  new VectorLayer({
    source: new VectorSource({
      features: [
        monitor.positionFeature, monitor.shortestLineFeature
      ]
    }),
    updateWhileInteracting: true
  })
);


document.querySelector('.monitor').addEventListener('click', event => {
  monitor.tracking = !monitor.tracking;
  event.target.icon = monitor.tracking ? "stop" : "play_arrow";
});


const firebaseConfig = {
  apiKey: "AIzaSyB5RUYYnKsSVOV__RTwiQS4h3Yi-pG-tbA",
  authDomain: "hiking-fence.firebaseapp.com",
  databaseURL: "https://hiking-fence.firebaseio.com",
  projectId: "hiking-fence",
  storageBucket: "",
  messagingSenderId: "915490164223",
  appId: "1:915490164223:web:ad338209a3b63196bdebca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const avatar = document.querySelector('app-avatar')

getUser().then(user => {
  if (user) {
    avatar.user = user;
    console.log(user.displayName, user.email);
  } else {
    signIn();
  }
});
