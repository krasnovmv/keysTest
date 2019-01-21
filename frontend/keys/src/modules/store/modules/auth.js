import Vue from 'vue'

const module = {
  namespaced: true,
  state: {
    jwt: ''
  },
  getters: {},
  mutations: {
    registration (state) {
    },
    login (state, payload) {
      state.jwt = payload.token
      return payload
    }
  },
  actions: {
    registration (state) {
    },
    login ({ state, commit }, payload) {
      return Vue.axios.post('/auth/obtain_token/', {
        username: payload.username,
        password: payload.password
      }).then((response) => {
        return commit('login', response.data)
      })
    }
  }
}

export default module
