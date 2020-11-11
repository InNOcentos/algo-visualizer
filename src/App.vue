<template>
  <div id="app">
    <QuickSort />
  </div>
</template>

<script>
import QuickSort from "@/components/QuickSort";
export default {
  name: "App",
  components: {
    QuickSort,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
