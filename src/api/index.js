// api进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'

export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqGetBannerList = () => mockRequests({url:'/banner',method:'get'})
export const reqGetFloor = () => mockRequests({url:'/floor',method:'get'})
// 这个接口需要传参
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})
// 商品详情
export const reqGoodsInfo = (skuid) => requests({url:`/item/${skuid}`,method:'get'})