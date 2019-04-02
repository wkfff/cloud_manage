<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    
    <el-menu
      :show-timeout="200"
      :default-active="defaultActive"
      :collapse="isCollapse"
      mode="vertical"
      class="sider-background"
      text-color="white"
    >
      <el-row
        :class="[isCollapse ? 'mini' : '']"
        class="plat-title">
        <!-- <span class="en">HCF</span> -->
        <span class="en"><img src="../../../assets/sider/logo.png" /></span>
        <span class="ch">DBaaS云管平台</span>
      </el-row>
      <div class="bar-box">
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"/>
      </div>
    
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    defaultActive() {
      const len = this.$route.matched.length
      const path = this.$route.path
      // 左侧路由只有两层
      return this.$route.meta.hidden && len > 1 ? this.$route.matched[1].path : path
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.plat-title {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  &.mini {
    width: 70px;
    .ch {
      display: none;
    }
  }
}
.bar-box{
  padding-top: 60px;
}
</style>
