import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/podcast',
      name: 'podcast',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/resource',
      name: 'resource',
      component: () => import('@/pages/About.vue'),
    },

  ],
})

export default router
