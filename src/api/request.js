// 对axios进行二次封装
import axios from 'axios'
// 引入nprogress,start开始，done结束
import nprogress from 'nprogress'
// 引入nprogress样式
import "nprogress/nprogress.css"
// 引入store
import store from '@/store'

// axios实例
const requests = axios.create({
    baseURL:'/api',
    timeout:5000,

})

// 请求拦截器
requests.interceptors.request.use((config) => {
    if(store.state.Detail.uuid_token){
        // 请求头添加一个字段（userTempId）后台给的
        config.headers.userTempId = store.state.Detail.uuid_token
    }
    // 需要带token给服务器
    if(store.state.User.token){
        config.headers.token = store.state.User.token
    }
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    (res)=>{
        nprogress.done()
        return res.data
    },
    (error) => {
        return Promise.reject(new Error('faile'))
    }
)

// 对外暴露
export default requests