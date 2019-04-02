<!--
  @author:  lzc
  @date:    2019-01-31
  @desc:    角色详情
  @require:
-->
<template>
  <div class="detail-wrapper">
    <CloudBack
      :back-to="{path: '/permissions/role/list'}"
      title="用户名称"/>
    
    <el-menu
      :default-active="$route.name"
      mode="horizontal">
      <el-menu-item index="PermissionsUserOverview">
        <router-link :to="{name: 'PermissionsUserOverview', params: { id: userId }}">概览</router-link>
      </el-menu-item>
      <el-menu-item index="PermissionsUserGroup">
        <router-link :to="{name: 'PermissionsUserGroup', params: { id: userId }}">功能权限</router-link>
      </el-menu-item>
      <el-menu-item index="PermissionsUserRole">
        <router-link :to="{name: 'PermissionsUserRole', params: { id: userId }}">关联用户</router-link>
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
  name: 'RoleDetail',
  
  components: {
    CloudBack
  },
  
  data() {
    return {
      userId: this.$route.params.id
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-wrapper {
  .content-wrapper {
    background-color: #fff;
    padding: 10px;
    margin: 20px;
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
