import request from "@/utils/request";

export function tenantBillList(queryParams) {
    return request({
        url: '/bills/tenant',
        method: 'get',
        params: queryParams
    });
}

export function landlordBillList(queryParams) {
    return request({
        url: '/bills/landlord',
        method: 'get',
        params: queryParams
    });
}

export function billInfo(billId) {
    return request({
        url: '/bills/' + billId,
        method: 'get',
    })
}

export function billPreview(queryParam) {
    return request({
        url: '/bills/pre-bill',
        method: 'get',
        params: queryParam
    })
}

export function createBill(data) {
    return request({
        url: '/bills',
        method: 'post',
        data: data
    })
}




