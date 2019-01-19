import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
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
