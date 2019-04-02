import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
import initialState from './states.js'
import { cloneDeep } from 'lodash'

export default {
  namespaced: true,
  mutations: {
    ...mutations,
    'RESET': (state) => {
      // 这两种写法是一样的，都会使用后面的值，对于Object.assign只是拷贝一层，再往下就不会管了
      Object.assign(state, initialState)
      // Object.keys(initialState).map(val => {
      //   Object.assign(state[val], initialState[val]);
      // });
    }
  },
  actions,
  getters,
  state: {
    ...cloneDeep(initialState)
  }
}
