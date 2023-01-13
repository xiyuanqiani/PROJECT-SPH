import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Home from '@/store/Home'
import Search from '@/store/Search'
import Detail  from './Detail'
import ShopCart from './ShopCart'
import User from './User'
import Trade from './Trade'

export default new Vuex.Store({
    modules:{
        Home,
        Search,
        Detail,
        ShopCart,
        User,
        Trade
    }
})