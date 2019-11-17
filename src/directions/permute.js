//Modified form of this one:
// https://stackoverflow.com/questions/9960908/permutations-in-javascript/37580979#37580979
const permute = (permutation, cb) => {
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

export default permute;

// permute('ABCDEF'.split(''), res => console.log(res));

// console.time('Perms');
// console.log(permute(new Array(10).fill(1)).length);
// console.timeEnd('Perms');
// 10 elements, 3628800 perms, 1691ms
