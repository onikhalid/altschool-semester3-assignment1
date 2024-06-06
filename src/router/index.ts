import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/repos',
      name: 'repos',
      component: () => import('../views/RepositoriesView.vue')
    },
    {
      path: '/repos/:repoName',
      name: 'repo-detail',
      component: () => import('../views/RepositoriesDetailView.vue')
    },
    {
      path: '/boundary',
      name: 'boundary',
      component: () => import('../views/BoundaryView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    },
  ]
})

export default router
