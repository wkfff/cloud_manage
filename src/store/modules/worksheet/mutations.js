import { Json } from '@/utils'
import { Cache } from '@/utils'
const cache = new Cache()

// 如果取出cache.get('user')undefined或者''和null使用默认值{}，否则报错
const { phone, email } = cache.get('user') || {}

import {
  UPDATE_ITEMS,
  UPDATE_WORKSHEET,
  UPDATE_WORKSHEET_FORMDATA,
  SET_PHONE_EMAIL,
  RESET_FORMDATA,
  UPDATE_FORMDATA_OTHER
} from './mutation-types.js'

import { updateField } from '@/plugins/vuex-fields'

export default {

  UPDATA_FORMDATA(state, params) {
    updateField(state.formData, params)
  },
  [UPDATE_ITEMS]: (state, params) => {
    state.formData.items = Json.loads(params)
  },
  [UPDATE_WORKSHEET]: (state, params) => {
    const type = params.type
    state[type] = params.payload[type]
  },
  [UPDATE_WORKSHEET_FORMDATA]: (state, params) => {
    state.formData = params
  },
  [UPDATE_FORMDATA_OTHER]: (state, params) => {
    const type = params.type
    state.formData[type] = params.payload[type]
  },
  [SET_PHONE_EMAIL]: (state, params) => {
    state.formData.phone = params.phone
    state.formData.email = params.email
  },
  [RESET_FORMDATA]: (state) => {
    state.formData = {
      id: '', // workOrderId
      product: '',
      handle_type: '',
      description: '',
      priority: 2,
      top_system: '',
      phone,
      email,
      items: [],
      hold_emp_no: '',
      hold_emp_name: '',
      hold_phone: '',
      hold_email: '',
      reason: '',
      schedule_begin_time: '',
      plan_use_time: '12',
      project_code: '',
      project: '',
      work_order_name: ''
    }
  }
}
