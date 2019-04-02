<!--
  @author:  lzc
  @date:    2019-02-19
  @file:    块级标题样式，常用于详情等页面
  @require:
-->
<template>
  <div
    v-if="show"
    class="cloud-section-title"
  >
    <div class="left">
      <div class="text">{{ title }}</div>
      <div>
        <slot slot="left"/>
      </div>
    </div>
    <div class="right">
      <slot/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CloudSectionTitle',
  
  props: {
    title: {
      type: String,
      default: '标题'
    },
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cloud-section-title{
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 28px;
  padding-left: 10px;
  border-left: 3px solid $textRunning;
}
</style>
