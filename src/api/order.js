import request from "@/utils/request";

export function tenantOrderList(queryParams) {
    return request({
        url: '/orders/tenant',
        method: 'get',
        params: queryParams
    });
}

export function landlordOrderList(queryParams) {
    return request({
        url: '/orders/landlord',
        method: 'get',
        params: queryParams
    });
}

export function allRentableOrderList() {
    return request({
        url: '/orders/rentable-orders',
        method: 'get'
    });
}

export function orderInfo(orderId) {
    return request({
        url: '/orders/' + orderId,
        method: 'get',
    })
}

export function createOrder(data) {
    return request({
        url: '/orders',
        method: 'post',
        data: data
    })
}

export function confirmOrder(orderId) {
    return request({
        url: '/orders/' + orderId + '/confirm',
        method: 'put'
    })
}

export function cancelOrder(orderId) {
    return request({
        url: '/orders/' + orderId + '/cancel',
        method: 'put'
    })
}

