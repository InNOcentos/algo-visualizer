<template>
  <div class="main">
    <div class="toolbar" id="toolbar">
      <div class="toolbar-top">
        <div class="toolbar__elem toolbar--generate">
          <button class="toolbar__btn generate-btn" @click="resetArray">
            Generate new array
          </button>
        </div>
        <div class="toolbar__elem toolbar--change">
          <span class="toolbar__text">Change size & speed:</span>
          <input
            type="range"
            class="speed-elem toolbar-elem"
            v-model="settings.MULTIPLICATION_FACTOR"
            min="10"
            max="110"
            id="speedRange"
            v-on:input="resetArray"
          />
        </div>
        <div class="toolbar__elem toolbar--choose">
          <span class="toolbar__text">Choose algorithm:</span>
          <ul class="algo-list">
            <li class="algo-list__item">
              <button
                class="toolbar__btn algo-btn active"
                @click="this.pickAlgorithm"
                value="mergeSort"
              >
                Merge Sort
              </button>
            </li>
            <li class="algo-list__item">
              <button
                class="toolbar__btn algo-btn"
                @click="this.pickAlgorithm"
                value="quickSort"
              >
                Quick Sort
              </button>
            </li>
            <li class="algo-list__item">
              <button
                class="toolbar__btn algo-btn"
                @click="this.pickAlgorithm"
                value="bubbleSort"
              >
                Bubble Sort
              </button>
            </li>
            <li class="algo-list__item">
              <button
                class="toolbar__btn algo-btn"
                @click="this.pickAlgorithm"
                value="heapSort"
              >
                Heap Sort
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="toolbar-bottom toolbar-run">
        <div class="toolbar-elem">
          <button class="toolbar__btn run-btn" id="run" @click="this.startSort">
            Run
          </button>
        </div>
      </div>
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
  heapSortAlgorithm,
} from "../sortingAlgoritms";
export default {
  data: () => ({
    array: [],
    settings: {
      MULTIPLICATION_FACTOR: 40,
      colors: {
        PRIMARY_COLOR: "#637373",
        SECONDARY_COLOR: "#1c2b2d",
        DEFAULT_COLOR: "#ffeadb",
        CURRENT_COLOR: null,
      },
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
    startSort(event) {
      const selectedAlgorithm = document.getElementsByClassName("active")[0]
        .value;
      event.target.classList.add("inProgress");
      this[selectedAlgorithm]();
    },
    pickAlgorithm(event) {
      const allAlgorithmsBtn = document.getElementsByClassName("algo-btn");
      allAlgorithmsBtn.forEach((e) => {
        e.classList.remove("active");
      });
      event.target.classList.add("active");
    },
    resetArray() {
      const array = [];
      for (let i = 0; i < this.numberOfArrayBars; i++) {
        array.push(this.randomIntFromInterval(5, 730));
      }
      this.array = array;
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = this.settings.colors.DEFAULT_COLOR;
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
      const [animations, sortedArray] = mergeSortAlgorithm(this.array);
      console.log(sortedArray);
      const arrayBars = document.getElementsByClassName("array-bar");
      document.getElementById("toolbar").style.pointerEvents = "none";
      const animationsPromises = [];
      for (let i = 0; i < animations.length; i++) {
        animationsPromises.push(
          new Promise((resolve) => {
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
                resolve();
              }, i * this.animationSpeed);
            } else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                resolve();
              }, i * this.animationSpeed);
            }
          })
        );
      }
      Promise.all(animationsPromises).then(() => {
        console.log(1);
        document
          .getElementsByClassName("inProgress")[0]
          .classList.remove("inProgress");
        document.getElementById("toolbar").style.pointerEvents = "auto";
        for (let i = 0; i < sortedArray.length; i++) {
          setTimeout(() => {
            arrayBars[i].style.backgroundColor = "#fbd46d";
          }, i * 3);
        }
      });
    },
    quickSort() {
      let [animations, sortedArray] = quickSortAlgorithm(this.array);
      const arrayBars = document.getElementsByClassName("array-bar");
      const animationsPromises = [];
      let mark = false;
      document.getElementById("toolbar").style.pointerEvents = "none";
      for (let i = 0; i < animations.length; i++) {
        animationsPromises.push(
          new Promise((resolve) => {
            let isMark = animations[i].length === 1;
            if (isMark) {
              mark = true;
              resolve();
            } else {
              let isSwap = animations[i].length !== 4;
              if (isSwap) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if (!mark) {
                  color =
                    (i / 2) % 1 === 0
                      ? this.settings.colors.SECONDARY_COLOR
                      : this.settings.colors.DEFAULT_COLOR;
                } else {
                  color =
                    (i / 2) % 1 !== 0
                      ? this.settings.colors.SECONDARY_COLOR
                      : this.settings.colors.DEFAULT_COLOR;
                }
                mark = false;
                setTimeout(() => {
                  barOneStyle.backgroundColor = color;
                  barTwoStyle.backgroundColor = color;
                  resolve();
                }, i * 100);
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
                  resolve();
                }, i * 100);
              }
            }
          })
        );
      }
      Promise.all(animationsPromises).then(() => {
        console.log(1);
        document
          .getElementsByClassName("inProgress")[0]
          .classList.remove("inProgress");
        document.getElementById("toolbar").style.pointerEvents = "auto";
        for (let i = 0; i < sortedArray.length; i++) {
          setTimeout(() => {
            arrayBars[i].style.backgroundColor = "#fbd46d";
          }, i * 3);
        }
      });
    },
    bubbleSort() {
      let [animations, sortedArray] = bubbleSortAlgorithm(this.array);
      const arrayBars = document.getElementsByClassName("array-bar");
      const animationsPromises = [];
      document.getElementById("toolbar").style.pointerEvents = "none";
      for (let i = 0; i < animations.length; i++) {
        animationsPromises.push(
          new Promise((resolve) => {
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
                resolve();
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
                resolve();
              }, i * 1);
            }
          })
        );
      }
      Promise.all(animationsPromises).then(() => {
        document
          .getElementsByClassName("inProgress")[0]
          .classList.remove("inProgress");
        document.getElementById("toolbar").style.pointerEvents = "auto";
        for (let i = 0; i < sortedArray.length; i++) {
          setTimeout(() => {
            arrayBars[i].style.backgroundColor = "#fbd46d";
          }, i * 3);
        }
      });
    },
    heapSort() {
      const [animations, sortedArray] = heapSortAlgorithm(this.array);
      const arrayBars = document.getElementsByClassName("array-bar");
      const animationsArray = [];
      document.getElementById("toolbar").style.pointerEvents = "none";
      for (let i = 0; i < animations.length; i++) {
        animationsArray.push(
          new Promise((resolve) => {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
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
                resolve();
              }, i * this.animationSpeed);
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
                resolve();
              }, i * this.animationSpeed);
            }
          })
        );
      }
      Promise.all(animationsArray).then(() => {
        document
          .getElementsByClassName("inProgress")[0]
          .classList.remove("inProgress");
        document.getElementById("toolbar").style.pointerEvents = "auto";
        for (let i = 0; i < sortedArray.length; i++) {
          setTimeout(() => {
            arrayBars[i].style.backgroundColor = "#fbd46d";
          }, i * 3);
        }
      });
    },
  },
};
</script>

