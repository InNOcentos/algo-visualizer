export default function bubbleSortAlgorithm(array) {
  const animations = [];
  const sortedArray = bubbleSortHelper(array, animations);
  return [animations, sortedArray];
}

const bubbleSortHelper = (array, animations) => {
  for (let i = array.length - 1; i >= 0; i--) {
    for (let y = array.length - 1; y > array.length - i - 1; y--) {
      if (array[y] < array[y - 1]) {
        animations.push([y, y - 1]);
        animations.push([y, y - 1]);
        animations.push([y, y - 1, array[y], array[y - 1]]);
        [array[y], array[y - 1]] = [array[y - 1], array[y]];
      }
    }
  }
  return array;
};
