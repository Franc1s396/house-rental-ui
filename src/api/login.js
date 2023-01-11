import request from "@/utils/request";

//TODO 邮箱登录

/**
 * 密码登录
 */
export function passLogin(username, password){
    const data={
        username,
        password
    }
    return request({
        url:'/auth/pass',
        headers: {
            isToken: false
        },
        method:'post',
        data:data
    })
}

export function getUserInfo(){
    return request({
        url:'/user/info',
        method:'get'
    })
}

export function logout(){
    return request({
        url:'/auth/logout',
        method:'post'
    })
}
