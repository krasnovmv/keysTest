import Vue from 'vue'
import axios from 'axios'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('keys_token')

const module = {
  namespaced: true,
  state: {
    users: [],
    chat: [],
    currentUser: {}
  },
  getters: {},
  mutations: {
    getUsers (state, payload) {
      state.users = payload.results
    },
    getChat (state, payload) {
      state.chat = payload.results
    },
    sendMessage (state, payload) {
      state.chat.push(payload)
    }
  },
  actions: {
    getUsers ({ commit }, payload) {
      return Vue.axios.get('/users/').then(response => {
        return commit('getUsers', response.data)
      })
    },
    getChat ({ commit }, payload) {
      return Vue.axios.get(`/chat/${payload.user}/`).then(response => {
        return commit('getChat', response.data)
      })
    },
    sendMessage ({ commit }, payload) {
      return Vue.axios.post(`/chat/${payload.user}/`, {
        message: payload.message
      }).then(response => {
        return commit('sendMessage', response.data)
      })
    }
  }
}

export default module
