export const quickSortAlgoritm = (arr) => {
  if (arr.length < 2) {
    return arr;
  } else {
    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const less = arr.filter((e) => e < pivot);
    const more = arr.filter((e) => e > pivot);
    const equal = arr.filter((value) => value === pivot);
    return [...quickSortAlgoritm(less), ...equal, ...quickSortAlgoritm(more)];
  }
};
