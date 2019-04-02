<!--
  @author:  lzc
  @date:    2019-01-22
  @desc:    xx->xx
  @require:
-->
<template>
  <el-select
    v-model="val"
    v-bind="options"
    v-on="events"
    :placeholder="options.placeholder ? options.placeholder : `请选择${label}`"
  >
    <el-option
      v-for="(item, index) in optionData"
      :key="index"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'
import { isArray } from 'lodash'

export default {
  name: 'FieldSelect',
  
  mixins: [FieldMixin],
  
  data() {
    return {
      optionData: []
    }
  },
  
  watch: {
    options: {
      deep: true,
      handler(v) {
        this.__getOptionData()
      }
    }
  },
  
  created() {
    this.__getOptionData()
  },
  
  methods: {
    /**
     * 获取拉下数据
     * @return {Promise<void>}
     * @private
     */
    async __getOptionData() {
      try {
        if (this.options && this.options.selectOptions) {
          this.optionData = []
          // 函数类型
          if (typeof this.options.selectOptions === 'function') {
            this.optionData = await this.options.selectOptions()
          }
          // 数组类型，必须遵循 [{label, value}] 格式，否则无效
          if (isArray(this.options.selectOptions)) {
            this.optionData = this.options.selectOptions
          }
          // 对象类型，静态对象，或者来自store对象, 对象key为value，值为label
          if (Object.prototype.toString.call(this.options.selectOptions) === '[object Object]') {
            Object.keys(this.options.selectOptions).forEach(key => {
              this.optionData.push({
                label: this.options.selectOptions[key],
                value: key
              })
            })
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
