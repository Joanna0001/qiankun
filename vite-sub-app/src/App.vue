<template>
  <div class="h-full">
    <a-layout>
      <a-layout-header class="bg-white px-5 shadow-md">
        <h2 class="text-blue-500 m-0 leading-16">子应用</h2>
      </a-layout-header>
      <a-layout-content class="p-6 bg-gray-50 min-h-[calc(100vh-64px)]">
        <a-card title="子应用内容" :bordered="false">
          <p>这是子应用的内容区域</p>
          <a-button type="primary">Ant Design Vue 按钮</a-button>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
// 使用 setup 语法
</script>

<style scoped>
.sub-app {
  height: 100%;
}

.header {
  background: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header h2 {
  color: #1890ff;
  margin: 0;
  line-height: 64px;
}

.content {
  padding: 24px;
  background: #f0f2f5;
  min-height: calc(100vh - 64px);
}
</style>
