<template>
  <div id="app">
    <h2>Vue 子应用</h2>
    <!-- <p>当前运行在 {{ isQiankun ? '微前端' : '独立' }} 模式</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // isQiankun: window.__POWERED_BY_QIANKUN__
    }
  },
}
</script>

<style>
#app {
  border: 2px dashed #42b983;
  padding: 20px;
}
</style>
