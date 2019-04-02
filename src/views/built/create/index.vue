<!--
  @author:  lzc
  @date:    2019-03-04
  @file:    xx
  @require:
-->
<template>
  <div class="built-create-wrapper">
    <div class="title">新建数据库</div>
    <div class="create_content">
      <router-link :to="{ path: '/built/create/mysql' }">
        <el-button>
          <div class="svg-wraper">
            <svg-icon icon-class="ic_mysql" class="icon"/>
            <span class="mgl-20">MySQL</span>
          </div>
        </el-button>
      </router-link>
      
      <router-link :to="{ path: '/built/create/redis' }">
        <el-button>
          <div class="svg-wraper">
            <svg-icon icon-class="ic_redis" class="icon"/>
            <span class="mgl-20">Redis</span>
          </div>
        </el-button>
      </router-link>
  
      <router-link :to="{ path: '/built/create/mongodb' }">
        <el-button>
          <div class="svg-wraper">
            <svg-icon icon-class="ic_mongodb" class="icon"/>
            <span class="mgl-20">MongoDB</span>
          </div>
        </el-button>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'BuiltCreateDb',
  
  components: {},
  
  props: {},
  
  data() {
    return {}
  },
  
  computed: {},
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.built-create-wrapper {
  background-color: #fff;
  padding-bottom: 40px;
  margin: 20px;
  .title {
    padding: 0 20px;
    font-size: 20px;
    line-height: 60px;
    border-bottom: 1px solid $boderColor;
  }
  .create_content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 40px;
    /deep/ .el-button {
      text-align: left;
      font-size: 14px;
      width: 320px;
      height: 60px;
      margin: 0 20px 20px 20px;
      border: 1px solid rgba(175, 186, 203, 1);
      color: $textNewNormal;
    }
    /deep/ .el-button:focus,
    /deep/ .el-button:hover {
      border: none;
      background: $tableHoverBg;
      color: $textNewChecked;
    }
    /deep/ .el-button.is-disabled,
    /deep/ .el-button.is-disabled:focus,
    /deep/ .el-button.is-disabled:hover {
      background-color: $itemDisabledBg;
      border: none;
      color: $textNewDisabled;
    }
  }
  .svg-wraper {
    display: flex;
    align-items: center;
  }
  .icon {
    width: 30px;
    height: 30px;
  }
}
</style>
