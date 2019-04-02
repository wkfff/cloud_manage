<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    xx
  @require:
-->
<template>
  <div>
    <CloudFilters :filterProps="filterProps">
      <div slot="right">
        <el-date-picker
          v-model="customDate"
          :picker-options="pickerOptions"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="margin-right: 10px"
          @change="changeCustomDate"/>
      </div>
    </CloudFilters>
    <CloudTable
      ref="taskListTable"
      :table-config="tableConfig"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import CloudFilters from '@/components/CloudFilters'
import { GET_EXECUTE_LOG } from '@/api/worksheet'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'SheetLogs',
  
  components: {
    CloudTable,
    CloudFilters
  },
  
  props: {},
  
  data() {
    const fetchConfig = {
      url: GET_EXECUTE_LOG,
      data: {
        orderId: this.$route.params.id,
        pickerTime: ''
      },
      formatData: data => {
        return data
      }
    }
    const filterProps = {
      buttonProps: [],
      reloadProps: [
        {
          onClick: this.search.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '执行人', value: 'executor' },
          { label: '审批意见/执行日志', value: 'log' }
        ],
        selectValue: 'executor',
        selectLabel: '执行人',
        onClick: this.search.bind(this)
      }
    }
    
    return {
      fetchConfig,
      filterProps,
      tableConfig: {
        hidePagination: true
      },
      customDate: [],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > (new Date()).getTime()
        }
      }
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
          label: '类别',
          prop: 'type',
          filterHead: true,
          columnFilters: WORKSHEET.LOG_TYPE,
          render(h, { row }) {
            return (
              <span>{ WORKSHEET.LOG_TYPE[row.type] }</span>
            )
          }
        },
        {
          label: '执行人',
          prop: 'executor'
        },
        {
          label: '审批意见/执行日志',
          prop: 'log'
        },
        {
          label: '执行结果',
          prop: 'status',
          render(h, { row }) {
            return (
              <span
                class={ `${WORKSHEET.LOG_RESULT_COLOR[row.type][row.status]} point` }
              >{ WORKSHEET.LOG_RESULT[row.type][row.status] }</span>
            )
          }
        }
      ]
    }
  },
  
  methods: {
    search(...args) {
      this.$refs.taskListTable && this.$refs.taskListTable.updateTable(...args)
    },
    
    changeCustomDate(val) {
      this.fetchConfig.data.pickerTime = val ? val.join(',') : null
      this.search()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
