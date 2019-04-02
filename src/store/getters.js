import { Cache } from '@/utils'

const cache = new Cache()

// 如果取出cache.get('user')undefined或者''和null使用默认值{}，否则报错
const { user_name, nick_name, permissons, role_list } = cache.get('user') || {}

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  userName: state => {
    return state.app.user_name || user_name || 'Daniel@user'
  },
  nickName: state => {
    return state.app.nick_name || nick_name || 'Daniel@nick'
  },
  permissons: state => {
    return state.app.permissons || permissons || []
  },
  scopes: state => {
    return state.app.role_list || role_list || []
  }
  // phone: state => {
  //   return  state.app.phone || phone || '手机号null'
  // },
  // email: state => {
  //   return  state.app.email || email || '邮箱null'
  // }
}
export default getters
