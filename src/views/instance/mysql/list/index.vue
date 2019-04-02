<template>
  <div class="mysql-wrapper">
    <div class="content-box">
      <CloudFilters :filterProps="filterProps"/>
      <CloudTable
        ref="listTable"
        :column-config="columnConfig"
        :fetch-config="fetchConfig"
      />
    </div>
    <InitialDialog
      ref="initialModal"
      @handle-reload="handleReload"
    />
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'
import InitialDialog from './InitialDialog'
import { INSTANCE_MYSQL } from '@/utils/constant'
import {
  GET_MYSQL_LIST,
  GET_MYSQL_INSTANCE_TYPE
} from '@/api/instance'

export default {
  name: 'mysql',
  
  components: {
    CloudTable,
    CloudFilters,
    InitialDialog
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
          { label: '实例 ID', value: 'instance_name' },
          { label: '实例名称', value: 'display_name' },
          { label: '所属业务', value: 'business_name' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_MYSQL_LIST
    }
    return {
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps
    }
  },
  
  methods: {
    columnFields() {
      return [
        {
          label: '实例ID/实例名称',
          'min-width': 140,
          render: (h, { row }) => {
            return (
              <el-button
                type="text"
                onClick={ this.forwardDetail.bind(this, row) }>{ row.instance_name }</el-button>
            )
          }
        },
        {
          label: '所属项目',
          prop: 'business',
          'min-width': 80
        },
        {
          label: '所有者',
          prop: 'business',
          'min-width': 80
        },
        {
          label: '所在区域',
          prop: 'city',
          'min-width': 100,
          filterHead: true,
          columnFilters: INSTANCE_MYSQL.AREA
        },
        {
          label: '所在主机',
          prop: 'business',
          'min-width': 80
        },
        {
          label: '运行状态',
          prop: 'run_status',
          'min-width': 120,
          filterHead: true,
          columnFilters: INSTANCE_MYSQL.RUN_STATUS,
          render: (h, { row }) => {
            return (
              <span
                class={ `${INSTANCE_MYSQL.RUN_STATUS_COLOR[row.run_status]} point` }>{ INSTANCE_MYSQL.RUN_STATUS[row.run_status] }</span>
            )
          }
        },
        {
          label: '类型',
          prop: 'instance_type',
          'min-width': 90,
          filterHead: true,
          filterFetch: {
            url: GET_MYSQL_INSTANCE_TYPE,
            data: {
              dbType: 1
            }
          }
        },
        {
          label: '节点数量',
          prop: 'node_num',
          sortable: 'custom',
          'min-width': 100
        },
        {
          label: '访问地址',
          prop: 'instance_addr'
        },
        {
          label: '创建时间',
          prop: 'created_at',
          sortable: 'custom',
          width: 120
        },
        {
          label: '操作',
          'min-width': 100,
          fixed: 'right',
          render: (h, { row }) => {
            return (
              <el-button type="text" onClick={ this.forwardDetail.bind(this, row) }>查看详情</el-button>
            )
          }
        }
      ]
    },
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

<style lang="scss" scoped>
.mysql-wrapper {
  margin: 20px;
  .content-box {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
