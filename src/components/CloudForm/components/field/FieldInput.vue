<!--
  @author:  lzc
  @date:    2019-01-22
  @desc:    xx->xx
  @require:
-->
<template>
  <div class="item">
    <el-input
      v-if="options.valueType === 'number'"
      v-model.number="val"
      v-bind="options"
      v-on="events"
      :placeholder="options.placeholder ? options.placeholder : `请输入${label}`"
    />
    <el-input
      v-else-if="options.valueType === 'trim'"
      v-model.number.trim="val"
      v-bind="options"
      v-on="events"
      :placeholder="options.placeholder ? options.placeholder : `请输入${label}`"
    />
    <el-input
      v-else
      v-model="val"
      v-bind="options"
      v-on="events"
      :placeholder="options.placeholder ? options.placeholder : `请输入${label}`"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'

export default {
  name: 'FieldInput',
  
  mixins: [FieldMixin]
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.item{
  display: inline-block;
}
</style>
