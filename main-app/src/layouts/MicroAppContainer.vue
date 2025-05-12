<template>
  <!-- 子应用挂载点（ID需与registerMicroApps的container一致） -->
  <div id="subapp-container"></div>
</template>

<script>
export default {
  name: 'MicroAppContainer',
}
</script>

<style scoped>
/* 可选：限制容器样式，避免影响子应用 */
#subapp-container {
  width: 100%;
  min-height: 400px; /* 确保子应用有足够空间 */
}
</style>