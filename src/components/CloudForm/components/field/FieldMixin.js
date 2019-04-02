/**
 * @author: lzc
 * @date:   2019-01-22
 * @desc:   描述
 */
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  
  props: {
    // 绑定的值
    value: {
      type: [String, Array, Number, Boolean, Object, Date],
      default: ''
    },
    
    // label名
    label: {
      type: String,
      default: ''
    },
    
    // 绑定属性
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    
    // 绑定事件
    events: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  computed: {
    
    val: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  }
}
