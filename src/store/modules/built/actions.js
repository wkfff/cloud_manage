
export default {
  switchProduct({ commit }, product) {
    commit('SWITCH_PRODUCT', product)
  },
  switchMaintenance({ commit }, product) {
    commit('SWITCH_MAINTENANCE', product)
  }
}
