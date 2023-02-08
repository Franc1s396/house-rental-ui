import request from "@/utils/request";

//TODO 邮箱登录

/**
 * 密码登录
 */
export function passLogin(username, password,code,uuid) {
    const data = {
        username,
        password,
        code,
        uuid
    }
    return request({
        url: '/auth/pass',
        headers: {
            isToken: false
        },
        method: 'post',
        data: data
    })
}

export function register(data) {
    return request({
        url: '/auth/register',
        method: 'post',
        data: data,
        headers: {
            isToken: false
        }
    })
}

export function getUserInfo() {
    return request({
        url: '/users/info',
        method: 'get'
    })
}

export function logout() {
    return request({
        url: '/auth/logout',
        method: 'post'
    })
}

export function verifyCode() {
    return request({
        url: '/auth/verify-code',
        method: 'get'
    })
}
