import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api/index'
// 封装游客身份模块uuid，生成一个随机字符串，不能再变了
import {getUUID} from '@/utils/uuid_token'
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
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
    },
    //将产品添加到购物车中
    async addOrUpdateCart({commit},{skuid,skuNum}){
        //服务器写入数据成功，并没有返回其他数据，至少code=200，代表成功
        // 因此不需要三连环存储数据
        let result = await reqAddOrUpdateShopCart(skuid,skuNum)
        // 成功
        if(result.code==200){
            return 'ok'
        }else{
            // 失败
            return Promise.reject (new Error('faile'))
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
    },
    // 产品售卖属性简化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}