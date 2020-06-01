// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import VueCookie from 'vue-cookie' 
import Axios from 'axios'

import store from '@/store'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios

import '@/assets/scss/index.scss'
import 'element-ui/lib/theme-chalk/index.css';
import { isAuth } from '@/utils'

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法
Vue.prototype.contextPath = process.env.CONTEXT_PATH

Vue.use(ElementUI);
Vue.use(VueCookie)
// 保存整站vuex本地储存初始状态
// window.SITE_CONFIG['storeState'] = cloneDeep(store.state)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
