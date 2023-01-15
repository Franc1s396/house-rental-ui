import request from "@/utils/request";

export function findHousePage(queryParams) {
    return request({
        url: '/house/page',
        method: 'get',
        params: queryParams
    })
}

export function houseInfo(houseId) {
    return request({
        url: '/house/info/'+houseId,
        method: 'get',
    })
}
