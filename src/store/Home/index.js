import {reqCategoryList,reqGetBannerList} from '@/api'
const state = {
    categoryList:[],
    // 轮播图数据
    bannerList:[],
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    }
}
const actions = {
    // 通过api里的接口函数向服务器发请求
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code == 200){
            commit('CATEGORYLIST',result.data)
        }
    },
    // 获取轮播图数据
     async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code == 200){
            commit('GETBANNERLIST',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
    // namespaced:true,
}