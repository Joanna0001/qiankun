import { type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/vite-sub-app/:pathMatch(.*)*',
    name: 'vite-sub-app',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/rednote/:pathMatch(.*)*',
    name: 'rednote',
    component: () => import('@/views/Rednote.vue'),
  },
  // 404 页面
  // {
  //   path: '/:pathMatch(.*)*',   
  //   redirect: '/404'
  // }
]

export default routes