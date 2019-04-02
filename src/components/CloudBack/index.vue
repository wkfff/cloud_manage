<!--
  @author:  lzc
  @date:    2019-01-18
  @desc:    头部返回组件
  @require:
-->
<template>
  <CloudAffix
    :offset-top="60"
    :off="!fixed"
  >
    <div
      :style="setStyle"
      class="back-box"
    >
      <div class="left">
        <i
          class="el-icon-back text-active cursor-pointer"
          @click="backToPage">
          <span class="back-title">{{ title }}</span>
        </i>
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
  </CloudAffix>
</template>

<script type="text/ecmascript-6">
import CloudAffix from '@/components/CloudAffix'

export default {
  name: 'CloudBack',
  
  components: {
    CloudAffix
  },
  
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    backTo: {
      type: [String, Object],
      default: ''
    },
    fixed: {
      type: Boolean,
      default: true
    },
    setStyle: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  methods: {
    backToPage() {
      this.backTo ? this.$router.push(this.backTo) : this.$router.go(-1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.back-box {
  background: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  font-weight: bold;
  z-index: 99;
  border-bottom: 1px solid #f1ecec;
  box-shadow: 1px 1px 1px #ececec;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .back-title {
    font-size: 14px;
    color: $textLevelA;;
    margin-left: 10px;
  }
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>
