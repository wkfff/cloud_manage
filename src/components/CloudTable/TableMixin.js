/**
 * @author: lzc
 * @date:   2019-01-16
 * @desc:   table常用公共函数，使用  mixins: [mixin]
 */
export default {
  data() {
    return {}
  },
  methods: {
    search(type, ref) {
      this.$refs[ref || 'listTable'] && this.$refs[ref || 'listTable'].updateTable(type)
    }
  }
}
