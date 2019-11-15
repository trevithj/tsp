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
    case 'DEST_DELETE':
      return destinations.filter(d => {
        return d !== payload;
      });
    default:
      return destinations;
  }
};

reducers.search = (search = {}, { type, payload }) => {
  switch (type) {
    case 'SEARCH_TEXT':
      return { ...search, text: payload };
    case 'SEARCH_RESULTS':
      return { ...search, results: payload };
    default:
      return search;
  }
};

reducers.map = (map = { zoom: 1 }, { type, payload }) => {
  switch (type) {
    case 'MAP_SET_ZOOM':
      return { ...map, zoom: payload };
    default:
      return map;
  }
};
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

export default store;
