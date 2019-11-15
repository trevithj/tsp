import GeoData from './geodata';
// import * as GeoData from './geodata.geojson';

const getLocation = geom => {
  return [174.4487226, -36.6804325];
};

const addresses = GeoData.features
  .map(f => {
    const obj = {};
    obj.loc = getLocation(f.geometry);
    const name = f.properties.name || '';
    const nmbr = f.properties['addr:housenumber'] || '';
    const street = f.properties['addr:street'] || '';
    if (nmbr === '' && street === '') return 'zip';
    if (name === '') obj.addr = `${nmbr} ${street}`;
    else obj.addr = `${name}, ${nmbr} ${street}`;
    return obj;
  })
  .filter(a => a !== 'zip');

//For now, mock API calls
export const getMapData = () => {
  const g2 = { ...GeoData };
  g2.features = GeoData.features.filter(f => {
    return f.geometry.type !== 'Point';
    // return f.geometry.type === 'Polygon';
    // return f.geometry.type === 'MultiLineString';
    // return f.geometry.type === 'LineString';
  });
  return Promise.resolve(g2);
};

export const getAddresses = str => {
  str = str.toLowerCase();
  return new Promise((resolve, reject) => {
    try {
      const scored = addresses.map(obj => {
        return { ...obj, score: obj.addr.toLowerCase().indexOf(str) };
      });
      const filtered = scored.filter(s => s.score > -1);
      resolve(filtered.sort((a, b) => a.score - b.score));
    } catch (err) {
      reject(err);
    }
  });
};
