export const calcDist = (a, b) => {
  const [ax, ay] = a.coords;
  const [bx, by] = b.coords;
  //Use abs - don't care about direction
  return Math.abs(bx - ax) + Math.abs(by - ay);
};

export const calcPathLength = tour => {
  let length = 0;
  tour.reduce((a, b) => {
    length += calcDist(a, b);
    return b;
  });
  return length;
};
