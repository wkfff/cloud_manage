<!--
  @author:  lzc
  @date:    2019-03-01
  @file:    联系值班人员
  @require:
-->
<template>
  <el-dialog
    title="联系值班DBA"
    :visible.sync="show"
    :close-on-click-modal="false"
    width="600px"
    @open="openDialog"
  >
    
    <div class="content">
      <CloudDetail
        ref="userDetailOverview"
        :fields="detailFields"
        :fields-values="dbaInfo"
        :config="detailConfig"
      />
      <div class="text">
        点击“发短信通知”，系统将自动通知今日值班DBA，为您紧急处理工单内容。
      </div>
    </div>
    
    <div
      slot="footer"
      class="dialog-footer">
      <DelayButton
        ref="confirmBtn"
        type="primary"
        delayPlaceholder="发送中"
        @click="confirm">
        发送短信通知
      </DelayButton>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from '@/mixins/DialogMixin'
import CloudDetail from '@/components/CloudDetail'
import DelayButton from '@/components/DelayButton'
import { GET_DBA_INFO, SEND_MESSAGE_TO_DBA } from '@/api/worksheet'

export default {
  name: 'ContactAdministrator',
  
  components: {
    CloudDetail,
    DelayButton
  },
  
  mixins: [DialogMixin],
  
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rowId: {
      type: [String, Number],
      default: ''
    }
  },
  
  data() {
    return {
      detailConfig: {
        onlyShow: true,
        hideTitle: true,
        colSpan: 12,
        disableEdit: true
      },
      dbaInfo: {}
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '工单编号',
          prop: 'order_no'
        },
        {
          label: '所属ITIL单号 ',
          prop: 'ittl_no'
        },
        {
          label: '今日值班DBA',
          prop: 'name'
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
    async openDialog() {
      try {
        const res = await this.$ajax.get(GET_DBA_INFO, { orderId: this.rowId })
        this.dbaInfo = res.data
      } catch (e) {
        console.error(e)
      }
    },
    async confirm() {
      try {
        const commitData = {
          orderId: this.rowId,
          name: this.dbaInfo.name,
          phone: this.dbaInfo.phone
        }
        await this.$ajax.get(SEND_MESSAGE_TO_DBA, commitData)
        this.$message.success('短信发送成功')
        this.show = false
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.text{
  padding-left: 14px;
  color: $textLevelB;
}
</style>
