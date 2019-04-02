/**
 *
 * @copyright(c) 2019
 * @created by  Daniel
 * @package cloud-platform
 * @version :  2019-01-16 16:58 $
 */

import Layout from '@/layout/Layout'
import MainLayout from '@/layout/MainLayout'
import router, { constantRouterMap } from '@/router/index'

/**
 * 去掉字符串前后空格
 * @param str
 * @return {void | string | *}
 */
const trim = str => {
  if (typeof str === 'string') {
    return str.replace(/(^\s+)|(\s+$)/g, '')
  } else {
    return ''
  }
}

/**
 * 根据path获取组件的路径，将带参数的路径去掉
 * @param url
 * @return {string}
 */
const getComponentPath = url => {
  let result = '404' // 找不到组件，默认加载404页面
  if (url && typeof url === 'string') {
    result = url.includes(':') ? url.replace(/\/:[a-zA-Z]+/g, '') : url
  }
  return result
}

/**
 * 递归生成路由
 * @param routers
 * @param data
 */
const generateMenu = (routers = [], data = []) => {
  data.forEach(item => {
    const menu = {
      path: null,
      meta: {}
    }
    const { route, component, name, route_name, icon, redirect, bread, children } = item
    
    if (redirect) menu.redirect = `/${redirect}`
    
    if (component) { // 设置指定component
      if (trim(component).toLocaleLowerCase() === 'layout') { // 一级路由
        menu.component = Layout
        menu.meta.icon = icon
      } else if (trim(component).toLocaleLowerCase() === 'mainlayout') { // 二级路由
        menu.component = MainLayout
      } else { // 三级自定义指定 component 路由
        menu.component = () => import(`@/views/${component}`)
        menu.meta.hidden = true
        menu.hidden = true
      }
    } else { // 三级以下路由全部是隐藏状态
      menu.component = () => import(`@/views/${getComponentPath(route)}`)
      menu.meta.hidden = true
      menu.hidden = true
    }
    menu.path = `/${route}`
    menu.name = route_name
    menu.meta.title = name
    menu.meta.bread = bread
    
    // 递归获取子元素
    if (Object.prototype.toString.call(children) === '[object Array]' && children.length) {
      menu.children = []
      generateMenu(menu.children, children)
    }
    
    routers.push(menu)
  })
}

/**
 * 获取动态路由
 * @param data
 * @return {Array}
 */
const parseMenu = (data = []) => {
  const routes = data.filter(menu => menu.name !== '首页' && menu.status === 1)
  
  const resultRoute = []
  generateMenu(resultRoute, routes)
  
  return resultRoute
}

// 刷新路由
const flushRoute = (paramMenus = []) => {
  // 先重置一下
  router.addRoutes([])
  router.options.routes = [...constantRouterMap]
  
  // 动态添加
  const asyncRoutes = parseMenu(paramMenus)
  router.addRoutes(asyncRoutes)
  const allRoutes = [...constantRouterMap, ...asyncRoutes]
  router.options.routes = allRoutes
  console.log('routes---->', allRoutes)
}

export default flushRoute
