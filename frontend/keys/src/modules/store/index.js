import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import chat from './modules/chat'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    chat
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
})

export default store
