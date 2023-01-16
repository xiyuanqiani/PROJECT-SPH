import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'


// 编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?

//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写Push/Replace
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        //y等于0，表示路由跳转时，滚动条在顶部
        return { x: 0, y: 0 }
      }
})

// 全局前置守卫
router.beforeEach(async(to,from,next)=>{
    let token = store.state.User.token
    let loginName = store.state.User.userInfo.loginName
    // 用户已经登录
    if(token){
        // 用户已经登录且想去Login，不准去且停留在首页
        if(to.path=='/login'){
            next('/home')
        }
        // 用户已经登录去非Login页面
        else{
            // 有用户名
            if(loginName){
                next()
            }
            //没有用户名，就派发actions
            else{
                try {
                  await  store.dispatch('userInfo')
                    next()
                } catch (error) {
                    // token过期,重新登录
                   await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else{
        // 没有登录不能去交易支付个人中心,点击应去到登录
        let topath = to.path
        if(topath.indexOf('/trade')!=-1 ||topath.indexOf('/pay')!=-1 ||topath.indexOf('/center')!=-1){
            // 把未登录的时候未去成的地方的路由存储到地址栏中
            next('/login?redirect='+topath)
        }else{
            next()
        }
        
    }
})

export default router