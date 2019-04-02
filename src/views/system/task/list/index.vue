<template>
  <div class="app-container">
    <CloudFilters :filterProps="filterProps"/>
    <CloudTable
      ref="listTable"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
  </div>
</template>

<script>
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import { GET_TASK_LIST } from '@/api/system'
import CloudFilters from '@/components/CloudFilters'
import { SYSTEM_TASK_EXCUTE_STATUS, SYSTEM_TASK_STATUS_COLOR } from '@/utils/constant'

export default {
  name: 'task',
  
  components: {
    CloudTable,
    CloudFilters
  },
  
  mixins: [TableMixin],
  
  data() {
    const filterProps = {
        reloadProps: [
          { 
            onClick: this.handleReload.bind(this)
          }
        ],
        searchProps: { 
          options: [
            { label: '任务 ID', value: 'id' }, 
            { label: '所在实例名称', value: 'instance_name' }
          ], 
          onClick: this.handleSearch.bind(this)
        }
    }
    const fetchConfig = {
      url: GET_TASK_LIST,
      data: {
        machine_type: 1
      }
    }
    return {
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps
    }
  },
  
  methods: {
    columnFields() {
      const state = {
        1: '待初始化',
        2: '运行中',
        3: '使用中',
        '-1': '待确认'
      }
      const stateClass = {
        1: 'text-warn',
        2: 'text-running',
        3: 'text-active',
        '-1': 'text-warn'
      }
      return [
        {
          label: '任务ID',
          prop: 'id'
        },
        {
          label: '任务类型',
          prop: 'task_type_name'
        },
        {
          label: '所在实例名称',
          prop: 'instance_name'
        },
        {
          label: '执行状态',
          prop: 'status',
          filterHead: true,
          columnFilters: SYSTEM_TASK_EXCUTE_STATUS,
          render: (h, { row }) => {
            return (
              <span class={ `${SYSTEM_TASK_STATUS_COLOR[row.status]} point` }>{ SYSTEM_TASK_EXCUTE_STATUS[row.status] }</span>
            )
          }
        },
        {
          label: '任务开始时间',
          prop: 'created_at'
        },
        {
          label: '任务结束时间',
          prop: 'end_at'
        }
      ]
    },
    handleReload() {
      // 混入的查询方法
      this.search()
    },
    handleSearch(params) {
      console.log(params)
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    }
  }
}
</script>
<style lang="scss">
</style>
