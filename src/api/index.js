import GeoData from './geodata';

const getLocation = geom => {
  return [174.4487226, -36.6804325];
};

// const addresses = ['123 Some Street', '12 Some Street', '99 No Street'];
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
  return Promise.resolve(GeoData);
};

export const getAddresses = str => {
  str = str.toLowerCase();
  const scored = addresses.map(obj => {
    return { ...obj, score: obj.addr.toLowerCase().indexOf(str) };
  });
  const filtered = scored.filter(s => s.score > -1);
  return Promise.resolve(filtered.sort((a, b) => a.score - b.score));
};
