import Vue from 'vue'
import router from './router'
import store from './store'
import Home from './views/home'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Home)
}).$mount('#app')
