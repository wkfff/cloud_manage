
import { getField } from '@/plugins/vuex-fields'

export default {
    getProduct: state => {
        return state.checkedProduct
    },
    getMaintenance: state => {
        return state.checkedMaintenance
    },
    getFormDataField(state) {
        return getField(state.formData)
    },
  }
  