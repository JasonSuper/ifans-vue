import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const constantRoutes = [
    {
        path: '',
        name: 'home',
        redirect: '/yingyuan',
        component: () => import('@/views'),
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
        path: '/register',
        name: 'register',
        component: () => import('@/views/register'),
        hidden: true
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
})

export default router
