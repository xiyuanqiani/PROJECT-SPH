import Vue from 'vue'
import App from './App.vue'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
import Pagination from './components/Pagination'
import store from './store'

// 注册TypeNav为全局组件
Vue.component('TypeNav',TypeNav)
//注册Carousel为全局组件
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

// 统一接口api里所有函数（不使用vuex）
import * as API from '@/api'

Vue.config.productionTip = false

// 引入mock数据
import '@/mock/mockServe'
//引入swiper样式
import 'swiper/swiper-bundle.min.css'

// 引入element-ui
import { MessageBox } from 'element-ui';

import router from './router/index'

// 引入懒加载的图片
import hyrz from '@/assets/R.gif'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading: hyrz
})

new Vue({
  beforeCreate(){
      Vue.prototype.$bus = this
      Vue.prototype.$API = API
      Vue.prototype.$msgbox = MessageBox;
      Vue.prototype.$alert = MessageBox.alert;
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
