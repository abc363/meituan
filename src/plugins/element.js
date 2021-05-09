import Vue from 'vue'
import { Button, Input, Form, FormItem, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
// 全局导入，任意一个组件都可以使用
Vue.prototype.$message = Message