import request from '@/utils/request'

// 排行榜列表
export function list(page: any) {
    return request({
        url: '/rank/list',
        method: 'post',
        data: page
    })
}

// 获取当前用户道具
export function bag() {
    return request({
        url: '/rank/userGoods/bag',
        method: 'get'
    })
}

// 打call
export function hitcall(data: any) {
    return request({
        url: '/rank/hitCall',
        method: 'post',
        data: data
    })
}