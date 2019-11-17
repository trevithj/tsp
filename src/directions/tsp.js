import permute from './permute';
import { calcPathLength } from './calcs';
import { findBestNNTour } from './findNN';

export { permute, calcPathLength };

export const tsp = destinations => {
  if (destinations.length < 2) {
    return []; //No tour possible
  }
  if (destinations.length < 4) {
    //any loop will do, all the same length
    return [...destinations, destinations[0]];
  }
  if (destinations.length < 10) {
    return bruteForceFind(destinations);
  }
  //Else ... hoy carumba, mucho permutations!
  return findBestNNTour(destinations); //not optimal, but come ON!
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
