import { createApp } from 'vue'
import { registerMicroApps, start } from 'qiankun'
import './style.css'
import App from './App.vue'
import router from "@/router" // 导入路由配置
import 'ant-design-vue/dist/reset.css'

registerMicroApps([
  {
    name: 'vite-sub-app', // 子应用名称
    entry: 'http://localhost:5001', // 子应用Vite服务地址
    container: '#subapp-container', // 挂载节点
    activeRule: '/vite-sub-app', // 路由匹配规则
  },
  {
    name: 'rednote-react',
    entry: '//localhost:5002',
    container: '#rednote-container',
    activeRule: '/rednote'
  }
]);

// 启动 qiankun
start({
  sandbox: {
    experimentalStyleIsolation: true,
  }
});

const app = createApp(App)
app.use(router)
app.mount('#app')
