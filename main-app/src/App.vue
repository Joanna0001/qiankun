<template>
  <div id="app">
    <h1>主应用</h1>
    <!-- <router-link to="/vite-sub-app">加载子应用</router-link> -->
    <MicroAppContainer />
  </div>
</template>

<script>
import MicroAppContainer from './layouts/MicroAppContainer.vue'

export default {
  components: { MicroAppContainer }
}
</script>