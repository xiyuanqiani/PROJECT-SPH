import {reqGoodsInfo} from '@/api/index'
const state = {
    goodInfo:{}
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    }
}
const actions = {
    async getGoodInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code == 200){
            commit('GETGOODINFO',result.data)
        } 
    }
}
const getters = {
    // 起始goodInfo至少是一个空对象
    categoryView(state){
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}