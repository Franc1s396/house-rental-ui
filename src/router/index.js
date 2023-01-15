import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/index";
import Login from "@/views/index/login";
import House from "@/views/house/house";
import HouseInfo from "@/views/house/house-info";
import Home from "@/views/index/home";
import User from "@/views/user/user";
import PassChange from "@/views/user/pass-change";

Vue.use(VueRouter)

const routes = [
    {
        path: '/index',
        name: 'index',
        component: Index,
        children: [
            {
                path: '/index',
                name: 'house',
                component: House
            },
            {
                path: '/house/info',
                name: 'house-info',
                component: HouseInfo
            },
            {
                path: '/home',
                name: 'home',
                component: Home,
                children: [
                    {
                        path: '/home/user/info',
                        name: 'user-info',
                        component: User
                    },
                    {
                        path: '/home/user/pass',
                        name:'pass-change',
                        component: PassChange
                    }
                ]
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            }
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router
