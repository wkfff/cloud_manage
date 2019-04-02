<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    xx
  @require:
-->
<template>
  <div class="sheet-detail-wrapper">
    <CloudBack
      :back-to="{ path: '/maintenance/search/list' }"
      :title="$route.query.no"
      :set-style="{'border-bottom': 0, 'box-shadow': 'none'}"
    >
      <div
        slot="right"
        class="status-box"
      >
        <div>
          工单状态：
          <span
            :class="[WORKSHEET.STATUS_COLOR[$route.query.sn]]"
          >{{ WORKSHEET.STATUS[$route.query.sn] }}</span>
        </div>
        <div class="last">
          执行状态：
          <span
            :class="[WORKSHEET.EXECUTE_STATUS_COLOR[$route.query.es]]"
          >{{ WORKSHEET.EXECUTE_STATUS[$route.query.es] }}</span>
        </div>
      </div>
    </CloudBack>
    
    <CloudAffix :offset-top="110">
      <div class="menu-box">
        <el-menu
          :default-active="$route.name"
          mode="horizontal">
          <el-menu-item index="SheetSearchDetailOverview">
            <router-link
              :to="{
                name: 'SheetSearchDetailOverview',
                params: { id: $route.params.id },
                query: {
                  no: $route.query.no,
                  es: $route.query.es,
                  sn: $route.query.sn,
                  retry: $route.query.retry
                }
               }"
            >
              概览
            </router-link>
          </el-menu-item>
          <el-menu-item index="SheetSearchDetailLogs">
            <router-link
              :to="{
              name: 'SheetSearchDetailLogs',
               params: { id: $route.params.id },
               query: {
                  no: $route.query.no,
                  es: $route.query.es,
                  sn: $route.query.sn,
                  retry: $route.query.retry
               }
              }">
              处理记录
            </router-link>
          </el-menu-item>
        </el-menu>
        <div class="btn-box">
          <el-button
            v-if="$route.query.retry"
            size="mini"
            @click="contactDba"
          >联系值班DBA
          </el-button>
        </div>
      </div>
    </CloudAffix>
    
    <div class="view-wrapper">
      <div class="content-wrapper">
        <transition
          name="fade-transform"
          mode="out-in">
          <router-view/>
        </transition>
      </div>
    </div>
    
    <!--联系值班管理员-->
    <ContactAdministrator
      v-if="$route.query.retry"
      v-model="contactVisible"
      :row-id="$route.params.id"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import CloudBack from '@/components/CloudBack'
import CloudAffix from '@/components/CloudAffix'
import ContactAdministrator from '../components/ContactAdministrator'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'SheetSearchDetail',
  
  components: {
    CloudBack,
    CloudAffix,
    ContactAdministrator
  },
  
  data() {
    return {
      contactVisible: false,
      WORKSHEET
    }
  },
  
  methods: {
    contactDba() {
      this.contactVisible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sheet-detail-wrapper {
  .menu-box {
    padding: 0 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px #e6e6e6;;
  }
  .status-box {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: normal;
    .last {
      margin-left: 50px;
    }
  }
  .content-wrapper {
    background-color: #fff;
    padding: 20px;
    padding-bottom: 40px;
  }
  /deep/ .el-menu.el-menu--horizontal {
    border-bottom: 0;
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
    line-height: 40px;
    height: 40px;
    padding: 0 20px;
    text-align: center;
  }
  /deep/ .el-menu-item:hover {
    background-color: #fff !important;
    color: $menuCheckedBg !important;
  }
}
</style>
