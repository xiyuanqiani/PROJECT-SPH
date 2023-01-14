// 路由配置信息
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'

export default [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta:{show:true}
    },
    {
        // 如果路由要求传递params参数，但是你就不传递，会发现url有问题
        // 如何指定params参数传递或不传递，在配置路由时，在占位符后面加上一个问号?
        path:'/search/:keyword?',
        component:Search,
        meta:{show:true},
        name:'search'
    },
    {
        path:'/login',
        component:Login,
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{show:true}
    },
    {
        path:'/shopcart',
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{show:true}
    },
    {
        path:'/pay',
        component:Pay,
        meta:{show:true}
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{show:true}
    }
]