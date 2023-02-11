import request from '@/utils/request'

// 商品es查询
export function search(param: any) {
    return request({
        url: '/es/goods/search',
        method: 'post',
        data: param
    })
}

// 前缀搜索推荐
export function suggestGoods(keyWord: string) {
    return request({
        url: '/es/goods/suggestGoods/' + keyWord,
        method: 'get',
    })
}