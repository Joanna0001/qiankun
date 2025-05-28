<template>
  <div class="home">
    <!-- <a-card title="主应用" :bordered="false"> -->
      <p>这是主应用的内容</p>
      <div id="subapp-container"></div>
      <div id="rednote-container"></div>
    <!-- </a-card> -->
  </div>
</template>

<script setup lang="ts">
// 使用 setup 语法糖，组件会自动导入
</script>

<style scoped>
/* 可选：限制容器样式，避免影响子应用 */
#subapp-container {
  width: 100%;
  min-height: 400px; /* 确保子应用有足够空间 */
}

.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #1890ff;
  margin-bottom: 20px;
}
</style>