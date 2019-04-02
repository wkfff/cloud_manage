<!--
  @author:  lzc
  @date:    2019-03-14
  @file:    xx
  @require:
-->
<template>
  <el-time-picker
    v-model="val"
    v-bind="options"
    v-on="events"
    :range-separator="options.separator || '-'"
    :start-placeholder="options.startPlaceholder || '开始时间'"
    :end-placeholder="options.endPlaceholder || '结束时间'"
    placeholder="选择时间范围"
  />
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'

export default {
  name: 'FieldTime',
  
  mixins: [FieldMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
