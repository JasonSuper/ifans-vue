import router from './router'
import {ElMessage} from 'element-plus'
import {getToken} from '@/utils/auth'
import useUserStore from '@/stores/user'
import {isRelogin} from '@/utils/request'

const whiteList = ['/login', '/register', "/", "/yingyuan", "/about"];

router.beforeEach((to, from, next) => {
    if (getToken()) {
        //to.meta.title && useSettingsStore().setTitle(to.meta.title)

        if (useUserStore().roles.length === 0) {
            isRelogin.show = true
            // 判断当前用户是否已拉取完user_info信息
            useUserStore().getInfo().then(() => {
                isRelogin.show = false
                /* usePermissionStore().generateRoutes().then(accessRoutes => {
                     // 根据roles权限生成可访问的路由表
                     /!*accessRoutes.forEach(route => {
                         if (!isHttp(route.path)) {
                             router.addRoute(route) // 动态添加可访问路由表
                         }
                     })*!/
                     next({...to, replace: true}) // hack方法 确保addRoutes已完成
                 })*/
                next({...to, replace: true})
            }).catch(err => {
                useUserStore().logOut().then(() => {
                    ElMessage.error(err)
                    next({path: '/'})
                })
            })
        } else {
            next()
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1 || !to.meta.auth) {
            // 在免登录白名单，直接进入
            next()
        } else {
            ElMessage.error("请进行登录！")
            next("/"); // 否则全部重定向到主页
        }
    }
})