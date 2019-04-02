<!--
  @author:  lzc
  @date:    2019-01-31
  @desc:    用户详情
  @require:
-->
<template>
  <div class="detail-wrapper">
    <CloudBack
      :back-to="{path: '/permissions/group/list'}"
      title="用户组名称"/>
    
    <el-menu
      :default-active="$route.name"
      class="el-menu-demo"
      mode="horizontal">
      <el-menu-item index="PermissionsGroupOverview">
        <router-link :to="{name: 'PermissionsGroupOverview', params: { id: groupId }}">概览</router-link>
      </el-menu-item>
      <el-menu-item index="PermissionsGroupUser">
        <router-link :to="{name: 'PermissionsGroupUser', params: { id: groupId }}">关联用户</router-link>
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
</template>

<script type="text/ecmascript-6">
import CloudBack from '@/components/CloudBack'

export default {
  name: 'GroupDetail',
  
  components: {
    CloudBack
  },
  
  data() {
    return {
      groupId: this.$route.params.id
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-wrapper {
  .content-wrapper {
    margin: 20px;
    background-color: #fff;
    padding: 10px;
  }
  .el-menu-demo{
    padding: 0 20px;
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
