import { createRouter, createWebHistory } from 'vue-router'
import { ROUTE_NAMES } from '@/constants/routeNames'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.Layout,
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAMES.Home,
          component: () => import('@/pages/HomePage/HomePage.vue'),
          meta: {
            title: 'Статистика',
          },
        },
      ],
    },
    {
      path: '/',
      name: 'GuestLayout',
      component: () => import('@/layouts/GuestLayout.vue'),
      children: [
        {
          path: '/sign-in',
          name: ROUTE_NAMES.LoginPage,
          component: () => import('@/pages/LoginPage/LoginPage.vue'),
        },
      ],
    },
  ],
})

export default router
