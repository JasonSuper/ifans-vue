import {getInfo, login, logout} from '@/api/login'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {defineStore} from "pinia";

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            token: getToken(),
            name: '',
            sex: '',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            roles: [] as any[],
            permissions: [] as any[],
        }),
        actions: {
            // 登录
            login(userInfo: any) {
                const email = userInfo.email.trim()
                const password = userInfo.password
                return new Promise((resolve, reject) => {
                    login(email, password).then(res => {
                        let data = res.data
                        setToken(data.access_token)
                        this.token = data.access_token
                        resolve("登陆成功");
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            // 获取用户信息
            getInfo() {
                return new Promise((resolve, reject) => {
                    getInfo().then(res => {
                        const user = res.user
                        const avatar = (user.avatar == "" || user.avatar == null) ? this.avatar : user.avatar;

                        if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                            /*this.roles = res.roles
                            this.permissions = res.permissions*/
                            this.roles = res.roles
                            this.permissions = ['a:a:a']
                        } else {
                            this.roles = ['ROLE_DEFAULT']
                        }
                        this.name = user.userName
                        this.sex = user.sex
                        this.avatar = avatar;
                        resolve(res)
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            // 退出系统
            logOut() {
                return new Promise((resolve, reject) => {
                    logout().then(() => {
                        this.token = ''
                        this.roles = []
                        this.permissions = []
                        removeToken()
                        resolve("已登出")
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    });

export default useUserStore
