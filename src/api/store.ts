import request from '@/utils/request'

// 道具列表
export function list(page: any) {
    return request({
        url: '/store/goods/list',
        method: 'post',
        data: page
    })
}

// 根据id查询道具信息
export function infoById(id: string | string[]) {
    return request({
        url: '/store/goods/info/' + id,
        method: 'get'
    })
}