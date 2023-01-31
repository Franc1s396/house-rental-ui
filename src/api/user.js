import request from "@/utils/request";

export function updateUser(data){
    return request({
        url:'/users',
        method:'put',
        data:data
    })
}

export function updatePassword(data){
    return request({
        url:'/users/pass',
        method:'put',
        data:data
    })
}
