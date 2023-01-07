import Vue from 'vue'
import App from './App.vue'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import store from './store'

// 注册TypeNav为全局组件
Vue.component('TypeNav',TypeNav)
//注册Carousel为全局组件
Vue.component(Carousel.name,Carousel)

Vue.config.productionTip = false

// 引入mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/swiper-bundle.min.css'

import router from './router/index'
new Vue({
  beforeCreate(){
      Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
