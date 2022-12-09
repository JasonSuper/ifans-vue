import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const constantRoutes = [
    {
        path: '',
        name: 'home',
        component: () => import('@/components/Layout/Layout.vue'),
        children: [
            {
                path: '',
                name: 'homeview',
                redirect: '/yingyuan',
                component: () => import('@/views/index.vue'),
                children: [
                    {
                        path: 'yingyuan',
                        name: 'yingyuan',
                        component: HomeView
                    },
                    {
                        path: 'about',
                        name: 'about',
                        component: () => import('@/views/AboutView.vue')
                    },
                ]
            },
            {
                path: 'user/edit',
                name: 'edit',
                component: () => import('@/views/user/Edit.vue'),
                hidden: true
            },
            {
                path: 'rank',
                name: 'rank',
                component: () => import('@/views/rank/index.vue'),
                hidden: true
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        hidden: true
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register/index.vue'),
        hidden: true
    },
    {
        path: '/store',
        name: 'store',
        component: () => import('@/views/store/index.vue'),
        hidden: true,
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/store/GoodsList.vue'),
            },
            {
                path: 'info/:id',
                name: 'info',
                meta: {
                    auth: false
                },
                component: () => import('@/views/store/GoodsInfo.vue'),
            },
            {
                path: 'confirmOrder/:ticket',
                name: 'confirmOrder',
                component: () => import('@/views/order/ConfirmOrder.vue'),
                hidden: true,
            },
            {
                path: 'order',
                name: 'order',
                component: () => import('@/views/order/index.vue'),
                hidden: true,
            },
            {
                path: 'order/payCallBack',
                name: 'payCallBack',
                component: () => import('@/views/order/payCallBack/index.vue'),
                hidden: true,
            },
        ]
    }

    /*{
        path: '/user/edit',
        name: 'edit',
        component: () => import('@/views/user/Edit.vue'),
        hidden: true
    }*/
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
})

export default router
