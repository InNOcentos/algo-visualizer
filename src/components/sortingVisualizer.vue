<template>
  <div class="main">
    <div class="toolbar" ref="toolbar">
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
            v-model="settings.ANIMATION_DELAY"
            min="10"
            max="110"
            id="speedRange"
            v-on:input="resetArray"
          />
        </div>
        <div class="toolbar__elem toolbar--choose">
          <span class="toolbar__text">Choose algorithm:</span>
          <ul class="algo-list">
            <li
              class="algo-list__item"
              v-for="(algo, index) in algorithms"
              :key="index"
            >
              <button
                class="toolbar__btn algo-btn"
                :isActive="activeAlgorithmIndex === index"
                @click="toggleActiveAlgorithm(index)"
                :class="{ active: activeAlgorithmIndex === index }"
                :value="algorithms[index]"
              >
                {{ algo }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="toolbar-bottom toolbar-run">
        <div class="toolbar-elem">
          <button
            class="toolbar__btn run-btn"
            @click="this.startSort"
            ref="run"
          >
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
      MULTIPLICATION_FACTOR: 3,
      ANIMATION_DELAY: 40,
      colors: {
        RESULT_COLOR: "#ffaaa5",
        SECONDARY_COLOR: "#1c2b2d",
        DEFAULT_COLOR: "#ffeadb",
        CURRENT_COLOR: null,
      },
    },
    algorithms: ["mergeSort", "heapSort", "quickSort", "bubbleSort"],
    activeAlgorithmIndex: 0,
  }),
  computed: {
    animationSpeed() {
      return (this.settings.ANIMATION_DELAY / 10) * 2;
    },
    numberOfArrayBars() {
      return 160 - this.settings.ANIMATION_DELAY;
    },
    widthOfArrayBars() {
      return 500 / (140 - this.settings.ANIMATION_DELAY);
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
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = this.settings.colors.DEFAULT_COLOR;
      }
    },
    startSort(event) {
      const selectedAlgorithm = this.$el.querySelector(".active").value;
      event.target.classList.add("inProgress");
      this[selectedAlgorithm]();
    },
    toggleActiveAlgorithm(index) {
      if (this.activeAlgorithmIndex !== index) {
        this.activeAlgorithmIndex = index;
      }
    },
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    toolbarLocker(animationsPromises, sortedArray, arrayBars) {
      Promise.all(animationsPromises).then(() => {
        this.$refs.run.classList.remove("inProgress");
        this.$refs.toolbar.style.pointerEvents = "auto";
        for (let i = 0; i < sortedArray.length; i++) {
          setTimeout(() => {
            arrayBars[
              i
            ].style.backgroundColor = this.settings.colors.RESULT_COLOR;
          }, i * this.animationSpeed);
        }
      });
    },
    mergeSort() {
      const [animations, sortedArray] = mergeSortAlgorithm(this.array);
      const arrayBars = this.$el.querySelectorAll(".array-bar");
      const animationsPromises = [];
      this.$refs.toolbar.style.pointerEvents = "none";
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
                  ? this.settings.colors.SECONDARY_COLOR
                  : this.settings.colors.DEFAULT_COLOR;
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
      this.toolbarLocker(animationsPromises, sortedArray, arrayBars);
    },
    quickSort() {
      let [animations, sortedArray] = quickSortAlgorithm(this.array);
      const arrayBars = this.$el.querySelectorAll(".array-bar");
      const animationsPromises = [];
      this.$refs.toolbar.style.pointerEvents = "none";
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
      this.toolbarLocker(animationsPromises, sortedArray, arrayBars);
    },
    bubbleSort() {
      let [animations, sortedArray] = bubbleSortAlgorithm(this.array);
      const arrayBars = this.$el.querySelectorAll(".array-bar");
      const animationsPromises = [];
      this.$refs.toolbar.style.pointerEvents = "none";
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
      this.toolbarLocker(animationsPromises, sortedArray, arrayBars);
    },
    heapSort() {
      const [animations, sortedArray] = heapSortAlgorithm(this.array);
      const arrayBars = this.$el.querySelectorAll(".array-bar");
      const animationsPromises = [];
      this.$refs.toolbar.style.pointerEvents = "none";
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
      this.toolbarLocker(animationsPromises, sortedArray, arrayBars);
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
/* Range */

.speed-elem {
  -webkit-appearance: none;
  appearance: none;
  width: 200px;
  height: 10px;
  background: #ffeadb;
  outline: none;
}

.speed-elem::-webkit-slider-thumb {
  width: 200px;
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  background: #4682b4;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #ffeadb;
}

.speed-elem::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #4682b4;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #ffeadb;
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
.algo-btn > span {
  text-transform: lowercase;
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
.toolbar--change .toolbar__text {
  padding-bottom: 12px;
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
  background-color: #ff9a76;
  color: #065c6f;
}
</style>