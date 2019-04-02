<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    工单表头
  @require:
-->
<template>
  <div class="header-box">
    <div class="item-box">工单编号<div>{{ applyDetails.order_no }}</div></div>
    <div class="item-box">提单用户名<div>{{ applyDetails.user_name }}</div></div>
    <div class="item-box">提单用户工号<div>{{ jobNum }}</div></div>
    <div class="item-box">处理状态<div :class="[WORKSHEET.STATUS_COLOR[applyDetails.status]]">
      {{ WORKSHEET.STATUS[applyDetails.status] || '-' }}
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'SheetHeader',
  
  props: {
    applyDetails: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      WORKSHEET
    }
  },
  
  computed: {
    jobNum() {
      let result = '-'
      this.applyDetails.flows && this.applyDetails.flows.forEach(item => {
        if (item.status === 1) {
          result = item.emp_no
        }
      })
      return result
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header-box {
  background: white;
  height: 60px;
  padding: 0 20px;
  line-height: 60px;
  font-size: 15px;
  .item-box {
    display: inline-block;
    padding: 0 20px;
    color: $textLevelD;
    &:first-child{
      padding-left: 0;
    }
    div {
      display: inline;
      margin-left: 15px;
      color: $textLevelB;
    }
    &:last-child {
      display: inline-block;
      padding: 0 20px;
      color: $textLevelD;
      float: right;
      text-align: right;
      div {
        display: inline;
        margin-left: 15px;
        color: $textLevelB;
      }
    }
  }
}
</style>
