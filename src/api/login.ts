import request from '@/utils/request';
import qs from 'qs';
import {validatenull} from "@/utils/validate";


// 登录方法
/*export function login(email: string, password: string) {
  return request({
    url: '/auth/login',
    headers: {
      isToken: false
    },
    method: 'post',
    data: { email, password }
  })
}*/

export function login(username: string, password: string) {
  return request({
    url: '/auth/oauth2/token',
    headers: {
      isToken: false,
      Authorization: 'Basic ' + window.btoa('ifans-auth:ifans-auth-signing'),
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    method: 'post',
    params: { grant_type: 'password', scope: 'all' },
    data: { 'username': username, 'password': password }
  })
}

/**
 * 校验令牌，若有效期小于半小时自动续期
 *
 * 定时任务请求后端接口返回实际的有效时间，不进行本地计算避免 客户端和服务器机器时钟不一致
 * @param refreshLock
 */
export const checkToken = (refreshLock: any, userStore: any, refreshTime: number) => {
  const token = userStore.token;
  // 获取当前选中的 basic 认证信息
  //const basicAuth = getStore({ name: 'basicAuth' })

  if (validatenull(token)) {
    return
  }

  request({
    url: '/auth/token/check_token',
    headers: {
      isToken: false,
      Authorization: 'Basic ' + window.btoa('ifans-auth:ifans-auth-signing'),
    },
    method: 'get',
    params: { token }
  }).then(response => {
    const expire = response && response.data && response.data.exp
    if (expire) {
      const expiredPeriod = expire * 1000 - new Date().getTime()
      console.log('当前token过期时间', expiredPeriod, '毫秒')
      //小于半小时自动续约
      if (expiredPeriod <= 1800000) {
        if (!refreshLock) {
          refreshLock = true
          userStore.RefreshToken().catch(() => {
                clearInterval(refreshTime)
          })
          refreshLock = false
        }
      }
    }
  }).catch(error => {
    console.error(error)
  })
}

export function refreshToken(refresh_token: string) {
  const grant_type = 'refresh_token'

  return request({
    url: '/auth/oauth2/token',
    headers: {
      isToken: false,
      Authorization: 'Basic ' + window.btoa('ifans-auth:ifans-auth-signing'),
    },
    method: 'post',
    params: { refresh_token, grant_type, scope: 'all' }
  })
}

// 注册方法
export function register(data: any) {
  return request({
    url: '/auth/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/system/user/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}