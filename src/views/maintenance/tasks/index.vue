<!--
  @author:  lzc
  @date:    2019-02-14
  @file:    xx
  @require:
-->
<template>
  <div class="tasks-and-events-wrapper">
    <el-menu
      :default-active="$route.name"
      class="el-menu-box"
      mode="horizontal">
      <el-menu-item index="TasksAndEventsList">
        <router-link :to="{name: 'TasksAndEventsList'}">任务列表</router-link>
      </el-menu-item>
      <el-menu-item index="TasksAndEventsLogs">
        <router-link :to="{name: 'TasksAndEventsLogs'}">执行日志</router-link>
      </el-menu-item>
    </el-menu>
    
    <div class="content-box">
      <transition
        name="fade-transform"
        mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'TasksAndEventsIndex',
  
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
.tasks-and-events-wrapper{
  .content-box{
    background-color: #fff;
    padding: 20px;
  }
  .el-menu-box{
    padding: 0 10px;
  }
  /deep/ .el-menu-item {
    height: auto;
    line-height: 0;
    padding: 0;
  }
  /deep/ .el-menu--horizontal > .el-menu-item.is-active {
    color: $menuCheckedBg !important;
    border-bottom: 3px solid $menuCheckedBg !important;
  }
  /deep/ .el-menu--horizontal > .el-menu-item a {
    display: block;
    color: $textLevelB;
    line-height: 50px;
    height: 50px;
    padding: 0 20px;
  }
  /deep/ .el-menu-item:hover {
    background-color: #fff !important;
    color: $menuCheckedBg !important;
  }
}
</style>
