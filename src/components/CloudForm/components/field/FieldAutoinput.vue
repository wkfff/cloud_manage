<!--
  @author:  Daniel
  @date:    2019-01-22
  @desc:    xx->xx
  @require:
-->
<template>
  <el-autocomplete
    popper-class="my-autocomplete"
    v-model="val"
    v-bind="options"
    v-on="events"
    :placeholder="options.placeholder ? options.placeholder : `请输入${label}`"
  >
    <template slot-scope="{ item }">
      <div class="value">{{ item.value }}</div>
      <span class="desc">{{ item.code }}</span>
    </template>
  </el-autocomplete>
</template>

<script type="text/ecmascript-6">
import FieldMixin from "./FieldMixin";

export default {
  name: "FieldAutoinput",

  mixins: [FieldMixin]
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
