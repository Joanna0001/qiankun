const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HelloWorld.vue')
  }
]

export default routes