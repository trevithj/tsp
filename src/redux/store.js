import { createStore, combineReducers } from 'redux';

const initialState = {};

const reducers = {};

reducers.view = (view = 'home', { type, payload }) => {
  switch (type) {
    case 'SET_VIEW':
      return payload;
    default:
      return view;
  }
};

const defaultTimer = { time: -1, dest: false };
reducers.timer = (timer = defaultTimer, { type, payload }) => {
  switch (type) {
    case 'DEST_CLEAR':
      return defaultTimer;
    case 'DEST_ADD':
      return { time: new Date().getTime(), dest: payload };
    default:
      return timer;
  }
};

reducers.message = (message = '', { type, payload }) => {
  return type === 'SET_MSG' ? payload : message;
};

reducers.destinations = (destinations = {}, { type, payload }) => {
  switch (type) {
    case 'DEST_CLEAR':
      return {};
    case 'DEST_ADD':
      return { ...destinations, [payload.addr]: payload };
    case 'DEST_REMOVE':
      return Object.keys(destinations).reduce((newDest, addr) => {
        if (addr !== payload.addr) newDest[addr] = destinations[addr];
        return newDest;
      }, {});
    default:
      return destinations;
  }
};

reducers.search = (search = { text: '', results: [] }, { type, payload }) => {
  switch (type) {
    case 'SET_SEARCH_TEXT':
      return { ...search, text: payload };
    case 'SET_SEARCH_RESULTS':
      return { ...search, results: payload };
    default:
      return search;
  }
};

reducers.map = combineReducers({
  data: (data = { nodes: [], links: [] }, actn) => {
    console.log(actn);
    switch (actn.type) {
      case 'MAP_SET_DATA':
        return actn.payload; //clear the tour here
      case 'MAP_SET_TOUR':
        return { ...data, tour: actn.payload };
      default:
        return data;
    }
  },
  zoom: (zoom = 1, actn) =>
    actn.type === 'MAP_SET_ZOOM' ? actn.payload : zoom,
  x: (x = 0, actn) => (actn.type === 'MAP_SET_X' ? actn.payload : x),
  y: (y = 0, actn) => (actn.type === 'MAP_SET_Y' ? actn.payload : y)
});

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

export default store;
