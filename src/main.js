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
// 配置请求的根路径
axios.defaults.baseUrl = 'http://timemeetyou.com:8889/api/private/v1/'
// 将axios库挂载到Vue的原型，使vue的每一个组件都能通过$http进行访问从而发起请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
