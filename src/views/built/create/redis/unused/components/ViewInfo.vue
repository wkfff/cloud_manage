<!--
  @author:  lzc
  @date:    2019-03-12
  @file:    xx
  @require:
-->
<template>
  <div class="info-wrapper">
    
      <div class="item">
        <div class="label">数据库类型</div>
        <div class="value">-</div>
      </div>
      
      <div class="item">
        <div class="label">实例名</div>
        <div class="value">{{ instance_name || '-' }}</div>
      </div>
  
      <div class="item">
        <div class="label">描述</div>
        <div class="value">{{ instance_desc || '-' }}</div>
      </div>
  
      <div class="item">
        <div class="label">所属业务系统</div>
        <div class="value">-</div>
      </div>
      
      <div class="item">
        <div class="label">架构办代码</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">所属项目</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">架构类型</div>
        <div class="value">-</div>
      </div>
      
      <div class="item">
        <div class="label">数据库版本</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">计算规格</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">存储</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">数据库用户名</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">数据库密码</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">字符集</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">最大连接数</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">申请数量</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">备份策略</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">业务服务时间</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">维护时间</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">RTO</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">RPO</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">业务负责人</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">开发负责人</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">开发室经理</div>
        <div class="value">-</div>
      </div>
  
      <div class="item">
        <div class="label">系统负责人</div>
        <div class="value">-</div>
      </div>
      
      <div class="item">
        <div class="label">推荐管理员</div>
        <div class="value">-</div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { createHelpers } from '@/plugins/vuex-fields'
const { mapFields } = createHelpers({
  getterType: 'built/getCreateMysqlFormData'
})

export default {
  name: 'ViewInfo',
  
  components: {},
  
  props: {},
  
  data() {
    return {}
  },
  
  computed: {
    ...mapFields([
      'instance_name',
      'instance_desc'
    ])
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.info-wrapper{
  padding: 20px;
  .item {
    position: relative;
    font-size: 0;
    line-height: 0;
    padding-left: 100px;
    .label, .value {
      display: inline-block;
      vertical-align: top;
      font-weight: 500;
      line-height: 1.5;
    }
    .label {
      box-sizing: border-box;
      width: 100px;
      padding: 6px 8px;
      padding-left: 0;
      font-size: 14px;
      color: #333;
      position: absolute;
      left: 0;
      top: 0;
      color: $textLevelC;
      word-break: break-all;
      word-wrap: break-word;
    }
    .value {
      word-break: break-all;
      font-size: 14px;
      padding: 7px 7px 7px 0;
      div, span, p {
        display: inline-block;
        margin: 0;
      }
      .unit {
        margin-left: 8px;
      }
    }
  }
}
</style>
