import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element, {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import {download} from "@/utils/request";
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

Vue.component('v-icon', Icon)

Vue.config.productionTip = false
Vue.prototype.download = download

Vue.use(Element)
Vue.use(VueAreaLinkage)

router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.pageYOffset = 0;
    if (to.path === '/') {
        next('/index');
    }else if (to.path === '/login') {
        if (store.state.token !== undefined) {
            Message.error('您已登录!')
            next('/index');
        } else {
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
