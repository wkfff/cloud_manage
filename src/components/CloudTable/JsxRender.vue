<script type="text/ecmascript-6">
/**
   * 渲染组件
   * @author liuchao <liuchao@hua-cloud.com.cn>
   * @date 2018/11/2
   * @time 19:36
   */
export default {
  functional: true,
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    },
    render: {
      type: Function,
      required: true
    }
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    }
    return ctx.props.render(h, params)
  }
}
</script>
