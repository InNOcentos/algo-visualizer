export default function heapSortAlgorithm(array) {
  const animations = [];
  const result = heapSort(array, animations);
  return [animations, result];
}

function heapSort(array, animations) {
  build_heap(array, animations);
  var end = array.length - 1;

  while (end >= 0) {
    animations.push([0, end]);
    animations.push([0, end]);
    animations.push([0, end, array[0], array[end]]);
    swap(array, 0, end);
    sink(array, 0, end, animations);
    end -= 1;
  }
  return array;
}
function sink(array, i, max, animations) {
  var big_index, childl, childr;
  while (i < max) {
    big_index = i;
    childl = 2 * i + 1;
    childr = childl + 1;
    if (childl < max && array[childl] > array[big_index]) big_index = childl;

    if (childr < max && array[childr] > array[big_index]) big_index = childr;

    if (big_index == i) return;
    animations.push([i, big_index]);
    animations.push([i, big_index]);
    animations.push([i, big_index, array[i], array[big_index]]);
    swap(array, i, big_index);
    i = big_index;
  }
}

function build_heap(array, animations) {
  var index = Math.floor(array.length / 2 - 1);
  while (index >= 0) {
    sink(array, index, array.length, animations);
    index--;
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
