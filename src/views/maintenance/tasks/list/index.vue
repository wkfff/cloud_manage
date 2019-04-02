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
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'
import { GET_TASK_LIST } from '@/api/worksheet'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'TasksEventsList',
  
  components: {
    CloudTable,
    CloudFilters
  },
  
  mixins: [TableMixin],
  
  props: {},
  
  data() {
    const filterProps = {
      buttonProps: [],
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '任务 ID', value: 'job_code' },
          { label: '任务名称', value: 'job_desc' },
          { label: '所属工单编号', value: 'order_no' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    return {
      fetchConfig: {
        url: GET_TASK_LIST
      },
      filterProps
    }
  },
  
  computed: {
    columnConfig() {
      return [
        {
          label: '任务ID',
          prop: 'job_code',
          'min-width': 180,
          render(h, { row }) {
            const route = {
              path: `/maintenance/tasks/list-detail/${row.job_code}`,
              query: {
                workOrderId: row.work_order.id,
                product: row.work_order.product_code,
                type: row.work_order.handle_type_code
              }
            }
            return (
              <router-link to={ route }>
                <span class="text-active">{ row.job_code }</span>
              </router-link>
            )
          }
        },
        {
          label: '任务名称',
          prop: 'job_desc',
          'min-width': 140
        },
        {
          label: '所属工单编号',
          'min-width': 100,
          render(h, { row }) {
            const order_no = row.work_order && row.work_order.order_no
            const id = row.work_order && row.work_order.id
            return (
              order_no
                ? (
                  <router-link to={ { path: `/maintenance/sheet/detail/${id}` } }>
                    <span class="text-active">{ order_no }</span>
                  </router-link>
                )
                : null
            )
          }
        },
        {
          label: '所属工单类型',
          'min-width': 100,
          filterHead: true,
          columnFilters: WORKSHEET.PRIORITY,
          render(h, { row }) {
            return (
              <span>{ row.work_order && WORKSHEET.PRIORITY[row.work_order.priority] }</span>
            )
          }
        },
        {
          label: '执行情况',
          'min-width': 100,
          render(h, { row }) {
            return (
              <div>
                <div>执行成功数： { row.success_count }</div>
                { row.fail_count > 0 ? <div class="text-error">执行问题数： { row.fail_count }</div> : null }
              </div>
            )
          }
        },
        {
          label: '计划开始时间',
          render(h, { row }) {
            return (
              <span>{ row.work_order && row.work_order.schedule_begin_time }</span>
            )
          }
        },
        {
          label: '计划结束时间',
          render(h, { row }) {
            return (
              <span>{ row.work_order && row.work_order.schedule_end_time }</span>
            )
          }
        },
        {
          label: '实际开始时间',
          render(h, { row }) {
            return (
              <span>{ row.work_order && row.work_order.acture_begin_time }</span>
            )
          }
        },
        {
          label: '操作',
          fixed: 'right',
          render(h, { row }) {
            const route = {
              path: `/maintenance/tasks/list-detail/${row.job_code}`,
              query: {
                workOrderId: row.work_order.id,
                product: row.work_order.product_code,
                type: row.work_order.handle_type_code
              }
            }
            return (
              <router-link to={ route }>
                <span class="text-active">查看详情</span>
              </router-link>
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
    forwardInstanceCreate() {
      this.$router.push('/instance/mysql/create')
    },
    forwardDetail(row) {
      this.$router.push(`/instance/mysql/detail/${row.id}`)
    },
    handleReload() {
      // 混入的查询方法
      this.search()
    },
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    },
    showInitialModal() {
      this.$refs['initialModal'].showInitialModal()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
