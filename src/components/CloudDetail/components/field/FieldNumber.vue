<!--
  @author:  lzc
  @date:    2019-01-22
  @desc:    xx->xx
  @require:
-->
<template>
  <el-input-number
    v-model="val"
    v-bind="options"
    v-on="events"
  />
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'

export default {
  name: 'FieldNumber',
  
  mixins: [FieldMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
