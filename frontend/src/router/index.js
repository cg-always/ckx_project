import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/',              name: 'home',      component: () => import('../views/HomeView.vue') },
  { path: '/glossary',      name: 'glossary',  component: () => import('../views/GlossaryView.vue') },
  { path: '/checklist',     name: 'checklist', component: () => import('../views/ChecklistView.vue') },
  { path: '/flowchart',     name: 'flowchart', component: () => import('../views/FlowchartView.vue') },
  { path: '/templates',     name: 'templates', component: () => import('../views/TemplatesView.vue') },
  { path: '/cases',         name: 'cases',     component: () => import('../views/CasesView.vue') },
  { path: '/links',         name: 'links',     component: () => import('../views/LinksView.vue') },
  { path: '/login',         name: 'login',     component: () => import('../views/LoginView.vue') },
  { path: '/dashboard',     name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
  { path: '/admin',         name: 'admin',     component: () => import('../views/AdminView.vue'), meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  if (to.meta.requiresAuth && !user) {
    return next({ name: 'login' })
  }
  if (to.meta.requiresAdmin && user?.role !== 'admin') {
    return next({ name: 'home' })
  }
  next()
})

export default router
