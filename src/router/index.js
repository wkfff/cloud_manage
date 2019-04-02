import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import DashBoard from '@/views/dashboard/index.vue'
import NotFound from '@/views/404'
import Login from '@/views/login'
import Intelligent from '@/views/intelligent'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/intelligent',
    name: 'Intelligent',
    component: Intelligent,
    hidden: true
  },
  {
    path: `/`,
    component: Layout,
    name: 'DashBoard',
    redirect: '/dashboard',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: `dashboard`,
        name: `DashBoardIndex`,
        component: DashBoard,
        meta: { title: '首页', bread: 'dashboard' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  }
]

const router = new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export default router
