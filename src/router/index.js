import Vue from 'vue'
import VueRouter from 'vue-router'
import index from "@/views/index";
import login from "@/views/index/login";
import house from "@/views/house/house";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: index,
    children:[
      {
        path:'/',
        name:'house',
        component:house
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
