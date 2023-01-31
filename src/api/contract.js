import request from "@/utils/request";

export function generateContract(orderId) {
    return request({
        url: '/contracts/order/' + orderId,
        method: 'get'
    })
}

export function signContract(orderId) {
    return request({
        url: '/contracts/order/' + orderId + '/sign',
        method: 'put'
    })
}
