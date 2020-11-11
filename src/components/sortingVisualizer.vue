<template>
  <div>
    <div class="array-container">
      <div class="array-container-inner">
        <div
          class="array-bar"
          v-for="(value, index) in array"
          :key="index"
          :index="index"
          v-bind:style="{ height: value + 'px' }"
        ></div>
      </div>
    </div>
    <div class="array-controls">
      <button class="control btn-reset" @click="this.resetArray">
        Generate new array
      </button>
      <select class="control btn-select">
        <option value="quickSort">Quick Sort</option>
      </select>
      <button @click="this.quickSort" class="control btn-run">Run</button>
      <button @click="this.testSortingAlgoritms" class="control btn-test">
        Test
      </button>
    </div>
  </div>
</template>

<script>
import { quickSortAlgoritm } from "../sortingAlgoritms/quickSortAlgoritm.js";
export default {
  data: () => ({
    array: [],
  }),
  mounted() {
    this.resetArray();
  },
  methods: {
    resetArray() {
      const array = [];
      for (let i = 0; i < 180; i++) {
        array.push(this.randomIntFromInterval(5, 730));
      }
      this.array = array;
    },
    arraysAreEqual(arrayOne, arrayTwo) {
      if (arrayOne.length !== arrayTwo.length) return false;
      for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) return false;
      }
      return true;
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    quickSort() {
      const javascriptSortedArray = this.array.slice().sort((a, b) => a - b);
      const sortedArray = quickSortAlgoritm(this.array);

      console.log(this.arraysAreEqual(javascriptSortedArray, sortedArray));
    },
    testSortingAlgoritms() {
      for (let i = 0; i < 100; i++) {
        const array = [];
        const length = this.randomIntFromInterval(1, 1000);
        for (let j = 0; j < length; j++) {
          array.push(this.randomIntFromInterval(-1000, 1000));
        }
        const javascriptSortedArray = this.array.slice().sort((a, b) => a - b);
        const sortedArray = quickSortAlgoritm(this.array);

        console.log(this.arraysAreEqual(javascriptSortedArray, sortedArray));
      }
    },
  },
};
</script>

<style>
.array-container {
  height: 800px;
}
.array-container-inner {
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 0 auto;
}
.array-bar {
  width: 2px;
  background-color: pink;
  display: inline-block;
  margin: 0 1px;
}
.array-controls {
  display: flex;
  max-width: 700px;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
}
.control {
  max-width: 150px;
  width: 100%;
  margin: 4px 0;
}
.btn-select {
  outline: none;
}
</style>