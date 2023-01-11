import Vue from 'vue'
import Vuex from 'vuex'
import {passLogin, getUserInfo, logout} from "@/api/login";
import {getToken, removeToken, setToken} from "@/utils/auth";

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
            // const code = userInfo.code
            // const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                passLogin(username, password).then(res => {
                    setToken(res.data.token)
                    commit('SET_TOKEN', res.data.token)
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
                    console.log(user);
                    commit('SET_NAME', user.nickname)
                    commit('SET_AVATAR', user.avatarUrl)
                    console.log(state.name);
                    console.log(state.avatar);
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(resp => {
                    commit('SET_TOKEN', '')
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
