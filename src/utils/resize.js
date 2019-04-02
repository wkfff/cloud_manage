/**
 * 当屏幕横向缩放窗口时，适应相关区域样式
 */
import { debounce } from '@/utils'

export default {
  mounted() {
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.__resizeHanlder)
  }
}
