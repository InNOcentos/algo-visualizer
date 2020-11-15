export default function quickSortAlgorithm(array) {
  if (array.length <= 1) return array;
  const animations = [];
  const result = quickSortHelper(array, 0, array.length - 1, animations);
  return [animations, result];
}
function quickSortHelper(items, left, right, animations) {
  if (items.length > 1) {
    let index = partition(items, left, right, animations);
    if (left < index - 1) {
      quickSortHelper(items, left, index - 1, animations);
    }
    if (index < right) {
      quickSortHelper(items, index, right, animations);
    }
  }
  return items;
}
function partition(items, left, right, animations) {
  let pivotIndex = Math.floor((right + left) / 2);
  let pivot = items[pivotIndex],
    i = left,
    j = right;
  while (i <= j) {
    animations.push([i, j]);
    animations.push([i, j]);
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      animations.push([i, j, items[i], items[j]]);
      animations.push([true]);
      swap(items, i, j);
      i++;
      j--;
    }
  }

  return i;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
/* function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} */
