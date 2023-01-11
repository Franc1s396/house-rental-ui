import request from "@/utils/request";

export function findHousePage(queryParams) {
    return request({
        url: '/house/page',
        method: 'get',
        params: queryParams
    })
}
