// 路由js可以渲染到router-view中去
import Vue from 'vue'
import Router from 'vue-router'
import System from '../components/system.vue'
import ShopLogin from '../components/shopLogin.vue'
import Shopregister from '../components/shopregister.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/', redirect:'/shopLogin'},
    {path:'/system', component: System},
    {path:'/shopLogin', component: ShopLogin},
    {path:'/shopregister', component: Shopregister}
  ]
})
