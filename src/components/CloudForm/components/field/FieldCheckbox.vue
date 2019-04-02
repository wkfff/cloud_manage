<!--
  @author:  lzc
  @date:    2019-01-30
  @desc:    checkbox
  @require:
-->
<template>
  <el-checkbox-group
    v-if="checkboxOptions.length > 1"
    v-model="val"
    v-bind="options"
    v-on="events">
    <el-checkbox
      v-for="(item, index) in checkboxOptions"
      :key="index"
      :label="item.value">{{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
  <el-checkbox
    v-else
    :label="checkboxOptions[0].value">{{ checkboxOptions[0].label }}
  </el-checkbox>
</template>
<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'
import { isArray } from 'lodash'

export default {
  name: 'FieldCheckbox',
  
  mixins: [FieldMixin],
  
  data() {
    return {
      checkboxOptions: []
    }
  },
  
  watch: {
    options: {
      deep: true,
      handler() {
        this.__getRadioData()
      }
    }
  },
  
  created() {
    this.__getRadioData()
  },
  
  methods: {
    async __getRadioData() {
      try {
        if (this.options && this.options.checkboxOptions) {
          this.checkboxOptions = []
          // 函数类型
          if (typeof this.options.checkboxOptions === 'function') {
            this.checkboxOptions = await this.options.checkboxOptions()
          }
          
          // 数组类型，必须遵循 [{label, value}] 格式，否则无效
          if (isArray(this.options.checkboxOptions)) {
            this.checkboxOptions = this.options.checkboxOptions
          }
          
          // 对象类型，静态对象，或者来自store对象, 对象key为value，值为label
          if (Object.prototype.toString.call(this.options.checkboxOptions) === '[object Object]') {
            Object.keys(this.options.checkboxOptions).forEach(key => {
              this.checkboxOptions.push({
                label: this.options.checkboxOptions[key],
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
