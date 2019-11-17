export const tsp = destinations => {
  if (destinations.length < 2) {
    return destinations; //??
  }
  if (destinations.length < 4) {
    //any loop will do
    return [...destinations, destinations[0]];
  }
  if (destinations.length < 10) {
    return bruteForceFind(destinations);
  }
  //Else ... hoy carumba!
  return [...destinations, destinations[0]]; //lie about it for now
};

//Modified form of this one:
// https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
export const permute = (permutation, cb) => {
  const length = permutation.length;
  // const result = [permutation.slice()];
  cb(permutation.slice()); //include the original order
  let c = new Array(length).fill(0);
  let i = 1;
  let k;
  let p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      // result.push(permutation.slice());
      cb(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  // return result;
};

// permute('ABCDEF'.split(''), res => console.log(res));

// console.time('Perms');
// console.log(permute(new Array(10).fill(1)).length);
// console.timeEnd('Perms');
// 10 elements, 3628800 perms, 1691ms

export const calcPathLength = tour => {
  let length = 0;
  tour.reduce((a, b) => {
    const [ax, ay] = a.coords;
    const [bx, by] = b.coords;
    const dist = Math.abs(bx - ax) + Math.abs(by - ay);
    length += dist; //don't care about direction
    return b;
  });
  return length;
};

export const bruteForceFind = dArray => {
  const start = dArray[0];
  const visits = dArray.slice(1);
  let minPathLength = Number.MAX_SAFE_INTEGER;
  let shortestTour;
  permute(visits, permutation => {
    const tour = [start, ...permutation, start]; //make a circuit
    const thisPathLength = calcPathLength(tour);
    if (thisPathLength < minPathLength) {
      shortestTour = tour;
      minPathLength = thisPathLength;
    }
  });
  return shortestTour;
};
