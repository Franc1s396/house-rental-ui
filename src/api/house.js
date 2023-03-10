import request from "@/utils/request";

export function findHousePage(queryParams) {
    return request({
        url: '/houses',
        method: 'get',
        params: queryParams
    })
}

export function findOwnHousePage(queryParams) {
    return request({
        url: '/houses/own',
        method: 'get',
        params: queryParams
    })
}

export function favouriteHousePage(queryParams) {
    return request({
        url: '/houses/favourite',
        method: 'get',
        params: queryParams
    })
}

export function houseInfo(houseId) {
    return request({
        url: '/houses/' + houseId,
        method: 'get',
    })
}

export function createHouse(data) {
    return request({
        url: '/houses/',
        method: 'post',
        data: data
    })
}

export function updateHouse(data) {
    return request({
        url: '/houses/',
        method: 'put',
        data: data
    })
}

export function onShelfHouse(houseId) {
    return request({
        url: '/houses/' + houseId + '/on-shelf',
        method: 'put'
    })
}

export function downShelfHouse(houseId) {
    return request({
        url: '/houses/' + houseId + '/down-shelf',
        method: 'put'
    })
}

export function removeHouse(houseId) {
    return request({
        url: '/houses/' + houseId,
        method: 'delete'
    })
}

export function favourite(houseId) {
    return request({
        url: '/houses/favourites',
        method: 'post',
        data: houseId
    })
}

