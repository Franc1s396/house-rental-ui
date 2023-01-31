import request from "@/utils/request";

export function orderPay(orderNo) {
    return request({
        url: '/payments/alipay/order?orderNo=' + orderNo,
        method: 'get'
    })
}

export function billPay(billNo) {
    return request({
        url: '/payments/alipay/bill?billNo=' + billNo,
        method: 'get'
    })
}
