<template>
  <div>
    <div class="toolbar" id="toolbar" :style="this.toolbarVisibility.status">
      <a class="toolbar-elem reset-btn" href="#" @click.prevent="resetArray">
        Generate new array
      </a>
      <div class="toolbar-elem algorithm selectedAlgorithm">Merge Sort</div>

      <!-- <button @click="this.testSortingAlgoritms" class="control btn-test">
        Test
      </button> -->

      <input
        type="range"
        class="speed-elem toolbar-elem"
        v-model="settings.MULTIPLICATION_FACTOR"
        min="10"
        max="110"
        id="speedRange"
        v-on:input="resetArray"
      />
      <button @click="this.mergeSort" class="toolbar-elem run-btn">
        Run mergeSort
      </button>
      <button @click="this.quickSort" class="toolbar-elem run-btn">
        Run quickSort
      </button>
      <button @click="this.bubbleSort" class="toolbar-elem run-btn">
        Run bubbleSort
      </button>
    </div>

    <div class="array-container">
      <div
        class="array-bar"
        v-for="(value, index) in array"
        :key="index"
        :index="index"
        v-bind:style="{
          height: value + 'px',
          width: widthOfArrayBars + 'px',
          backgroundColor: settings.colors.DEFAULT_COLOR,
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import {
  mergeSortAlgorithm,
  quickSortAlgorithm,
  bubbleSortAlgorithm,
} from "../sortingAlgoritms";
export default {
  data: () => ({
    array: [],
    settings: {
      MULTIPLICATION_FACTOR: 41,
      colors: {
        PRIMARY_COLOR: "#637373",
        SECONDARY_COLOR: "#132743",
        DEFAULT_COLOR: "#ffeadb",
        CURRENT_COLOR: null,
      },
    },
    toolbarVisibility: {
      statusArray: ["none", "auto"],
      status: { pointerEvents: "auto" },
    },
  }),
  computed: {
    animationSpeed() {
      console.log(this.settings.MULTIPLICATION_FACTOR);
      return this.settings.MULTIPLICATION_FACTOR / 3.5;
    },
    numberOfArrayBars() {
      return 160 - this.settings.MULTIPLICATION_FACTOR;
    },
    widthOfArrayBars() {
      return 500 / (150 - this.settings.MULTIPLICATION_FACTOR);
    },
  },
  mounted() {
    this.resetArray();
  },
  methods: {
    resetArray() {
      const array = [];
      for (let i = 0; i < this.numberOfArrayBars; i++) {
        array.push(this.randomIntFromInterval(5, 730));
      }
      this.array = array;
      if (
        this.settings.colors.CURRENT_COLOR ===
        this.settings.colors.PRIMARY_COLOR
      ) {
        const arrayBars = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars.length; i++) {
          arrayBars[
            i
          ].style.backgroundColor = this.settings.colors.DEFAULT_COLOR;
        }
      }
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
      const animations = mergeSortAlgorithm(this.array);
      console.log(animations[0]);
      const arrayBars = document.getElementsByClassName("array-bar");
      /* const toolbarStatus = Object.keys(this.toolbarVisibility.status)[0];
      this.toolbarVisibility.status[
        toolbarStatus
      ] = this.toolbarVisibility.statusArray[0]; */
      for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color =
            i % 3 === 0
              ? this.settings.colors.SECONDARY_COLOR
              : this.settings.colors.DEFAULT_COLOR;
          this.settings.colors.CURRENT_COLOR = this.settings.colors.PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.animationSpeed);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * this.animationSpeed);
        }
      }
    },
    quickSort() {
      let animations = quickSortAlgorithm(this.array);
      console.log(animations);
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < animations.length; i++) {
        this.settings.colors.CURRENT_COLOR = this.settings.colors.PRIMARY_COLOR;

        if (i % 3 === 0) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = this.settings.colors.PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.animationSpeed);
        } else if (i % 3 === 1) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = this.settings.colors.SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * this.animationSpeed);
        } else {
          setTimeout(() => {
            const [
              barOneIdx,
              barOneHeight,
              barTwoIdx,
              barTwoHeight,
            ] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barTwoHeight}px`;
            barTwoStyle.height = `${barOneHeight}px`;
          }, i * this.animationSpeed);
        }
      }
      /* arrayBars[i].style.height = `${this.array[i]}px`; */
      /* const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < animations.length; i++) {
        arrayBars[i].style.height = `${animations[i]}px`;
      } */
    },
    bubbleSort() {
      console.log(this.array);
      let animations = bubbleSortAlgorithm(this.array);
      console.log(animations);
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < animations.length; i++) {
        let isSwap = i % 3 !== 2;
        if (isSwap) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color =
            i % 3 === 0
              ? this.settings.colors.SECONDARY_COLOR
              : this.settings.colors.DEFAULT_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * 1);
        } else {
          setTimeout(() => {
            const [
              barOneIdx,
              barTwoIdx,
              barOneHeight,
              barTwoHeight,
            ] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            barOneStyle.height = `${barTwoHeight}px`;
            barTwoStyle.height = `${barOneHeight}px`;
          }, i * 1);
        }
      }
    },
  },
};
</script>

<style>
.array-container {
  display: flex;
  align-items: flex-end;
  height: 790px;
  justify-content: center;
  padding-top: 101px;
  margin: 0 auto;
}
.array-bar {
  display: inline-block;
  margin: 0 1px;
  transition: height 0.001s;
}
.toolbar {
  position: absolute;
  padding: 40px 0;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  color: black;
}
.toolbar a {
  color: black;
  text-decoration: none;
}
.toolbar-elem {
  max-width: 150px;
  width: 100%;
  padding: 5px 0;
}
.toolbar-elem:hover {
  cursor: pointer;
}
.select-btn {
  outline: none;
}
.run-btn {
  background-color: #d49a89;
  color: black;
  outline: 0;
  border-radius: 8px;
  border: none;
  font-size: 20px;
}
.algorithm {
  display: flex;
  justify-content: center;
  align-items: center;
}
.selectedAlgorithm {
  text-decoration: underline;
  cursor: default !important;
  padding: 0;
}
</style>