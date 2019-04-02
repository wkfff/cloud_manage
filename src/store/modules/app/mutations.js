import { Menu, Cache } from '@/utils'
import router, { constantRouterMap } from '@/router/index'

const cache = new Cache()

import {
  TOGGLE_SIDEBAR,
  CLOSE_SIDEBAR,
  TOGGLE_DEVICE,
  LOGIN,
  LOGOUT
} from './mutation-types.js'
import { SSO_LOGOUT } from '@/utils/constant.js';

export default {
  [TOGGLE_SIDEBAR]: state => {
    if (state.sidebar.opened) {
      cache.put('sidebarStatus', 1)
    } else {
      cache.put('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  [CLOSE_SIDEBAR]: (state, withoutAnimation) => {
    cache.put('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  [TOGGLE_DEVICE]: (state, device) => {
    state.device = device
  },
  [LOGIN]: (state, params) => {
    // 刷新和重置路由
    Menu(params.menus)

    cache.put('user', params.user)
    cache.put('menus', params.menus)
    cache.put('token', params.token)
    // 管理是否是单点登录，退出登录时跳到相应登录页面
    cache.put('direction', params.direction)

    // 徐叶逗我，我又给去掉了
    // const tokenInfo = jwtDecode(params.token)
    // const { sub, permissions, scopes } = tokenInfo
    // cache.put('user', sub)
    // cache.put('permissions', permissions)
    // cache.put('scopes', scopes)

    // 需要把第一次拿到的值放入state中，再在state中取缓存的值，否则第一次拿不到
    state.user_name = params.user.user_name
    state.nick_name = params.user.nick_name
    state.permissions = params.user.permissions
    state.role_list = params.user.role_list

    // 工单那里需要手机号和邮箱
    // state.phone = params.user.phone
    // state.email = params.user.email

    // 跳到dashboard
    params.cb()
  },
  [LOGOUT]: (state, params) => {
    const routes = []
    // 先重置一下
    router.addRoutes(routes)
    router.options.routes = [...constantRouterMap]
    // 生产环境 单点登录往招行环境跳转，不会判断从哪登录的
    if (process.env.NODE_ENV === 'production') {
      // 登出的时候所有的本地存储全部清空
      cache.flush()
      // 第一种情况跳到SSO
      window.location.href = SSO_LOGOUT
    }else if (cache.get('direction') === 'sso') {
      // 登出的时候所有的本地存储全部清空
      cache.flush()
      // 第一种情况跳到SSO
      // router.push('/login')
      window.location.href = SSO_LOGOUT
    } else if (cache.get('direction') === 'cloud') {
      // 登出的时候所有的本地存储全部清空
      cache.flush()
      // 第二种情况跳到cloud
      router.push('/login?local=1')
    } else {
      // 登出的时候所有的本地存储全部清空
      cache.flush()
      // 是否有第三种情况，暂时跳到cloud
      router.push('/login?local=1')
    }
  }
}
