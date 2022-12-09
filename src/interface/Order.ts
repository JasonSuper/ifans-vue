export interface Order {
    id: string,
    orderNo: string,
    orderTime: string,
    userId: string,
    payType: number,
    paymentTime: string,
    orderPrice: string,
    mustPrice: string,
    payPrice: string,
    payStatus: string,
    status: string,
    createBy: string,
    createTime: string,
    updateBy: string,
    updateTime: string,
    storeOrderItems: any
}