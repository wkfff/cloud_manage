<template>
  <div class="view-wrapper">
    <DialogForm ref="scheduleDialog" @handle-reload="handleReload"/>
    <div class="wrapper-content">
      <CloudFilters :filterProps="filterProps"/>
      <CloudTable
        ref="scheduleTable"
        :column-config="columnConfig"
        :fetch-config="fetchConfig"
      />
    </div>
  </div>
</template>

<script>
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'
import DialogForm from './DialogForm'
import {
  GET_SCHEDULE_JOB_LIST,
  TRIGGER_SCHEDULE_JOB,
  START_SCHEDULE_JOB,
  PAUSE_SCHEDULE_JOB,
  DELETE_SCHEDULE_JOB
} from '@/api/schedule'

export default {
  name: 'schedule',
  components: {
    CloudTable,
    CloudFilters,
    DialogForm
  },
  mixins: [TableMixin],
  data() {
    const filterProps = {
      buttonProps: [
        {
          text: '添加调度任务',
          type: 'primary',
          icon: 'el-icon-plus',
          onClick: this.openJobDialog.bind(this),
          permission: 'schedule_job_add'
        }
      ],
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '任务名称', value: 'job_desc' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_SCHEDULE_JOB_LIST,
      data: {
        classify: 2
      }
    }
    return {
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps
    }
  },
  methods: {
    openJobDialog(jobCode, operate) {
      this.$refs['scheduleDialog'].getScheduleDetail(jobCode, operate)
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delete(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    async trigger(id) {
      const res = await this.$ajax.patch(TRIGGER_SCHEDULE_JOB, { executorParam: '' }, [id])
      this.search('page', 'scheduleTable')
    },
    async delete(id) {
      const res = await this.$ajax.delete(DELETE_SCHEDULE_JOB, { executorParam: '' }, [id])
      this.search('page', 'scheduleTable')
    },
    async start(id) {
      const res = await this.$ajax.patch(START_SCHEDULE_JOB, '', [id])
      this.search('page', 'scheduleTable')
    },
    async stop(id) {
      const res = await this.$ajax.patch(PAUSE_SCHEDULE_JOB, '', [id])
      this.search('page', 'scheduleTable')
    },
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search('page', 'scheduleTable')
    },
    handleReload(params) {
      this.search('page', 'scheduleTable')
    },
    columnFields() {
      return [
        {
          label: '任务名称',
          prop: 'job_desc'
        },
        {
          label: 'Cron',
          prop: 'job_cron'
        },
        {
          label: '状态',
          prop: 'job_status',
          render(h, { row }) {
            if (row.job_status == 'NORMAL') {
              return (
                <span class="text-running">运行中</span>
              )
            } else if (row.job_status == 'NONE') {
              return (
                <span class="text-error">停止</span>
              )
            }
            
          }
        },
        {
          label: '创建人',
          prop: 'author'
        },
        {
          label: '操作',
          width: '200px',
          render: (h, { row }) => {
            if (row.job_status == 'NORMAL') {
              return (
                <div>
                  <el-button type="text" size="mini" class="text-active"
                             onClick={ this.trigger.bind(this, row.id) }>执行
                  </el-button>
                  <el-button type="text" size="mini" class="text-active" onClick={ this.stop.bind(this, row.id) }>停止
                  </el-button>
                  <el-button type="text" size="mini" class="text-warn"
                             onClick={ this.openJobDialog.bind(this, row.job_code, 'update') }>编辑
                  </el-button>
                  <el-button type="text" size="mini" class="text-error"
                             onClick={ this.handleDelete.bind(this, row.id) }>删除
                  </el-button>
                </div>
              )
            } else if (row.job_status == 'NONE') {
              return (
                <div>
                  <el-button type="text" size="mini" class="text-active"
                             onClick={ this.trigger.bind(this, row.id) }>执行
                  </el-button>
                  <el-button type="text" size="mini" class="text-running" onClick={ this.start.bind(this, row.id) }>启动
                  </el-button>
                  <el-button type="text" size="mini" class="text-warn"
                             onClick={ this.openJobDialog.bind(this, row.job_code, 'update') }>编辑
                  </el-button>
                  <el-button type="text" size="mini" class="text-error"
                             onClick={ this.handleDelete.bind(this, row.id) }>删除
                  </el-button>
                </div>
              )
            }
          }
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-content {
  padding: 20px;
  background-color: #fff;
}
</style>
