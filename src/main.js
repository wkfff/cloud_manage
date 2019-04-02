// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import './permission'

// A modern alternative to CSS resets npm 引入
import 'normalize.css/normalize.css'
import '@/styles/iconfont/iconfont.css'

// 引入ElementUI并且使用它的index.css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局使用样式
import '@/styles/index.scss'

// 配置并引入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入

// 导入icon
import '@/icons'

// 请求方法
import ajax from '@/utils/ajax'

// 引入事件总线
import eventBus from '@/utils/eventBus'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 

// 简单配置
NProgress.inc(0.3)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 注册全局的过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局指令
import * as directives from './directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

// 使用ElementUI
Vue.use(ElementUI, {
  size: 'medium'
})

// 请求
Vue.prototype.$ajax = ajax

// 注册事件总线
Vue.prototype.$eventBus = eventBus

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
