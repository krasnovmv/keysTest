import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {
        name: 'chat'
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('./../../views/Chat.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('./../../views/Auth.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/auth']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('keys_token')

  if (authRequired && !loggedIn) {
    return next('/auth')
  }

  next()
})

export default router
