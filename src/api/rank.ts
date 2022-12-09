import request from '@/utils/request'

// 排行榜列表
export function list(page: any) {
    return request({
        url: '/rank/list',
        method: 'post',
        data: page
    })
}
