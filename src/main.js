import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {download} from "@/utils/request";

Vue.config.productionTip = false
Vue.prototype.download = download

Vue.use(Element)

router.beforeEach((to, from, next) => {
    // 在进入登录页面时判断是否已经登录 如果已经登录就跳转到首页
    if (to.path === '/login') {
        if (store.getters.token !== undefined) {
            Message.error('您已登录!')
            next('/');
        }else {
            next();
        }
    } else {
        next();
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
