import './public-path';
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import routes from './router'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let instance = null
let router = null

function render(props = {}) {
  const { container } = props
  // 创建路由
  router = createRouter({
    history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? '/vite-sub-app/' : '/'),
    routes
  })

  // 创建 Vue 应用
  instance = createApp(App)
  instance.use(router)

  // 挂载到指定容器或默认 #app
  instance.mount(container ? container.querySelector('#app') : '#app')
}

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      const { container } = props
      render(props)
    },
    bootstrap() { },
    unmount() {
      ReactDOM.unmountComponentAtNode(props.container?.querySelector('#app') || document.querySelector('#app'));
    }
  })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()