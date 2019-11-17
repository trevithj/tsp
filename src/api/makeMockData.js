//Make mock data - node script
//  node makeMockData.js > mockData.js
// const rand = max => Math.round((Math.random() * max) / 20) * 20;
const getRand = arr => arr[Math.floor(Math.random() * arr.length)];

const prefixes = 'Ar Be Co Del En Fin Gel Har Inn Jes Kai Lo Mac Ne O Pa Ra So Tre Van Will'.split(
  ' '
);
const suffixes = 'an bon chel den fe gar holm jar kaka lear mun nagle para pen rie sen tule vet way'.split(
  ' '
);

const makeStreets = (n, type = 'St', map = {}) => {
  //Use map - no duplicates
  while (n > 0) {
    const prefix = getRand(prefixes);
    const street = `${prefix}${getRand(suffixes)} ${type}`;
    map[street] = 1;
    n -= 1;
  }
  return map;
};

const getStreets = n => {
  n = Math.round(n / 4);
  const nameMap = makeStreets(n * 2, 'St');
  makeStreets(n, 'Rd', nameMap);
  makeStreets(n, 'Ave', nameMap);
  return Object.keys(nameMap);
};

const makeNodes = (width, height, p = 0.7) => {
  const streets = getStreets(Math.round(width + height / 10));
  const nodes = {};
  let w = 0;

  while (w < width) {
    let h = 0;
    const street = getRand(streets);
    let nbr = 0;
    while (h < height) {
      if (Math.random() < p) {
        nbr += Math.round(Math.random() * 10) + 1;
        const node = {
          coords: [w, h],
          addr: `${nbr} ${street}`
        };
        nodes[node.addr] = node;
      }
      h += 20;
    }
    w += 20;
  }
  return Object.values(nodes);
};

const makeLink = (src, tgt) => {
  const link = { x: [], y: [] };
  link.x.push(src.coords[0]);
  link.y.push(src.coords[1]);
  link.x.push(src.coords[0]);
  link.y.push(tgt.coords[1]);
  link.x.push(tgt.coords[0]);
  link.y.push(tgt.coords[1]);
  return link;
};

const makeLinks = nodes => {
  const links = [];
  nodes.forEach(node => {
    const tgt1 = getRand(nodes);
    const tgt2 = getRand(nodes);
    if (tgt1 !== node) links.push(makeLink(node, tgt1));
    if (tgt2 !== node) links.push(makeLink(node, tgt2));
  });
  return links;
};

const GeoData = { nodes: [], links: [] };

try {
  if (GeoData.nodes.length === 0) {
    GeoData.nodes = makeNodes(2400, 1800, 0.03);
    GeoData.links = makeLinks(GeoData.nodes);
  }
} catch (err) {
  GeoData.err = err;
}
const json = JSON.stringify(GeoData, null, 2);
console.log(`export default ${json};`); //js format for easy import
