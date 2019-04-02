import { getField } from '@/plugins/vuex-fields'

export default {
  getCreateMysqlFormData(state) {
    return getField(state.createMysqlFormData)
  },
  createMysqlFormData: state => state.createMysqlFormData
}
