import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import './style.css'
import App from './App.vue'
import router from "@/router" // 导入路由配置

registerMicroApps([
  {
    name: 'vite-sub-app', // 子应用名称
    entry: '//localhost:5001', // 子应用Vite服务地址 明确指定入口文件
    container: '#subapp-container', // 挂载节点
    activeRule: '/vite-sub-app', // 路由匹配规则
  },
]);

// 启动 qiankun
start({
  sandbox: {
    // 启用样式隔离（可选）
    experimentalStyleIsolation: true,
  },
});

const app = createApp(App)
app.use(router)
app.mount('#app')
