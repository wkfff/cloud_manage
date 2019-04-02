<!--
  @author:  lzc
  @date:    2019-01-22
  @desc:    xx->xx
  @require:
-->
<template>
  <el-input
    v-model="val"
    v-bind="options"
    v-on="events"
    :placeholder="options.placeholder ? options.placeholder : `请输入${label}`"
  />
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'

export default {
  name: 'FieldInput',
  
  mixins: [FieldMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
