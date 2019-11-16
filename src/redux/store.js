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

reducers.destinations = (destinations = [], { type, payload }) => {
  switch (type) {
    case 'DEST_CLEAR':
      return [];
    case 'DEST_ADD':
      return [...destinations, payload];
    case 'DEST_REMOVE':
      return destinations.filter(d => {
        return d !== payload;
      });
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
  test: (z, actn) => {
    console.log(actn);
    return 1;
  },
  zoom: (zoom = 1, actn) =>
    actn.type === 'MAP_SET_ZOOM' ? actn.payload : zoom,
  data: (data = { nodes: [], links: [] }, actn) =>
    actn.type === 'MAP_SET_DATA' ? actn.payload : data,
  x: (x = 0, actn) => (actn.type === 'MAP_SET_XY' ? actn.payload.x : x),
  y: (y = 0, actn) => (actn.type === 'MAP_SET_XY' ? actn.payload.y : y)
});

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

export default store;
