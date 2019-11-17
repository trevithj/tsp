import * as NN from './findNN';

const dests = 'ABCDEFGHIJKLMNOPQRETUVWXYZ'.split('').map(addr => {
  const coords = [Math.random() * 400 - 200, Math.random() * 400 - 200];
  return { coords, addr };
});

describe('getNearestNeighbour', () => {
  it('should return nothing if all dests are ignored', () => {
    const ignoreMap = dests.map(() => true);
    const res = NN.getNearestNeighbour(dests[0], dests, ignoreMap);
    expect(res).toBe(-1);
  });

  it('should return last unignored dest', () => {
    const ignoreMap = dests.map(() => true);
    ignoreMap[5] = false;
    const res = NN.getNearestNeighbour(dests[0], dests, ignoreMap);
    expect(res).toBe(5);
  });

  it('should actually find a neighbour', () => {
    const ignoreMap = {};
    const res = NN.getNearestNeighbour(dests[3], dests, ignoreMap);
    expect(res).toBeGreaterThan(-1);
    expect(res).not.toBe(3); //should ignore self-loops
  });
});

describe('findBestNNTour', () => {
  it('should handle big dest arrays', () => {
    const res = NN.findBestNNTour(dests);
    expect(res.length).toBe(dests.length + 1);
    expect(res[res.length - 1]).toEqual(res[0]);
  });
});
