/**
 * @author: lzc
 * @date:   2019-01-18
 * @desc:   弹框公共方法
 */

export default {
  model: {
    prop: 'visible',
    event: 'change'
  },
  
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  
  data() {
    return {}
  },
  
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  }
}
