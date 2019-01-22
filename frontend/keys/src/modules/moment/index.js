import Vue from 'vue'
import moment from 'moment'

moment.locale('ru')

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('LLL')
  }
})
