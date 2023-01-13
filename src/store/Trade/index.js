import { reqAddressInfo,reqOrderInfo } from "@/api"
const state = {
    address:[],
    order:{}
}
const mutations = {
    GETADDRESS(state,address){
        state.address = address
    },
    GETORDER(state,order){
        state.order = order
    }
}
const actions = {
    // 获取用户地址
    async getAddressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code==200){
            commit('GETADDRESS',result.data)
        }
    },
    // 获取交易页订单
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code==200){
            commit('GETORDER',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}