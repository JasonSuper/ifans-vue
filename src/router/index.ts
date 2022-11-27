import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const constantRoutes = [
    {
        path: '',
        name: 'home',
        component: () => import('@/components/layout/Layout.vue'),
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
            }
        ]
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
                component: () => import('@/views/store/GoodsInfo.vue'),
            },
        ]
    },
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
