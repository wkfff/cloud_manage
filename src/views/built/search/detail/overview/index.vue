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
import CONFIG from '../../config'
import {
  GET_TASK_LIST_DETAIL,
  POST_RESTART_EXECUTE,
  GET_SHEET_HANDLE_LIST
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
      productCode: ''
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '订单编号',
          prop: 'order_no'
        },
        {
          label: '所属ITIL单号',
          prop: 'ittl_no'
        },
        {
          label: '产品/服务',
          prop: 'work_order_name'
        },
        {
          label: '所属业务系统',
          prop: 'user_name'
        },
        {
          label: '架构办代码',
          prop: 'product_name'
        },
        {
          label: '所属项目',
          prop: 'handle_type_name'
        },
        {
          label: '实例配置',
          prop: 'priority',
          render(h, { row }) {
            return (
              <div>
                <div>数据库用户： username </div>
                <div>数据库密码： ******* </div>
                <div>数据库版本： MySQL 5.7 </div>
                <div>架构类型： 普通实例 </div>
                <div>计算规格： 8核200G </div>
                <div>数据存储容量： 100G </div>
                <div>日志存储容量： 80G </div>
                <div>字符集： utf8 </div>
                <div>最大连接数： 100 </div>
              </div>
            )
          }
        },
        {
          label: '备份策略',
          prop: 'test'
        },
        {
          label: '实例数量',
          prop: 'test'
        },
        
        {
          label: '业务服务时间',
          prop: 'test'
        },
        {
          label: '工作日维护时间',
          prop: 'test'
        },
        {
          label: '节假日维护时间',
          prop: 'test'
        },
        {
          label: 'RTO',
          prop: 'test'
        },
        {
          label: 'RPO',
          prop: 'test'
        },
        {
          label: '业务负责人',
          prop: 'test'
        },
        {
          label: '开发负责人',
          prop: 'test'
        },
        {
          label: '开发室经理',
          prop: 'test'
        },
        
        {
          label: '系统负责人',
          prop: 'test'
        },
        {
          label: '推荐系统管理员',
          prop: 'test'
        },
        {
          label: '推荐数据库管理员',
          prop: 'test'
        },
        {
          label: '提单时间',
          prop: 'created_at'
        }
      ]
    },
    columnConfig() {
      return [
        {
          label: '实例名',
          prop: ''
        },
        {
          label: '描述',
          prop: ''
        },
        {
          label: '所属业务系统',
          prop: ''
        },
        {
          label: '业务负责人',
          prop: ''
        },
        {
          label: '数据库负责人',
          prop: ''
        },
        {
          label: '当前部署状态/结果',
          prop: ''
        },
        {
          label: '操作',
          prop: ''
        }
      ]
    }
  },
  
  watch: {},
  
  created() {
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
    
    async restartExecute(row) {
      try {
        const isExecute = await this.$confirm('确定重新执行吗？', '确认重新执行', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        if (isExecute === 'confirm') {
          await this.$ajax.post(POST_RESTART_EXECUTE, [row.id], [this.$route.params.id])
          this.$message({
            message: '执行成功',
            type: 'success'
          })
          this.search('page', 'taskListTable')
        }
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
