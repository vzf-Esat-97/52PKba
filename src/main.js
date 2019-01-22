import Vue from 'vue'//引入vue
import Vuex from 'vuex'
import VueResource from 'vue-resource'
//import Layer from 'vue-layer'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/base.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/store'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'//引入swiper
import 'bootstrap'  //引入bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css' //引入awesome样式
import 'admin-lte'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import { Message } from 'element-ui';  // 引入elment信息提示
import clipboard from 'clipboard';
import promise from 'es6-promise'

import { post, fetch, patch, put, Delete, upload } from './http'

promise.polyfill()
Vue.prototype.$post = post;    //post方法
Vue.prototype.$fetch = fetch; // get方法
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;     // put方法
Vue.prototype.$delete = Delete; // 删除方法
Vue.prototype.clipboard = clipboard;
Vue.prototype.$upload = upload;

// axios.defaults.timeout = 5000;
axios.defaults.baseURL = process.env.API_BASE_URL
if (process.env.TITLE_APPEND)
  document.title = `${document.title} (${process.env.TITLE_APPEND})`

axios.defaults.validateStatus = function (status) {
  switch (status) {
    case 200:
    case 400:
    case 401:
    case 403:
    case 500: return true
    default: return false
  }
}

axios.interceptors.request.use(config => {
  //     console.log(`${config.url}  token->${store.state.base.token}`)
  if (store.state.base.token) {
    config.headers.Authorization = store.state.base.token
  }
  return config
}, err => {
  return Promise.reject(err)
})

//http response 拦截器
axios.interceptors.response.use(
  res => {
    switch (res.status) {
      case 500:
        Message.error({
          message: '加载失败'
        })
        break;
      case 404:
        break
      case 401:
        store.commit('base/token');
        store.commit('other/IsLoginShowState', true)
        // router.replace({
        //     path: '/Login',
        //     name:'login'
        // });
        break;
      case 200:
        if (res.data.code == 3) {
          console.log("weidenlu")
        }
        break;
      default: break;
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

store.dispatch('base/initToken')

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(CollapseTransition)

Vue.filter('date', (date, fmt) => {
  if (typeof date === 'string') date = new Date(date)
  if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
})

new Vue({
  el: '#app',
  router,
  VueResource,
  ElementUI,
  store,
  CollapseTransition,
  template: '<App/>',
  components: { App }
})