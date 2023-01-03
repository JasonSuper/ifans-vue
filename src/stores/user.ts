import {getInfo, login, logout, refreshToken} from '@/api/login'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {defineStore} from "pinia";
import { encryption } from '@/utils/auth'

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            token: getToken(),
            refresh_token: '',
            name: '',
            sex: '',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            roles: [] as any[],
            permissions: [] as any[],
        }),
        actions: {
            // 登录
            login(userInfo: any) {
                //const email = userInfo.email.trim()
                //const password = userInfo.password
                const user = encryption({
                    data: userInfo,
                    key: '1234567890123456',
                    param: ['password']
                })

                return new Promise((resolve, reject) => {
                    login(user.email.trim(), user.password).then(res => {
                        const { access_token, token_type, refresh_token } = res;
                        const accessToken = token_type + ' ' + access_token;
                        setToken(access_token)
                        this.token = accessToken;
                        this.refresh_token = refresh_token;

                        /*let data = res.data
                        setToken(data.access_token)
                        this.token = data.access_token*/
                        resolve("登陆成功");
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            // 刷新token
            RefreshToken() {
                return new Promise((resolve, reject) => {
                    refreshToken(this.refresh_token).then((res: any) => {
                        const { access_token, token_type, refresh_token } = res;
                        const accessToken = token_type + ' ' + access_token;
                        setToken(access_token)
                        this.token = accessToken;
                        this.refresh_token = refresh_token;
                        //resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            // 获取用户信息
            getInfo() {
                return new Promise((resolve, reject) => {
                    getInfo().then(res => {
                        res = res.data
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
