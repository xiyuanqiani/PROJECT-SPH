// api进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'
import { isCancel } from 'axios'

export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqGetBannerList = () => mockRequests({url:'/banner',method:'get'})
export const reqGetFloor = () => mockRequests({url:'/floor',method:'get'})
// 这个接口需要传参
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})
// 商品详情
export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`,method:'get'})
// 加入购物车
export const reqAddOrUpdateShopCart = (skuid,skuNum) => requests({url:`/cart/addToCart/${ skuid }/${ skuNum }`,method:'post'})
// 获取购物车列表
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'})
// 删除购物车
export const reqDeleteCart = (skuid) => requests({url:`/cart/deleteCart/${skuid}`,method:'delete'})
// 购物车勾选状态
export const reqIsChecked = (skuid,isChecked) => requests({url:`/cart/checkCart/${skuid}/${isChecked}`,method:'get'})
//获取验证码地址
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 用户注册
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})
//用户登录
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})
// 获取用户登录信息，需要带着用户token向服务器要信息
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'})
//退出登录
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})