import { calcDist, calcPathLength } from './calcs';

export const findBestNNTour = dArray => {
  const ia = new Array(dArray.length).fill(0).map((v, i) => i);
  let minPathLength = Number.MAX_SAFE_INTEGER;
  let shortestTour;
  ia.forEach(index => {
    const ignoreMap = { [index]: true };
    const start = dArray[index];
    const tour = [start];
    let nearest = getNearestNeighbour(start, dArray, ignoreMap);
    while (nearest > -1) {
      tour.push(dArray[nearest]);
      ignoreMap[nearest] = true;
      nearest = getNearestNeighbour(start, dArray, ignoreMap);
    }
    tour.push(start); //complete the tour
    const thisPathLength = calcPathLength(tour);
    if (thisPathLength < minPathLength) {
      shortestTour = tour;
      minPathLength = thisPathLength;
    }
  });
  return shortestTour;
};

export const getNearestNeighbour = (start, dArray, ignoreMap) => {
  let nearest = -1;
  let minDist = Number.MAX_SAFE_INTEGER;
  dArray.forEach((loc, i) => {
    if (ignoreMap[i]) return;
    if (loc === start) return;
    const dist = calcDist(start, loc);
    if (dist < minDist) {
      nearest = i;
      minDist = dist;
    }
  });
  return nearest;
};
