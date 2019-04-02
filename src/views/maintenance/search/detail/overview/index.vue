<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    xx
  @require:
-->
<template>
  <div class="detail-wrapper">
    <div class="detail-info-box">
      <CloudDetail
        ref="tasksDetail"
        :fields="detailFields"
        :config="detailConfig"
        :fields-values="detailInfo"
      />
    </div>
    <div class="handle-box">
      <CloudSectionTitle title=" 操作列表"/>
      <div class="handle-box-content">
        <div class="num-box">
          执行成功 <span class="text-num text-success">{{ count.success }}</span>
          执行中 <span class="text-num text-active">{{ count.excuting }}</span>
          执行失败 <span class="text-num text-error">{{ count.fail }}</span>
        </div>
        <div class="table">
          <CloudFilters
            :filterProps="filterProps"
          />
          <CloudTable
            ref="sheetOverviewTable"
            :column-config="columnConfig"
            :fetch-config="fetchConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/jsx">
import CloudBack from '@/components/CloudBack'
import CloudDetail from '@/components/CloudDetail'
import CloudSectionTitle from '@/components/CloudSectionTitle'
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'
import CONFIG from '../../config'
import {
  GET_SHEET_CLASSIFY_COUNT,
  GET_SHEET_HANDLE_LIST,
  GET_TASK_LIST_DETAIL,
  POST_RESTART_EXECUTE
} from '@/api/worksheet'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'SheetOverview',
  
  components: {
    CloudBack,
    CloudDetail,
    CloudSectionTitle,
    CloudTable,
    CloudFilters
  },
  
  mixins: [TableMixin],
  
  props: {},
  
  data() {
    const fetchConfig = {
      url: GET_SHEET_HANDLE_LIST,
      method: 'GET',
      data: {
        work_order_id: this.$route.params.id
      }
    }
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
          { label: '实例 ID', value: 'instance_name' },
          { label: '实例名称', value: 'display_name' },
          { label: '所属业务', value: 'business_name' }
        ],
        selectValue: 'instance_name',
        selectLabel: '实例 ID',
        onClick: this.handleSearch.bind(this)
      }
    }
    return {
      detailConfig: {
        title: '基本信息',
        colSpan: 12,
        disableEdit: true
      },
      tableConfig: {
        hasSelection: true
      },
      fetchConfig,
      filterProps,
      detailInfo: {},
      handleTypeCode: '',
      productCode: '',
      count: {},
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
          label: '所属ITIL单号',
          prop: 'ittl_no'
        },
        {
          label: '提单人/工号',
          prop: 'user_name'
        },
        {
          label: '产品/服务',
          prop: 'product_name'
        },
        {
          label: '运维类型',
          prop: 'handle_type_name'
        },
        {
          label: '简要描述',
          prop: 'description'
        },
        {
          label: '配置信息',
          prop: 'priority',
          render(h, { row }) {
            return (
              <div>
                <div>TOP系统： { row.top_system || '-' } </div>
                <div>工单类型： { WORKSHEET.PRIORITY[row.priority] || '-' } </div>
                <div>手机号： { row.phone || '-' } </div>
                <div>邮箱： { row.email || '-' } </div>
                <div>数据库用户持有人： { `${row.hold_emp_name}/${row.hold_emp_no}` || '-' } </div>
              </div>
            )
          }
        },
        {
          label: '计划开始时间',
          prop: 'schedule_begin_time'
        },
        {
          label: '计划使用时长',
          prop: 'plan_use_time',
          render(h, { row }) {
            return (
              <span>{ row.plan_use_time ? `${row.plan_use_time} 小时` : '-' }</span>
            )
          }
        },
        {
          label: '实际完成时间',
          prop: 'acture_end_time'
        },
        {
          label: '提单时间',
          prop: 'created_at'
        }
      ]
    },
    columnConfig() {
      const { handleTypeCode, productCode } = this
      return handleTypeCode && productCode ? CONFIG(this)[productCode][handleTypeCode].TABLE_FIELDS : []
    }
  },
  
  created() {
    this.__getDetail()
    this.__getCount()
  },
  
  methods: {
    /**
     * 获取详情
     * @return {Promise<void>}
     * @private
     */
    async __getDetail() {
      try {
        const res = await this.$ajax.get(GET_TASK_LIST_DETAIL, '', [this.$route.params.id])
        const { handle_type_code, product_code } = res.data
        this.handleTypeCode = handle_type_code
        this.productCode = product_code
        this.detailInfo = res.data || {}
      } catch (e) {
        console.error(e)
      }
    },
    
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
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
          const tableData = this.$refs.sheetOverviewTable.getTableData()
          tableData[index].status = 3
          this.$refs.sheetOverviewTable.setTableData(tableData)
          
          // 重新执行按钮变成disable状态
          this.$set(this.executeBtnStatus, `disable-${row.id}`, true)
          
          const res = await this.$ajax.post(POST_RESTART_EXECUTE, [row.id], [this.$route.params.id])
          this.$message({
            message: res.msg || '提交成功',
            type: 'success'
          })
          this.search('page', 'sheetOverviewTable')
        }
      } catch (e) {
        e !== 'cancel' && this.search('page', 'sheetOverviewTable')
        console.error(e)
      }
    },
    
    async __getCount() {
      try {
        const res = await this.$ajax.get(GET_SHEET_CLASSIFY_COUNT, { orderId: this.$route.params.id })
        this.count = res.data
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.handle-box {
  background-color: #fff;
  padding: 20px;
  .num-box {
    width: 100%;
    height: 40px;
    border: 1px solid $dividerColor;
    line-height: 38px;
    padding: 0 20px;
    font-size: 14px;
    .text-num {
      display: inline-block;
      vertical-align: middle;
      padding-left: 10px;
      padding-right: 80px;
    }
  }
  .table {
    padding-top: 20px;
  }
  .handle-box-content {
    padding-top: 15px;
  }
}
</style>
