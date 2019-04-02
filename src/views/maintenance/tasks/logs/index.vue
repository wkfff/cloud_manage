<!--
  @author:  lzc
  @date:    2019-02-14
  @file:    xx
  @require:
-->
<template>
  <div>
    <CloudFilters :filterProps="filterProps"/>
    <CloudTable
      ref="listTable"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
    <LogDetail
      v-model="visible"
      :row-detail="currentRow"
    />
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'
import LogDetail from './components/LogDetail'
import { GET_EXECUTE_LOG } from '@/api/worksheet'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'ExecuteLogs',
  
  components: {
    CloudTable,
    CloudFilters,
    LogDetail
  },
  
  mixins: [TableMixin],
  
  props: {},
  
  data() {
    const filterProps = {
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '实例 ID', value: 'instance_name' },
          { label: '实例名称', value: 'display_name' },
          { label: '所属业务', value: 'business_name' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    return {
      fetchConfig: {
        url: GET_EXECUTE_LOG
      },
      filterProps,
      visible: false,
      currentRow: null
    }
  },
  
  computed: {
    columnConfig() {
      return [
        {
          label: '开始时间',
          prop: 'begin_time'
        },
        {
          label: '结束时间',
          prop: 'end_time'
        },
        {
          label: '执行人',
          prop: 'execute_man'
        },
        {
          label: '所属任务ID',
          prop: 'order_no'
        },
        {
          label: '所属任务名称',
          prop: 'job_desc'
        },
        {
          label: '所属工单编号',
          prop: 'order_no'
        },
        {
          label: '执行项',
          render(h, { row }) {
            const list = row.item || {}
            return (
              <div>
                实例名：{ list.instance_name || '' }
                参数名：{ list.param_key || '' }
                参数值（修改后）：{ list.param_value || '' }
              </div>
            )
          }
        },
        {
          label: '执行结果',
          prop: 'status',
          render(h, { row }) {
            return (
              <span
                class={ `${WORKSHEET.LOG_STATUS_COLOR[row.status]} point` }>{ WORKSHEET.LOG_STATUS[row.status] }</span>
            )
          }
        },
        {
          label: '操作',
          fixed: 'right',
          render: (h, { row }) => {
            return (
              <el-button
                type="text"
                class="text-active"
                onClick={ this.showDetail.bind(this, row) }
              >查看详情</el-button>
            )
          }
        }
      ]
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {
  },
  
  destroyed() {},
  
  methods: {
    
    handleReload() {
      // 混入的查询方法
      this.search()
    },
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    },
    
    showDetail(row) {
      this.currentRow = row
      this.visible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
