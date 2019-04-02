import { login, logout } from '@/services/login'
import { LOGIN_DIRECTION } from '@/utils/constant'

export default {
  ToggleSideBar: ({ commit }) => {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  ToggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  async Login({ commit }, payload) {
    const values = {
      ...payload
    }
    delete values['cb']
    const res = await login(values)
    const { token, menus, user } = res.data
    const params = {
      token,
      menus,
      user,
      cb: payload.cb,
      direction: LOGIN_DIRECTION.CLOUD
    }
    commit('LOGIN', params)
    // 将缓存数据放入其他module，调用其他的mutations
    commit('worksheet/SET_PHONE_EMAIL', user, {root: true})
  },
  async Logout({ commit }, payload) {
    const res = await logout()
    
    commit('LOGOUT')
    // payload.cb()
  }
}
