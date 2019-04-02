<!--
  @author:  lzc
  @date:    2019-01-24
  @desc:    审批工单
  @require:
-->
<template>
  <el-dialog
    title="审批工单"
    :visible.sync="show"
    :close-on-click-modal="false"
    width="600px"
  >
    <div class="content">
      <div class="title">
        <span>正在审批</span>
        <span
          :class="[showTable ? 'active' : '']"
          class="text-active sheet-text"
          @click="showTable = !showTable">
          1个工单
          <i class="el-icon-arrow-down el-icon--right more-handle-icon"/>
        </span>
      </div>
      <div
        v-if="showTable"
        class="table-toggle-box">
        <CloudTable
          ref="approvalTable"
          :column-config="columnConfig"
          :table-config="{tableData: currentRow ? [currentRow]: [], hidePagination: true}"
        />
      </div>
      
      <el-form
        ref="approvalForm"
        :model="formData"
        :rules="rules"
        label-width="100px"
        class="approval-form"
      >
        
        <el-form-item
          label="审批结果"
          prop="status">
          <el-select
            v-model.number="formData.status"
            placeholder="请选择审批结果">
            <el-option
              label="批准"
              :value="1">
            </el-option>
            <el-option
              label="拒绝"
              :value="0">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item
          label="审批意见"
          prop="reason">
          <el-input
            v-model="formData.reason"
            type="textarea"
            :rows="2"
            placeholder="请输入审批结果"
          />
        </el-form-item>
      
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer">
      <DelayButton
        ref="confirmBtn"
        type="primary"
        delayPlaceholder="提交中"
        @click="confirm">
        确 定
      </DelayButton>
      <el-button
        @click="show = false">取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import CloudTable from '@/components/CloudTable'
import DialogMixin from '@/mixins/DialogMixin'
import DelayButton from '@/components/DelayButton/index.vue'
import { INTANCE_DB_TYPE } from '@/utils/constant'
import { PATCH_APPROVAL, PATCH_APPROVAL_REJECT } from '@/api/worksheet'

export default {
  name: 'ApprovalDialog',
  
  components: {
    CloudTable,
    DelayButton
  },
  
  mixins: [DialogMixin],
  
  props: {
    currentRow: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    const columnConfig = [
      {
        label: '工单编号',
        prop: 'apply_no'
      },
      {
        label: '相关资源类型',
        prop: 'db_type',
        render: (h, { row }) => {
          return (
            <span>{ INTANCE_DB_TYPE[row.db_type] }</span>
          )
        }
      },
      {
        label: '工单描述',
        prop: 'apply_desc'
      },
      {
        label: '提单用户ID',
        prop: 'created_by'
      }
    ]
    return {
      formData: {
        status: 1,
        reason: ''
      },
      rules: {
        status: [{ required: true, message: '请选择审批结果', trigger: 'change' }]
      },
      columnConfig,
      showTable: false
    }
  },
  
  computed: {},
  
  watch: {
    currentRow: {
      deep: true,
      handler(val) {
      
      }
    }
  },
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    async confirm() {
      try {
        const valid = await this.$refs['approvalForm'].validate()
        if (valid) {
          const { status, reason } = this.formData
          status
            ? await this.$ajax.patch(PATCH_APPROVAL, { reason }, [this.currentRow.id])
            : await this.$ajax.patch(PATCH_APPROVAL_REJECT, { reason }, [this.currentRow.id])
          const text = status ? '批准成功' : '拒绝成功'
          this.$message({
            message: text,
            type: 'success'
          })
          this.$emit('success')
          this.show = false
        }
      } catch (e) {
        this.$refs.confirmBtn.clear()
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sheet-text {
  font-weight: 600;
  cursor: pointer;
  margin-left: 5px;
  &.active {
    .more-handle-icon {
      transition: transform .1s linear;
      transform: rotate(180deg);
    }
  }
  /deep/ .el-icon--right {
    margin-left: 0;
  }
}

.approval-form {
  padding-top: 20px;
  /deep/ .el-form-item__label {
    font-weight: 500;
  }
}

</style>
