<!--
  @author:  lzc
  @date:    2019-01-22
  @desc:    xx->xx
  @require:
-->
<template>
  <div class="cloud-radio">
    <template v-if="options.multiple">
      <div
        v-for="(item, index) in options.radioOptions"
        :key="index"
        style="padding-bottom: 10px"
      >
        <el-radio-group
          v-model="val"
          v-bind="options"
          v-on="events"
        >
          <template v-if="options.type === 'button'">
            <el-radio-button
              v-for="(value, key, i) in item"
              :key="i"
              :label="key">{{ value }}
            </el-radio-button>
          </template>
          
          <template v-else>
            <el-radio
              v-for="(value, key, i) in item"
              :key="i"
              :label="key">{{ value }}
            </el-radio>
          </template>
        </el-radio-group>
      </div>
    </template>
    
    <template v-else>
      <el-radio-group
        v-model="val"
        v-bind="options"
        v-on="events"
      >
        <template v-if="options.type === 'button'">
          <el-radio-button
            v-for="(item, index) in radioData"
            :key="index"
            :label="item.value">{{ item.label }}
          </el-radio-button>
        </template>
        
        <template v-else>
          <el-radio
            v-for="(item, index) in radioData"
            :key="index"
            :label="item.value">{{ item.label }}
          </el-radio>
        </template>
      </el-radio-group>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'
import { isArray } from 'lodash'

export default {
  name: 'FieldRadio',
  
  mixins: [FieldMixin],
  
  data() {
    return {
      radioData: []
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
        if (this.options && this.options.radioOptions) {
          this.radioData = []
          // 函数类型
          if (typeof this.options.radioOptions === 'function') {
            this.radioData = await this.options.radioOptions()
          }
          
          // 数组类型，必须遵循 [{label, value}] 格式，否则无效
          if (isArray(this.options.radioOptions)) {
            this.radioData = this.options.radioOptions
          }
          
          // 对象类型，静态对象，或者来自store对象, 对象key为value，值为label
          if (Object.prototype.toString.call(this.options.radioOptions) === '[object Object]') {
            Object.keys(this.options.radioOptions).forEach(key => {
              this.radioData.push({
                label: this.options.radioOptions[key],
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
.cloud-radio {
  display: inline-block;
  /deep/ .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
  }
  /deep/ .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
  }
  /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    border-color: #409EFF;
    background-color: #fff;
    color: #409EFF;
  }
}
</style>
