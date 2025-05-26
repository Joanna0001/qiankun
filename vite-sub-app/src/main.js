import './public-path';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './style.css'
import App from './App.vue'
import routes from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let instance = null
let router = null

function render(props = {}) {
  const { container } = props
  const app = createApp(App)

  // 创建路由
  router = createRouter({
    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vite-sub-app/' : '/'),
    routes
  })
  app.use(router)

  // 使用 Pinia
  const pinia = createPinia()
  app.use(pinia)

  // 使用 Ant Design Vue
  app.use(Antd)

  // 挂载到指定容器或默认 #sub-app
  instance = app.mount(container ? container.querySelector('#sub-app') : '#sub-app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 导出生命周期钩子
export async function bootstrap() {
  console.log('子应用 bootstrap')
}

export async function mount(props) {
  console.log('子应用 mount', props)
  render(props)
}

export async function unmount() {
  console.log('子应用 unmount')
  instance?.unmount()
  instance = null
}