<!--
  @author:  lzc
  @date:    2019-03-01
  @file:    重新执行
  @require:
-->
<template>
  <el-dialog
    title="重新执行"
    :visible.sync="show"
    :close-on-click-modal="false"
    @opened="openDialog"
  >
    
    <div class="content">
      <CloudDetail
        ref="userDetailOverview"
        :fields="detailFields"
        :fields-values="row"
        :config="detailConfig"
      />
      <div class="text">操作列表</div>
      <div class="table-list">
        <CloudFilters
          :filterProps="filterProps"
        />
        <CloudTable
          ref="listTable"
          :column-config="columnConfig"
          :fetch-config="fetchConfig"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/jsx">
import DialogMixin from '@/mixins/DialogMixin'
import CloudDetail from '@/components/CloudDetail'
import CloudTable from '@/components/CloudTable'
import CloudFilters from '@/components/CloudFilters'
import TableMixin from '@/components/CloudTable/TableMixin'
import CONFIG from '../../config'
import {
  POST_RESTART_EXECUTE,
  GET_SHEET_HANDLE_LIST
} from '@/api/worksheet'

export default {
  name: 'RestartExecute',
  
  components: {
    CloudTable,
    CloudDetail,
    CloudFilters
  },
  
  mixins: [DialogMixin, TableMixin],
  
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    const filterProps = {
      buttonProps: [
        {
          text: '重新执行',
          type: 'primary',
          onClick: this.restartExecute.bind(this)
        }
      ],
      reloadProps: [
        {
          onClick: this.search.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '实例名称', value: 'instance_name' }
        ],
        selectValue: 'instance_name',
        selectLabel: '实例 ID',
        onClick: this.search.bind(this)
      }
    }
    return {
      detailConfig: {
        onlyShow: true,
        hideTitle: true,
        colSpan: 12,
        disableEdit: true
      },
      fetchConfig: null,
      filterProps,
      executeBtnStatus: {}
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
          label: '工单标题',
          prop: 'work_order_name'
        },
        {
          label: '产品/服务',
          prop: 'product_name'
        },
        {
          label: '运维类型',
          prop: 'handle_type_name'
        }
      ]
    },
    columnConfig() {
      if (this.row) {
        const { product_code = '', handle_type_code = '' } = this.row
        return product_code && handle_type_code ? CONFIG(this)[product_code][handle_type_code].TABLE_FIELDS : []
      } else {
        return []
      }
    }
  },
  
  methods: {
    
    openDialog() {
      this.fetchConfig = {
        url: GET_SHEET_HANDLE_LIST,
        method: 'GET',
        data: {
          work_order_id: this.row.id
        }
      }
      this.$nextTick(() => {
        this.search()
      })
    },
    
    async restartExecute(row, index) {
      try {
        const isExecute = await this.$confirm('确定重新执行吗？', '确认重新执行', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        if (isExecute === 'confirm') {
          // 把当前行状态变成执行中
          const tableData = this.$refs.listTable.getTableData()
          tableData[index].status = 3
          this.$refs.listTable.setTableData(tableData)
  
          // 重新执行按钮变成disable状态
          this.$set(this.executeBtnStatus, `disable-${row.id}`, true)
  
          const res = await this.$ajax.post(POST_RESTART_EXECUTE, [row.id], [this.row.id])
          this.$message({
            message: res.msg || '提交成功',
            type: 'success'
          })
          this.search('page')
        }
      } catch (e) {
        e !== 'cancel' && this.search('page')
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
