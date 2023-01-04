// api进行统一管理
import requests from './request.js'
import mockRequests from './mockAjax.js'

export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqGetBannerList = () => mockRequests({url:'/banner',method:'get'})
