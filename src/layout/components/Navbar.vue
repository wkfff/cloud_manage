<template>
  <el-menu :class="[sidebar.opened ? '' : 'mini']" class="navbar" mode="horizontal">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb/>
    <el-dropdown trigger="click" class="user-dropdown" @command="handleCommand">
      <span class="el-dropdown-link">
        <svg-icon iconClass="user" class="user"/>
        {{userName}}
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item class="clearfix" command="a">
          修改密码
        </el-dropdown-item>-->
        <el-dropdown-item class="clearfix logoutBtn" command="b">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- <el-badge :value="200" :max="99" class="item badge-bell">
      <i class="el-icon-bell"></i>
    </el-badge>-->
  </el-menu>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar", "userName"])
  },
  methods: {
    ...mapActions("app", ["Logout"]),
    toggleSideBar() {
      this.$store.dispatch("app/ToggleSideBar");
    },
    handleCommand(command) {
      if (command === "b") {
        this.logout();
      }
      if (command === "a") {
        this.updatePassword();
      }
    },
    logout() {
      this.Logout();
    },
    updatePassword() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  width: calc(100% - 280px);
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  position: fixed;
  top: 0;
  left: 280px;
  z-index: 999;
  &.mini {
    width: calc(100% - 70px);
    left: 70px;
  }
  .user-dropdown {
    display: table-cell;
    float: right;
    padding: 0 20px;
    cursor: pointer;
  }
  .user-dropdown:hover {
    background: #e6f7ff;
  }
  .badge-bell {
    float: right;
    display: table-cell;
    margin-right: 50px;
  }
  .hamburger-container {
    line-height: 68px;
    height: 60px;
    float: left;
    padding: 0 10px;
    color: #909399;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .user {
    font-size: 24px;
    margin-right: 10px;
  }
  .el-dropdown-link {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
</style>
