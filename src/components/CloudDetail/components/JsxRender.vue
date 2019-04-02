<!--
  @author:  lzc
  @date:    2018-11-08
  @desc:
  @require:
-->
<script type="text/ecmascript-6">
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
    }
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.row)
  }
}
</script>
