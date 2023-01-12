// 对axios进行二次封装
import axios from 'axios'
// 引入nprogress,start开始，done结束
import nprogress from 'nprogress'
// 引入nprogress样式
import "nprogress/nprogress.css"


// axios实例
const requests = axios.create({
    baseURL:'/mock',
    timeout:5000,

})

// 请求拦截器
requests.interceptors.request.use((config) => {
    
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