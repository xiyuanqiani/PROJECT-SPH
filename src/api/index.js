// api进行统一管理
import requests from './request.js'

export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})