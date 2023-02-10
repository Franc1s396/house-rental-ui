import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/index";
import Login from "@/views/index/login";
import House from "@/views/house/house";
import HouseInfo from "@/views/house/house-info";
import Home from "@/views/index/home";
import User from "@/views/user/user";
import PassChange from "@/views/user/pass-change";
import TenantOrder from "@/views/order/tenant-order";
import Contract from "@/views/order/contract";
import LandlordOrder from "@/views/order/landlord-order";
import TenantBill from "@/views/bill/tenant-bill";
import LandlordBill from "@/views/bill/landlord-bill";
import RentableOrder from "@/views/order/rentable-order";
import HouseList from "@/views/house/house-list";
import HouseDetails from "@/views/house/house-details";
import Register from "@/views/index/register";
import PayLog from "@/views/support/pay-log";
import HouseFavourite from "@/views/house/house-favourite";
import HomeMessage from "@/views/support/home-message";

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
                        name: 'pass-change',
                        component: PassChange
                    },
                    {
                        path: '/home/order/tenant',
                        name: 'order-tenant',
                        component: TenantOrder
                    },
                    {
                        path: '/home/order/landlord',
                        name: 'order-landlord',
                        component: LandlordOrder
                    },
                    {
                        path: '/home/bill/tenant',
                        name: 'bill-tenant',
                        component: TenantBill
                    },
                    {
                        path: '/home/bill/landlord',
                        name: 'bill-landlord',
                        component: LandlordBill
                    },
                    {
                        path: '/home/order/rentable',
                        name: 'rentable-order',
                        component: RentableOrder
                    },
                    {
                        path: '/home/house',
                        name: 'house-list',
                        component: HouseList
                    },
                    {
                        path: '/home/house/details',
                        name: 'house-details',
                        component: HouseDetails
                    },
                    {
                        path: '/home/pay-log',
                        name: 'pay-log',
                        component: PayLog
                    },
                    {
                        path: '/home/house/favourites',
                        name: 'house-favourite',
                        component: HouseFavourite
                    },
                    {
                        path: '/home/message',
                        name: 'home-message',
                        component: HomeMessage
                    }
                ]
            },

        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/order/contract',
        name: 'contract',
        component: Contract
    }
]

const router = new VueRouter({
    routes
})

export default router
