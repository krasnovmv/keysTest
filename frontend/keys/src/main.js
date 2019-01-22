import Vue from 'vue'
import App from './App.vue'
import router from './modules/router'
import './modules/axios'
import store from './modules/store'
import './modules/vuetify'
import './modules/moment'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
