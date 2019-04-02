/**
 * @author: lzc
 * @date:   2018-09-17
 * @desc:   全局按钮权限指令
 */
import { Cache } from '@/utils'
import store from '@/store'

const cache = new Cache()
const permissions = (cache.get('user') && cache.get('user')['permissions']) || []

export default {
  /**
   * v-permission 权限控制指令
   * @param el {Object} 绑定的dom节点元素
   * @param binding {Object} 指令对象，在调用时必须绑定一个对象，并且包含name和buttons属性
   * @example: 在模板中调用，v-permission="{ name: `add`, buttons: $route.meta.buttons }"
   */
  inserted(el, binding) {
    // 刚一开始登录进来的时候是没有permissions的，因为在登录页就已经是[]了，
    // 所以在首页他会是[],要手动刷新才能处理。但是在刚登陆的时候是有store的，
    // 我们可以在没有permissions的时候使用store.state.app.permissions，否则
    // 使用permissions
    const permissionsData = !permissions.length ? store.state.app.permissions : permissions
    let flag = false
    const { value } = binding
    flag = permissionsData.map(v => v.permission).indexOf(value) !== -1
    !flag && el.parentNode && el.parentNode.removeChild(el)
  }
}
