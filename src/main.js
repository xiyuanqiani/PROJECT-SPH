import Vue from 'vue'
import App from './App.vue'
import TypeNav from './components/TypeNav'
import store from './store'

// 注册TypeNav为全局组件
Vue.component('TypeNav',TypeNav)

Vue.config.productionTip = false



import router from './router/index'
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
