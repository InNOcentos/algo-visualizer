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
      <button @click="this.mergeSort" class="toolbar-elem run-btn">Run</button>
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
import { mergeSortAlgoritm } from "../sortingAlgoritms/mergeSortAlgoritm.js";
export default {
  data: () => ({
    array: [],
    settings: {
      MULTIPLICATION_FACTOR: 50,
      colors: {
        PRIMARY_COLOR: "#ed6663",
        SECONDARY_COLOR: "#132743",
        DEFAULT_COLOR: "#f1f3f8",
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
      const animations = mergeSortAlgoritm(this.array);
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
              : this.settings.colors.PRIMARY_COLOR;
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