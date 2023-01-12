import {reqCartList,reqDeleteCart,reqIsChecked} from '@/api'
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车数据
    async deleteCartList({commit},skuid){
        let result = await reqDeleteCart(skuid)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 购物车商品选中状态(坑：忘了加await)
    async changeChecked({commit},{skuid,isChecked}){
        let result = await reqIsChecked(skuid,isChecked)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部选中的商品
     deleteAllCheckedCart({dispatch,getters}){
        // 获取购物车的全部商品是一个数组
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1?dispatch('deleteCartList',item.skuId):''
            // 将每一次返回的Promise添加到数组中
            promiseAll.push(promise)
        });
        // 全部的返回成功才都成功，只要有一个错误，就失败
        return Promise.all(promiseAll)
    },
    // 全选
    changeAllChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
            let promise = dispatch('changeChecked',{skuid:item.skuId,isChecked})
            promiseAll.push(promise) 
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}