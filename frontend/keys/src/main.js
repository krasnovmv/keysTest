import Vue from 'vue'
import App from './App.vue'
import router from './modules/router'
import store from './modules/store'
import './modules/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