<style>
.main {
  display: flex;
  justify-content: center;
}
.array-container {
  display: flex;
  align-items: flex-end;
  height: 790px;
  justify-content: center;
  padding-top: 131px;
  margin: 0 auto;
}
.array-bar {
  display: inline-block;
  margin: 0 1px;
  transition: height 0.001s;
}
.toolbar {
  color: #ffeadb;
  position: absolute;
  width: 100%;
}
.toolbar-top {
  padding-top: 40px;
  max-width: 80%;
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  text-transform: uppercase;
  height: 80px;
  margin: 0 auto;
}
.toolbar__elem {
  max-width: 300px;
  width: 100%;
  /* background-color: #ea907a; */
  border-radius: 8px;
  border: none;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/* Generate btn */
.toolbar__btn {
  background: none;
  border: none;
  text-transform: uppercase;
  color: #ffeadb;
  text-decoration: none;
  position: relative;
  outline: none;
  font-size: 16px;
}
.generate-btn:hover {
  cursor: pointer;
}
/*
.generate-btn:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #ffeadb;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.15s ease-in-out 0s;
}
.generate-btn:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
} */

/* Range */
input[type="range"] {
  width: 210px;
  height: 30px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  outline: none;
}
input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 200px;
  height: 10px;
  background: #AAA;
}
input[type="range"]::-webkit-slider-thumb {
  position: relative;
  height: 25px;
  width: 25px;
  margin-top: -8px;
  background: steelblue;
  border-radius: 50%;
  border: 2px solid #ffeadb;
}
input[type="range"]::-webkit-slider-thumb::before {
  position: absolute;
  content: "";
  height: 10px; /* equal to height of runnable track */
  width: 300px; /* make this bigger than the widest range input element */
  left: -302px; /* this should be -2px - width */
  top: 8px; /* don't change this */
  background: #777;
}
/* /rAnge */
.algorithm {
  display: flex;
  justify-content: center;
  align-items: center;
}
.algo-btn {
  padding: 0;
}
.algo-btn:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #ffeadb;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.15s ease-in-out 0s;
  visibility: hidden;
}
.algo-btn.active:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
.selectedAlgorithm {
  text-decoration: underline;
  cursor: default !important;
  padding: 0;
}
.algo-list {
  list-style-type: none;
  columns: 2;
  padding: 0;
  margin: 0;
}
.algo-list__item {
  text-align: left;
  padding-bottom: 6px;
}
.algo-list__item:hover > .algo-btn {
  cursor: pointer;
}
.toolbar--choose .toolbar__text {
  align-self: baseline;
  margin-bottom: 11px;
}
.toolbar--choose {
  align-items: flex-start;
}
.toolbar-run {
  margin: 0 auto;
}
.run-btn {
  border: 1px solid #ffeadb;
  border-radius: 20px;
  padding: 6px 13px;
}
.run-btn:hover,
.run-btn.inProgress {
  cursor: pointer;
  background-color: #c7e2b2;
  color: #3b6978;
}
</style>