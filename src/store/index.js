import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Home from '@/store/Home'
import Search from '@/store/Search'
import Detail  from './Detail'

export default new Vuex.Store({
    modules:{
        Home,
        Search,
        Detail
    }
})