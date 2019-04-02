<!--
  @author:  lzc
  @date:    2019-01-18
  @desc:    提交时防止多次点击按钮组件
  @require:
-->
<template>
  <el-button
    :type="type"
    :size="size"
    :icon="icon"
    :native-type="nativeType"
    :loading="loading || delayLoading"
    :disabled="disabled"
    :plain="plain"
    :autofocus="autofocus"
    :round="round"
    :circle="circle"
    class="hua-button"
    @click="handleClick">
    <span v-if="delay">
      <span v-if="delayPlaceholder && delayLoading">{{ delayPlaceholder }}</span>
      <slot v-else/>
      <span
        v-if="delayNum"
        class="hua-button__delay">{{ delayNum }}s</span>
    </span>
    <slot v-else/>
  </el-button>
</template>

<script type="text/ecmascript-6">
'use strict'

export default {
  
  name: 'DelayButton',
  
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default:
        false
    },
    // 延时
    delay: {
      type: Number,
      default: 3
    },
    // 延时占位符
    delayPlaceholder: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      delayNum: 0,
      delayLoading: false,
      timer: null
    }
  },
  
  beforeDestroy() {
    // 清除
    this.clear()
  },
  
  methods: {
    handleClick(evt) {
      const self = this
      self.$emit('click', evt)
      // 如果设置了延时时间
      if (self.delay) {
        self.handleDelay()
      }
    },
    /**
     * 延时
     */
    handleDelay() {
      const self = this
      self.delayLoading = true
      self.delayNum = self.delay
      self.timer = window.setInterval(function() {
        self.delayNum--
        if (self.delayNum <= 0) {
          self.delayLoading = false
          window.clearInterval(self.timer)
        }
      }, 1000)
    },
    
    /**
     * 立即清除延时效果
     */
    clear() {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.delayNum = 0
      this.delayLoading = false
    }
  }
  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hua-button {
  .hua-button__delay {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
