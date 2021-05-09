// 入口文件
import Vue from 'vue'
// 导入组件
import App from './App'
// 导入路由
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon/iconfont.css'
import axios from 'axios'
import { get, post } from '../src/util.js'  //  form 后就加上你文件的地址
Vue.prototype.get = get;
Vue.prototype.post = post;
Vue.prototype.$error = function (msg) {
  this.$message({ message: msg, type: 'error', offset: 80, duration: 3000 })
}
Vue.prototype.$success = function (msg) {
  this.$message({ message: msg, type: 'success', offset: 80, duration: 3000 })
}
Vue.prototype.$domain = "http://windiiot.oss-cn-beijing.aliyuncs.com/";
// 配置请求的根路径
// axios.defaults.baseURL = 'http://backend.windiiot.com/'
axios.defaults.baseURL = 'http://120.55.95.122:8080/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
// 请求超时时间
axios.defaults.timeout = 100000;
// 将axios库挂载到Vue的原型，使vue的每一个组件都能通过$http进行访问从而发起请求

Vue.prototype.$http = axios
Vue.config.productionTip = false
export default{
  sid:1,
}
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
