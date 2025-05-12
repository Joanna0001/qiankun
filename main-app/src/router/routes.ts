
import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/vite-sub-app*', // 匹配子应用路由
    component: () => import('@/layouts/MicroAppContainer.vue'), // 空容器组件
  },
  // 404 页面
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404'
  // }
]

export default routes