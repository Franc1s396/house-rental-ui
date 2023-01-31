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
        path: '/order/contract',
        name: 'contract',
        component: Contract
    }
]

const router = new VueRouter({
    routes
})

export default router
