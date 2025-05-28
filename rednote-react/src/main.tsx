import './public-path.ts'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { Root } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import 'antd/dist/reset.css'  // antd 样式
import '@/styles/global.css'  // 全局样式
import router from './router'

interface QiankunProps {
  container?: HTMLElement;
  [key: string]: unknown;
}

let root: Root | null = null

function render(props: QiankunProps = {}) {
  const { container } = props
  const rootElement = container ? container.querySelector('#rednote-container') : document.getElementById('rednote-container')
  
  root = createRoot(rootElement!)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  )
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// 导出 qiankun 生命周期钩子
export async function bootstrap() {
  console.log('react app bootstraped')
}

export async function mount(props: QiankunProps) {
  console.log('react app mounted', props)
  render(props)
}

export async function unmount() {
  console.log('react app unmounted')
  root?.unmount()
  root = null
}
