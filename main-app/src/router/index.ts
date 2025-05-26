import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import routes from './routes' // 导入路由表

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router