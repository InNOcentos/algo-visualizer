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
        <option value="mergeSort">Merge Sort</option>
      </select>

      <!-- <button @click="this.testSortingAlgoritms" class="control btn-test">
        Test
      </button> -->
      <button @click="this.mergeSort" class="control btn-run">Run</button>
      <span class="control">Speed:</span>
      <input
        type="number"
        class="speed control"
        placeholder="speed"
        v-model="settings.ANIMATION_SPEED_MS"
      />
    </div>
  </div>
</template>

<script>
import { mergeSortAlgoritm } from "../sortingAlgoritms/mergeSortAlgoritm.js";
export default {
  data: () => ({
    array: [],
    settings: {
      ANIMATION_SPEED_MS: 1,
      NUMBER_OF_ARRAY_BARS: 250,
      PRIMARY_COLOR: "turquoise",
      SECONDARY_COLOR: "red",
    },
  }),
  mounted() {
    this.resetArray();
  },
  methods: {
    resetArray() {
      const array = [];
      for (let i = 0; i < this.settings.NUMBER_OF_ARRAY_BARS; i++) {
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
    mergeSort() {
      const animations = mergeSortAlgoritm(this.array);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName("array-bar");
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color =
            i % 3 === 0
              ? this.settings.SECONDARY_COLOR
              : this.settings.PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.settings.ANIMATION_SPEED_MS);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * this.settings.ANIMATION_SPEED_MS);
        }
      }
    },
    testSortingAlgoritms() {
      for (let i = 0; i < 1; i++) {
        const array = [];
        const length = this.randomIntFromInterval(1, 1000);
        for (let i = 0; i < length; i++) {
          array.push(this.randomIntFromInterval(-1000, 1000));
        }
        const javaScriptSortedArray = this.array.slice().sort((a, b) => a - b);
        console.log(javaScriptSortedArray);
        const mergeSortedArray = mergeSortAlgoritm(array.slice());
        console.log(mergeSortedArray);
        console.log(
          this.arraysAreEqual(javaScriptSortedArray, mergeSortedArray)
        );
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
  max-width: 750px;
  width: 100%;
  justify-content: space-between;
  margin: 0 auto;
}
.control {
  max-width: 150px;
  width: 100%;
  margin: 0 5px;
}
.btn-select {
  outline: none;
}
.btn-run {
  background-color: yellow;
  color: black;
}
</style>