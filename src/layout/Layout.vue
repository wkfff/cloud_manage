<template>
  <div
    :class="classObj"
    class="app-wrapper">
    <div
      v-if="device==='mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"/>
    
    <sidebar class="sidebar-container"/>
    <div
      class="sidebar-container"
      style="position: static; float: left;"
    />
    <div
      class="main-container"
      :style="{ width: sidebar.opened ? 'calc(100% - 280px)' : 'calc(100% - 70px)' }"
    >
      <div class="main-content-wrapper">
        <navbar/>
        <div style="height: 60px;"/>
        <app-main/>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  float: left;
  .main-content-wrapper {
    min-height: calc(100vh);
    height: auto;
    overflow: auto;
    overflow-x: hidden;
  }
}
</style>
