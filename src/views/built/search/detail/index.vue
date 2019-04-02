<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    xx
  @require:
-->
<template>
  <div class="sheet-detail-wrapper">
    <CloudBack
      :back-to="{ path: '/built/search/list' }"
      :title="$route.params.id"
    />
    <div class="content-box">
      <el-menu
        :default-active="$route.name"
        class="menu-box"
        mode="horizontal">
        <el-menu-item index="BuiltSearchDetailOverview">
          <router-link :to="{ name: 'BuiltSearchDetailOverview', params: { id: $route.params.id } }">概览</router-link>
        </el-menu-item>
        <el-menu-item index="BuiltSearchDetailLogs">
          <router-link :to="{ name: 'BuiltSearchDetailLogs', params: { id: $route.params.id } }">处理记录</router-link>
        </el-menu-item>
      </el-menu>
  
      <div class="content-wrapper">
        <transition
          name="fade-transform"
          mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CloudBack from '@/components/CloudBack'

export default {
  name: 'SheetSearchDetail',
  
  components: {
    CloudBack
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sheet-detail-wrapper{
  .content-box{
    margin: 20px;
  }
  .menu-box{
    padding: 0 20px;
  }
  .content-wrapper {
    background-color: #fff;
    padding: 20px;
    padding-bottom: 40px;
  }
  /deep/ .el-menu-item {
    height: auto;
    line-height: 0;
    padding: 0;
    min-width: 100px;
  }
  /deep/ .el-menu--horizontal > .el-menu-item.is-active {
    color: $menuCheckedBg !important;
    border-bottom: 3px solid $menuCheckedBg !important;
  }
  /deep/ .el-menu--horizontal > .el-menu-item a {
    display: block;
    color: $textLevelB;
    line-height: 60px;
    height: 60px;
    padding: 0 20px;
  }
  /deep/ .el-menu-item:hover {
    background-color: #fff !important;
    color: $menuCheckedBg !important;
  }
}
</style>
