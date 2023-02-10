import request from "@/utils/request";

export function payLogList(queryParams) {
    return request({
        url: '/pay-logs',
        method: 'get',
        params: queryParams
    });
}

export function messageList(queryParams) {
    return request({
        url: '/messages',
        method: 'get',
        params: queryParams
    });
}

export function messageCount() {
    return request({
        url: '/messages/count',
        method: 'get'
    });
}

export function readMessage(messageId) {
    return request({
        url: '/messages/' + messageId,
        method: 'put'
    });
}

export function readAllMessage() {
    return request({
        url: '/messages/all',
        method: 'put'
    });
}
