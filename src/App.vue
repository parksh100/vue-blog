<template>
  <div>
    <Navigation class="mb-3" />
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
export default {
  name: "App",
  components: {
    Navigation,
  },
};
</script>

<style>
* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>
