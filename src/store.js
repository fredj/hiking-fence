import {createStore} from 'redux';
import {devToolsEnhancer} from 'redux-devtools-extension';


const INITIAL_STATE = {
  track: undefined,
  geolocation: undefined,
  fenceWidth: undefined,
  distance: undefined
};

export const actions = {
  SET_TRACK: 'SET_TRACK',
  SET_FENCE_WIDTH: 'SET_FENCE_WIDTH',
  SET_GEOLOCATION: 'SET_GEOLOCATION'
};

function reduce(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actions.SET_TRACK:
      return {
        ...state,
        track: action.track
      };
    case actions.SET_FENCE_WIDTH:
      return {
        ...state,
        fenceWidth: action.fenceWidth
      };
    case actions.SET_GEOLOCATION:
      return {
        ...state,
        geolocation: action.geolocation
      };
    case actions.TOGGLE_TRACKING:
      return {
        ...state,
        tracking: !state.tracking
      };
    default:
      return state;
  }
}

export const store = createStore(reduce, devToolsEnhancer({}));

export function setFenceWidth(width) {
  store.dispatch({
    type: actions.SET_FENCE_WIDTH,
    fenceWidth: width
  });
}

export function setGeolocation(geolocation) {
  store.dispatch({
    type: actions.SET_GEOLOCATION,
    geolocation: {
      type: 'Point',
      coordinates: geolocation
    }
  });
}

export function setTrack(coordinates) {
  store.dispatch({
    type: actions.SET_TRACK,
    track: {
      type: 'LineString',
      coordinates: coordinates
    }
  });
}
