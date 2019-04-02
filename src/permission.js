/**
 * @author: Daniel
 * @date:   2019-01-15
 * @desc:   路由跳转权限控制
 */
import store from '@/store'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
import { Cache, Menu } from '@/utils'
import $ajax from '@/utils/ajax'
import router, { constantRouterMap } from '@/router/index'
import { LOGIN } from '@/api/login'
import { LOGIN_DIRECTION, SSO_LOGIN } from '@/utils/constant'
const cache = new Cache()
const menuData = cache.get('menus')

// 刷新路由
// const flushRoute = (paramMenus = {}) => {
//     // 定义一个空路由用来重置
//     const routes = []
//     // 先重置一下
//     router.addRoutes(routes)
//     router.options.routes = [...constantRouterMap]
//     // 添加赋值
//     const allRoutes = [...constantRouterMap, ...parseMenu(paramMenus)]
//     router.addRoutes(parseMenu(paramMenus))
//     router.options.routes = allRoutes
// }
const forwardDashboard = (NextAction) => {
  // 判断配置的NextAction是否存在，如果存在则需要跳到配置的NextAction，如果没有就不需要
  if (!!NextAction) {
    router.push(NextAction)
  } else {
    router.push('/dashboard')
  }
}

const loginSSO = async (SSOData, SSOToken, NextAction) => {
  const res = await $ajax.post(LOGIN, {'data': SSOData, 'token': SSOToken, 'is_sso': 1})
  if (res.code === 0) {
    const params = {
      ...res.data,
      cb: forwardDashboard.bind(null,NextAction),
      direction: LOGIN_DIRECTION.SSO
    }
    // SSO登录的时候重置路由
    // Menu(params.menus)

    // cache.put('user', params.user)
    // cache.put('menus', params.menus)
    // cache.put('token', params.token)

    store.commit('app/LOGIN', params)
    // router.push('/dashboard')
  } else {
    router.push('/login')
  }
}

// 防止用户手动刷新页面，整个app要重新加载,动态新增的路由，会消失，所以重新add一次
if (menuData) {
  // 刷新的时候重置路由
  Menu(menuData)
}

// 路由白名单可以直接进入
const whiteList = []
router.beforeEach((to, from, next) => {
  // const routes = window.localStorage.getItem('userRoutes') && JSON.parse(window.localStorage.getItem('userRoutes'))
  NProgress.start()
  if (to.query.SSOData && to.query.SSOToken) {
    loginSSO(to.query.SSOData.replace(/\s/g, '%2B'),to.query.SSOToken.replace(/\s/g, '%2B'), to.query.NextAction)
  }
  // 有token
  if (getToken()) {
    // 页面登录的时候在有token的情况下，输入login或者login/#/local=1跳到登录页
    if (to.fullPath === '/login') {
      
      window.location.href = SSO_LOGIN
    } else if (to.query.SSOData && to.query.SSOToken) {
      // 不作处理
    } else {
      next()
    }
  } else {
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 在白名单之外需要判断login做单点登录
      // /login跳到招行的登录页，其他则跳到我们自己的
      if (to.path === '/login') {
        if (to.fullPath === '/login') {
          window.location.href = SSO_LOGIN
        } else if (to.query.SSOData && to.query.SSOToken) {
          // 不作处理
        } else {
          next()
        }
      } else {
        // 否则全部重定向到登录页
        next('/login')
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
