import Vue from 'vue'
import Vuex from 'vuex'
import {passLogin, getUserInfo, logout} from "@/api/login";
import {getToken, removeToken, setToken} from "@/utils/auth";
import {Message} from "element-ui";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: getToken(),
        name: '',
        avatar: ''
    },
    getters: {
        token:state =>state.token,
        name: state => state.name,
        avatar: state => state.avatar,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        }
    },
    actions: {
        passLogin({commit,state}, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            return new Promise((resolve, reject) => {
                passLogin(username, password).then(res => {
                    Message.success('登录成功')
                    let token="Bearer "+res.data.token;
                    setToken(token)
                    commit('SET_TOKEN', token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        getUserInfo({commit,state}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(resp => {
                    const user = resp.data;
                    commit('SET_NAME', user.nickname)
                    commit('SET_AVATAR', user.avatarUrl)
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(resp => {
                    commit('SET_TOKEN', undefined)
                    removeToken()
                    resolve()
                }).catch(error=>{
                    reject(error)
                })
            })
        }
    },
    modules: {}
})
