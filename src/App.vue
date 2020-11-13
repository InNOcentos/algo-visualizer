<template>
  <div id="app">
    <SortingVisualizer />
  </div>
</template>

<script>
import SortingVisualizer from "@/components/sortingVisualizer";
export default {
  name: "App",
  components: {
    SortingVisualizer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #64958f;
  min-height: 100vh;
}
body {
  margin: 0;
}
</style>
