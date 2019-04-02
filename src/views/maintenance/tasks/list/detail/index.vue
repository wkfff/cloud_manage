<!--
  @author:  lzc
  @date:    2019-02-19
  @file:    任务详情
  @require:
-->
<template>
  <div class="detail-wrapper">
    <CloudBack :title="$route.params.id"/>
    <div class="info-box">
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
          执行成功 <span class="text-num text-success">0</span>
          执行中 <span class="text-num text-active">0</span>
          执行失败 <span class="text-num text-error">0</span>
        </div>
        <div class="table">
          <CloudFilters
            :filterProps="filterProps"
          />
          <CloudTable
            ref="taskListTable"
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
import CONFIG from './config'
import {
  GET_TASK_LIST_DETAIL,
  GET_EXECUTE_LOG,
  POST_RESTART_EXECUTE
} from '@/api/worksheet'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'TasksAndEventsListDetail',
  
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
      url: GET_EXECUTE_LOG,
      method: 'GET',
      data: {
        id: this.$route.query.workOrderId
      },
      formatData: data => {
        const result = []
        Array.isArray(data.list) && data.list.forEach(v => {
          const { status, is_retry, id } = v
          v.item.status = status
          v.item.is_retry = is_retry
          v.item.id = id
          result.push(v.item)
        })
        return result
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
      detailInfo: {}
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '任务ID',
          prop: 'id'
        },
        {
          label: '任务名称',
          prop: 'job_desc'
        },
        {
          label: '所属工单编号',
          prop: 'order_no',
          render(h, { row }) {
            return (
              <span>{ (row.work_order && row.work_order.order_no) || '-' }</span>
            )
          }
        },
        {
          label: '所属工单类型',
          prop: 'priority',
          render(h, { row }) {
            return (
              <span>{ row.work_order && WORKSHEET.PRIORITY[row.work_order.priority] }</span>
            )
          }
        },
        {
          label: '所属工单描述',
          prop: 'description',
          render(h, { row }) {
            return (
              <span>{ (row.work_order && row.work_order.description) || '-' }</span>
            )
          }
        },
        {
          label: '计划开始时间',
          prop: 'schedule_begin_time',
          render(h, { row }) {
            return (
              <span>{ (row.work_order && row.work_order.schedule_begin_time) || '-' }</span>
            )
          }
        },
        {
          label: '实际开始时间',
          prop: 'acture_begin_time',
          render(h, { row }) {
            return (
              <span>{ (row.work_order && row.work_order.acture_begin_time) || '-' }</span>
            )
          }
        }
      ]
    },
    columnConfig() {
      const { product, type } = this.$route.query
      return CONFIG(this)[product][type].TABLE_FIELDS
    }
  },
  
  watch: {},
  
  created() {
    console.log(this.$route)
    this.__getDetail()
  },
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    /**
     * 获取详情
     * @return {Promise<void>}
     * @private
     */
    async __getDetail() {
      try {
        const res = await this.$ajax.get(GET_TASK_LIST_DETAIL, '', [this.$route.params.id])
        console.log('====', res)
        this.detailInfo = res.data || {}
      } catch (e) {
        console.error(e)
      }
    },
    
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    },
    
    async restartExecute(row) {
      try {
        await this.$ajax.post(POST_RESTART_EXECUTE, [row.id], [this.$route.params.id])
        this.$message({
          message: '执行成功',
          type: 'success'
        })
        this.search('page', 'taskListTable')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-wrapper {
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
    .handle-box-content {
      padding-top: 15px;
    }
  }
}
</style>
