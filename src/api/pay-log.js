import request from "@/utils/request";

export function payLogList(queryParams) {
    return request({
        url: '/pay-logs',
        method: 'get',
        params: queryParams
    });
}
