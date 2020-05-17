import Vue from 'vue'
import App from './App'
import request from "./utils/request"


Vue.config.productionTip = false

App.mpType = 'app'

// 把封装的请求函数放到vue的原型中
Vue.prototype.request = request

Vue.prototype.$bus = new Vue()


const app = new Vue({
  ...App
})
app.$mount()