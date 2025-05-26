const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/image-processor',
    name: 'image-processor',
    component: () => import('../views/ImageProcessor.vue')
  }
]

export default routes