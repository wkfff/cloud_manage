import { updateField } from '@/plugins/vuex-fields'
import initialState from './states'

import {
  UPDATE_CREATE_MYSQL_FORM_DATA,
  UPDATE_MYSQL_FORM_DATA,
  RESTART_FROM_DATA
} from './mutation-types'

export default {
  [UPDATE_CREATE_MYSQL_FORM_DATA](state, params) {
    updateField(state.createMysqlFormData, params)
  },
  [UPDATE_MYSQL_FORM_DATA](state, params) {
    state.createMysqlFormData = { ...state.createMysqlFormData, ...params }
  },
  [RESTART_FROM_DATA](state, params) {
    if (state[params]) {
      state[params] = initialState[params]
    }
  }
}
