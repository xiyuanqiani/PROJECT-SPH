// 路由配置信息

// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。

export default [
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        // 如果路由要求传递params参数，但是你就不传递，会发现url有问题
        // 如何指定params参数传递或不传递，在配置路由时，在占位符后面加上一个问号?
        path:'/search/:keyword?',
        component:()=>import('@/pages/Search'),
        meta:{show:true},
        name:'search'
    },
    {
        path:'/login',
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:'/register',
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    {
        path:'/detail/:skuid',
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        path:'/shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{show:true}
    },
    {
        path:'/trade',
        component:()=>import('@/pages/Trade'),
        meta:{show:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面必须从购物车而来
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/pay',
        component:()=>import('@/pages/Pay'),
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            // 去支付页面必须从trade而来
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:'/paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{show:true}
    },
    {
        path:'/center',
        component:()=>import('@/pages/Center'),
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/MyOrder')
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/GroupOrder'),
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    }
]