<!--
  @author:  lzc
  @date:    2019-03-14
  @file:    xx
  @require:
-->
<template>
  <div class="slider-item">
    <el-slider
      v-model="val"
      v-bind="options"
      v-on="events"
    />
    <div
      v-if="options.showStep"
      class="calibration-box"
    >
      <span
        v-for="(num, index) in total"
        :key="index"
      >{{ index * options.showStep }} G</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import FieldMixin from './FieldMixin'

export default {
  name: 'FieldSlider',
  
  mixins: [FieldMixin],
  
  components: {},
  
  props: {},
  
  data() {
    return {}
  },
  
  computed: {
    total() {
      return this.options.max ? Math.ceil(this.options.max / this.options.showStep) + 1 : 6
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.slider-item{
  width: 600px;
  /deep/ .el-input{
    width: auto;
  }
  .calibration-box {
    width: 462px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      margin-top: -15px;
      display: inline-block;
      font-size: 12px;
    }
  }
}
</style>
