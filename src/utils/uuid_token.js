import { v4 as uuidv4 } from 'uuid'
export const getUUID =()=> {
    // 要生成一个随机字符串，且每次执行不能发生变化，且要持久存储
    // 先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if(!uuid_token){
        // 如果没有，则创建
        uuid_token = uuidv4()
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}