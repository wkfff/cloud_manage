<!--
  @author:  lzc
  @date:    2018-11-08
  @desc:
  @require:
-->
<script type="text/jsx">
export default {
  name: 'JsxRender',
  functional: true,
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      required: true
    },
    change: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.row, ctx.props.change)
  }
}
</script>
