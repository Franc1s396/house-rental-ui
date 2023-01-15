import request from "@/utils/request";

export function updateUser(data){
    return request({
        url:'/user',
        method:'put',
        data:data
    })
}

export function updatePassword(data){
    return request({
        url:'/user/pass',
        method:'put',
        data:data
    })
}
