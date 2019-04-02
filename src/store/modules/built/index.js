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
      Object.assign(state, initialState)
    }
  },
  actions,
  getters,
  state: {
    ...cloneDeep(initialState)
  }
}
