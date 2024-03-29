import request from '@/utils/request'

// 修改基础信息
export function editInfo(avatar: string, userName: string, sex: string) {
  return request({
    url: '/system/user/editInfo',
    method: 'post',
    data: { avatar, userName, sex }
  })
}

// 上传头像
export function uploadAvatar(data: any) {
  return request({
    url: '/system/user/uploadAvatar',
    method: 'post',
    data: data
  })
}