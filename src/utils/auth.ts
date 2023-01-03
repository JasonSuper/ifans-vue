import Cookies from 'js-cookie'
import * as CryptoJS from 'crypto-js'

const TokenKey = 'Admin-Token'

const ExpiresInKey = 'Admin-Expires-In'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getExpiresIn() {
  return Cookies.get(ExpiresInKey) || -1
}

export function setExpiresIn(time: any) {
  return Cookies.set(ExpiresInKey, time)
}

export function removeExpiresIn() {
  return Cookies.remove(ExpiresInKey)
}

/**
 *加密处理
 */
export const encryption = (params: any) => {
  const { data, type, param } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach((ele: any) => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach((ele: any) => {
      var data = result[ele]
      const key = CryptoJS.enc.Latin1.parse(params.key)
      var iv = key
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
      })
      result[ele] = encrypted.toString()
    })
  }
  return result
}
