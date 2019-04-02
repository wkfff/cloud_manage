<!--
  @author:  lzc
  @date:    2018-12-24
  @desc:    图标提示组件
  @require:
-->
<template>
  <el-tooltip
    :placement="placement"
    class="item"
    effect="dark"
  >
    <div
      slot="content"
      :style="{'max-width': `${maxWidth}px`}"
      class="content-box">
      <slot/>
    </div>
    <span class="icon">
      <i class="el-icon-info"/>
    </span>
  </el-tooltip>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'IconTip',
  
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    maxWidth: {
      type: Number,
      default: 280
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content-box {
  max-width: 280px;
}

.icon {
  cursor: pointer
}
</style>

