//Mock data - see how well this works
//TODO: fetch json, rather than import js

import GeoData from './mockData';

export const getCurrentLocation = () => {
  return [174.4487226, -36.6804325];
};

//For now, mock API calls
export const getMapData = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(GeoData);
    } catch (err) {
      reject(err);
    }
  });
};

export const getAddresses = str => {
  str = str.toLowerCase();
  return new Promise((resolve, reject) => {
    try {
      const scored = GeoData.nodes.map(obj => {
        return { ...obj, score: obj.addr.toLowerCase().indexOf(str) };
      });
      const filtered = scored.filter(s => s.score > -1);
      resolve(filtered.sort((a, b) => a.score - b.score));
    } catch (err) {
      reject(err);
    }
  });
};
