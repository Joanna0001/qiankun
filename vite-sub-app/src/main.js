// 在子应用入口文件顶部添加
// 在Vite子应用中，需动态设置publicPath
if (window.__POWERED_BY_QIANKUN__) {
  // @ts-ignore
  __vite_base__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}


import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

let instance = null

function render(props = {}) {
  const { container } = props
  instance = createApp(App)
  instance.use(router)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// Qiankun生命周期钩子
export async function bootstrap() {
  console.log('[vite-sub-app] bootstrap')
}

export async function mount(props) {
  console.log('[vite-sub-app] mount', props)
  render(props)
}

export async function unmount() {
  console.log('[vite-sub-app] unmount')
  instance?.unmount()
  instance = null
}