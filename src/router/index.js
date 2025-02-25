import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { inject } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
      meta: { requireAuth: true },
    },
  ],
})

router.beforeEach((to, from) => {
  const Store = inject('Store')
  if (to.meta.requireAuth && !Store.userToken.value) {
    alert('Vous devez être connecté !')
    return { name: 'home' }
  }
})

export default router
