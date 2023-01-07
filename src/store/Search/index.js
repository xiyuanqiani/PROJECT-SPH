import { reqGetSearchInfo } from "@/api"
const state = {
    searchList:{}
}
const mutations = {
    GETSEARCHINFO(state,searchList){
        state.searchList = searchList
    }
}
const actions = {
   async getSearchInfo({commit},params={}){
    // 当前这个reqGetSearchInfo在调用服务器数据时，至少需要传递一个空对象
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            commit('GETSEARCHINFO',result.data)
        }
    }
}
// getters简化state数据
const getters = {
    // 这里的参数state表示本仓库的state
    goodsList(state){
        // 假如网络不给力、没有网，返回的是undefined
        // 计算新的属性的属性值至少应该来个数组
        return state.searchList.goodsList||[]
    },
    attrsList(state){
        return state.searchList.attrsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}