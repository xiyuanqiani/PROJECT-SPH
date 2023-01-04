import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

// 第一个参数请求地址，第二个参数请求数据
// 请求地址注意路径，最前面加斜杠！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
Mock.mock("/mock/banner",{code:200,data:banner})
Mock.mock("/mock/floor",{code:200,data:floor})
