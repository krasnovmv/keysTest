import Vue from 'vue'

const module = {
  namespaced: true,
  state: {
    jwt: ''
  },
  getters: {},
  mutations: {
    registration (state, payload) {
      state.jwt = payload.token
    },
    login (state, payload) {
      state.jwt = payload.token
    }
  },
  actions: {
    registration ({ state, commit }, payload) {
      return Vue.axios.post('/auth/registration/', {
        username: payload.username,
        password: payload.password,
        email: payload.email
      }).then(response => {
        return commit('registration', response.data)
      })
    },
    login ({ state, commit }, payload) {
      return Vue.axios.post('/auth/obtain_token/', {
        username: payload.username,
        password: payload.password
      }).then(response => {
        return commit('login', response.data)
      })
    }
  }
}

export default module
