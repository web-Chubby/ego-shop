import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//初始化样式
import resst from '@/assets/css/reset.css';
//elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//封装的axios请求
import axios from './api'
//全局使用
Vue.prototype.$axios = axios

Vue.use(ElementUI);

Vue.config.productionTip = false

//检测一下本地是否有token
if (localStorage.getItem("token") && localStorage.getItem("egouser")) {
    store.commit("loginModule/setToken", localStorage.getItem("token"))
    store.commit("loginModule/setUser", localStorage.getItem("egouser"))
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
