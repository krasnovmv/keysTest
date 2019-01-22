import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://127.0.0.1:8000/'

Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('keys_token')
