import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from "@/api"
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken('TOKEN'),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    CLEAR(state){
        // 仓库清空
        state.token = ''
        state.userInfo = {}
        // 本地存储清空
        removeToken()
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        // 正常情况都是直接发给手机,这里要获取验证码
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // 服务器下发token，是用户唯一标识符
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 获取用户信息
    async userInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('USERINFO',result.data)
           return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
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