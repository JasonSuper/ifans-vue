import request from '@/utils/request'

// 订单列表
export function list(page: any) {
    return request({
        url: '/order/list',
        method: 'post',
        data: page
    })
}


// 创建订单
export function createOrder(data: any) {
    return request({
        url: '/order/createOrder',
        method: 'post',
        data: data
    })
}

// 获取商品购买参数加密ticket
export function prepare(data: any) {
    return request({
        url: '/order/ticket/prepare',
        method: 'post',
        data: data
    })
}

// 确认订单信息
export function confrimInfo(token: string) {
    return request({
        url: '/order/confrimInfo/' + token,
        method: 'get'
    })
}

// 生成支付页面
export function pay(orderId: string) {
    return request({
        url: '/order/pay',
        method: 'post',
        data: {
            orderId: orderId
        }
    })
}

// 取消订单
export function closepay(orderNo: string) {
    return request({
        url: '/order/closepay/' + orderNo,
        method: 'get',
    })
}
