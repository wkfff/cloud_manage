<!--
  @author:  lzc
  @date:    2019-03-01
  @file:    联系值班人员
  @require:
-->
<template>
  <el-dialog
    title="联系数据库负责人"
    :visible.sync="show"
    :close-on-click-modal="false"
    width="600px"
    @opened="openDialog"
  >
    
    <div class="content">
      <CloudDetail
        ref="userDetailOverview"
        :fields="detailFields"
        :fields-values="row"
        :config="detailConfig"
      />
      <div class="text">
        点击“发短信通知”，系统将自动通知数据库负责人，为您紧急处理订单问题。
      </div>
    </div>
    
    <div
      slot="footer"
      class="dialog-footer">
      <el-button
        type="primary"
        @click="confirm">发送短信通知
      </el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from '@/mixins/DialogMixin'
import CloudDetail from '@/components/CloudDetail'

export default {
  name: 'ContactAdministrator',
  
  components: {
    CloudDetail
  },
  
  mixins: [DialogMixin],
  
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      detailConfig: {
        onlyShow: true,
        hideTitle: true,
        colSpan: 12,
        disableEdit: true
      }
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '订单编号',
          prop: 'order_no'
        },
        {
          label: '所属ITIL单号 ',
          prop: 'ittl_no'
        },
        {
          label: '数据库负责人',
          prop: 'onDutyUser'
        },
        {
          label: '联系电话',
          prop: 'phone'
        },
        {
          label: '邮箱',
          prop: 'mail'
        }
      ]
    }
  },
  
  methods: {
    openDialog() {},
    confirm() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.text{
  padding-left: 14px;
  color: $textLevelB;
}
</style>
