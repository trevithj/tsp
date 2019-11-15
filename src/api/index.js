//Mock data - see how well this works
const rand = max => Math.round((Math.random() * max) / 20) * 20;
const getRand = arr => arr[Math.floor(Math.random() * arr.length)];

const prefixes = 'Ar Be Co Del En Fin Gel Har Inn Jes Kai Lo Mac Ne O Pa Ra St Tre Van Will'.split(
  ' '
);
const suffixes = 'an bon chel den fe gar holm jar kaka lear mun nagle para pen rie sen tule vet way'.split(
  ' '
);

const makeNodes = (width, height, p = 0.5) => {
  const nodes = [];
  let w = -width;

  while (w < 2 * width) {
    let h = -height;
    while (h < 2 * height) {
      if (Math.random() < p) {
        const prefix = getRand(prefixes);
        const node = {
          coords: [w, h],
          addr: `${Math.round(rand(130))} ${prefix}${getRand(suffixes)} St`
        };
        nodes.push(node);
      }
      h += 20;
    }
    w += 20;
  }
  return nodes;
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

const makeRandomData = (width, height) => {
  const data = { nodes: makeNodes(width, height, 0.03) };
  data.links = makeLinks(data.nodes);
  return data;
};

const GeoData = makeRandomData(1200, 500);

export const getCurrentLocation = () => {
  return [174.4487226, -36.6804325];
};

//For now, mock API calls
export const getMapData = (width, height) => {
  return Promise.resolve(makeRandomData(width, height));
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
