import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('../views/BlogList.vue')
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: () => import('../components/blog/BlogPost.vue'),
    props: (route) => ({ postId: route.params.id })
  },
  {
    path: '/documents',
    name: 'Documents',
    component: () => import('../views/Documents.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import('../views/Resume.vue')
  },
  {
    path: '/zhang-haoyan',
    name: 'ZhangHaoyan',
    component: () => import('../views/ZhangHaoyan.vue'),
    meta: {
      title: '张昊岩 🐱 可爱的小世界'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/ErrorPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
