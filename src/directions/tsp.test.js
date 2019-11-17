import * as TSP from './tsp';

describe('permute', () => {
  it('should cycle through all possible permutations of an array', () => {
    const map = {};
    const arr = 'ABCD'.split('');
    TSP.permute(arr, p => {
      const key = p.join('');
      const count = map[key] || 0;
      map[key] = count + 1;
    });
    const keys = Object.keys(map);
    //are there duplicates?
    keys.forEach(key => {
      expect(map[key]).toEqual(1);
    });
    //has it found all permutations? = arr.length!
    expect(keys.length).toEqual(1 * 2 * 3 * 4);
  });
});

describe('calcPathLength', () => {
  it('should calc correct path length', () => {
    const tour = [
      { addr: 'A', coords: [0, 0] },
      { addr: 'B', coords: [100, 100] },
      { addr: 'C', coords: [250, 250] },
      { addr: 'A', coords: [0, 0] }
    ];
    const len = TSP.calcPathLength(tour);
    expect(len).toEqual(100 + 100 + 150 + 150 + 250 + 250);
  });

  it('should ignore direction of path', () => {
    const tour = [
      { addr: 'A', coords: [0, 0] },
      { addr: 'B', coords: [100, 50] },
      { addr: 'C', coords: [-100, -50] },
      { addr: 'A', coords: [0, 0] }
    ];
    const len = TSP.calcPathLength(tour);
    expect(len).toEqual(100 + 50 + 200 + 100 + 100 + 50);
  });
});

describe('bruteForceFind', () => {
  it('should get correct results for smallish arrays', () => {
    const dests = [
      { addr: 'A', coords: [0, 0] },
      { addr: 'B', coords: [100, 0] },
      { addr: 'C', coords: [-150, 0] },
      { addr: 'D', coords: [200, 0] },
      { addr: 'E', coords: [-152, 0] }
    ];
    const res = TSP.bruteForceFind(dests);
    //Check that a full tour is returned
    expect(res.length).toEqual(dests.length + 1);
    expect(res[res.length - 1]).toEqual(res[0]);
    expect(res.map(loc => loc.addr).join('')).toEqual('ADBCEA');
  });
});

describe('tsp', () => {
  it('should return small tours unchanged', () => {
    const dests = [
      { addr: 'A', coords: [0, 0] },
      { addr: 'B', coords: [100, 0] },
      { addr: 'C', coords: [-150, 0] }
    ];
    const res = TSP.tsp(dests);
    expect(res.map(loc => loc.addr).join('')).toEqual('ABCA');
  });
});
