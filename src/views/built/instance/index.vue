<!--
  @author:  lzc
  @date:    2019-03-04
  @file:    xx
  @require:
-->
<template>
  <div class="instance-wrapper">
    <CloudAffix :offset-top="60">
      <div class="left-nav-box">
        <div class="title">数据库实例</div>
    
        <el-menu
          :default-active="$route.name"
          class="left-nav"
        >
          <el-menu-item index="BuiltInstanceMysql">
            <router-link :to="{name: 'BuiltInstanceMysql'}">MySQL</router-link>
          </el-menu-item>
      
          <el-menu-item index="BuiltInstanceRedis">
            <router-link :to="{name: 'BuiltInstanceRedis'}">Redis</router-link>
          </el-menu-item>
      
          <el-menu-item index="BuiltInstanceMongoDB">
            <router-link :to="{name: 'BuiltInstanceMongoDB'}">MongoDB</router-link>
          </el-menu-item>
      
          <el-menu-item index="BuiltInstanceOracle">
            <router-link :to="{name: 'BuiltInstanceOracle'}">Oracle</router-link>
          </el-menu-item>
      
          <el-menu-item index="BuiltInstanceDB2">
            <router-link :to="{name: 'BuiltInstanceDB2'}">DB2</router-link>
          </el-menu-item>
      
          <el-menu-item index="BuiltInstanceGaussDB">
            <router-link :to="{name: 'BuiltInstanceGaussDB'}">GaussDB</router-link>
          </el-menu-item>
        </el-menu>
      </div>
    </CloudAffix>
    
    <div class="right-content-box">
      <router-view />
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CloudAffix from '@/components/CloudAffix'

export default {
  name: '',
  
  components: {
    CloudAffix
  },
  
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
.instance-wrapper{
  display: flex;
  .left-nav-box{
    width: 180px;
    min-width: 180px;
    box-sizing: border-box;
    height: calc(100vh - 60px);
    background-color: #fff;
    border: 1px solid $boderColor;
    border-top: 0;
    .title{
      padding-left: 20px;
      line-height: 50px;
      border-bottom: 1px solid $boderColor;
      font-weight: 600;
    }
    .left-nav{
      height: calc(100% - 60px);
      border-right: 0;
    }
    /deep/ .el-menu-item {
      padding: 0 20px !important;
      height: 50px !important;
      border-bottom: 1px solid $boderColor;
    }
    /deep/ .el-menu-item.is-active {
      background-color: $tableHoverBg !important;
      a{
        color: $textRunning !important;
      }
    }
    /deep/ .el-menu-item a {
      display: block;
      color: $textLevelB;
      line-height: 50px;
      height: 50px;
    }
    /deep/ .el-menu-item:hover {
      background-color: $tableHoverBg !important;
      a {
        color: $textRunning !important;
      }
    }
  }
  .right-content-box{
    flex: 1;
    box-sizing: border-box;
    padding-top: 0;
    overflow-x: auto;
  }
}
</style>
