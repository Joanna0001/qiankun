<template>
    <h1>主应用</h1>
    <!-- <router-link to="/vite-sub-app">加载子应用</router-link> -->
    <MicroAppContainer />
</template>

<script>
import MicroAppContainer from './layouts/MicroAppContainer.vue'

export default {
  components: { MicroAppContainer }
}
</script>