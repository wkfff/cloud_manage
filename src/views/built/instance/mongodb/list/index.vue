<template>
  <div class="list-wrapper">
    <div class="content-wrapper">
      <CloudFilters :filterProps="filterProps"/>
      <CloudTable
        ref="listTable"
        :column-config="columnConfig"
        :fetch-config="fetchConfig"
      />
    </div>
  </div>
</template>

<script>
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import { GET_MONGO_LIST } from '@/api/instance'
import CloudFilters from '@/components/CloudFilters'
import { INSTANCE_MONGODB } from '@/utils/constant'

export default {
  name: 'mongodb',
  
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
          { label: '工单编号', value: 'apply_no' },
          { label: '工单描述', value: 'apply_desc' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_MONGO_LIST,
      data: {}
    }
    return {
      fetchConfig,
      filterProps
    }
  },
  
  computed: {
    columnConfig() {
      return [
        {
          label: '实例ID/实例名称',
          prop: 'instance_name',
          'min-width': 140,
          render: (h, { row }) => {
            return (
              <div>
                <router-link
                  to={ { path: `/built/instance/entry/mongodb/detail/${row.id}` } }
                  class="text-active"
                >
                  <div>
                    { row.dbaas_instance_id }
                  </div>
                  { row.display_name }
                </router-link>
              </div>
            )
          }
        },
        {
          label: '所属业务系统',
          prop: 'business_name',
          'min-width': 140
        },
        {
          label: '所属项目',
          prop: 'project_name'
        },
        {
          label: '所在区域',
          prop: 'area',
          'min-width': 120,
          filterHead: true,
          columnFilters: INSTANCE_MONGODB.AREA
        },
        {
          label: '所在主机',
          prop: 'machine_names',
          'min-width': 120,
          render(h, { row }) {
            return (
              row.machine_names && Array.isArray(row.machine_names) && row.machine_names.length
                ? (
                  <div>
                    {
                      row.machine_names.map(v => <div>{ v }</div>)
                    }
                  </div>
                )
                : <span>-</span>
            )
          }
        },
        {
          label: '业务负责人',
          prop: 'app_owner',
          'min-width': 140
        },
        {
          label: '数据库管理员',
          prop: 'recommend_db_leader',
          'min-width': 140
        },
        {
          label: '实例所有者',
          prop: 'owner',
          'min-width': 140
        },
        {
          label: '运行状态',
          prop: 'run_status',
          'min-width': 120,
          filterHead: true,
          columnFilters: INSTANCE_MONGODB.RUN_STATUS,
          render: (h, { row }) => {
            return (
              <span
                class={ `${INSTANCE_MONGODB.RUN_STATUS_COLOR[row.run_status]} point` }>
                { INSTANCE_MONGODB.RUN_STATUS[row.run_status] }
              </span>
            )
          }
        },
        {
          label: '类型',
          prop: 'instance_type',
          width: 100
        },
        {
          label: '节点数量',
          prop: 'node_num',
          sortable: 'custom',
          'min-width': 100
        },
        {
          label: '访问地址',
          prop: 'instance_addr',
          'min-width': 140
        },
        {
          label: '创建时间',
          prop: 'created_at',
          sortable: 'custom',
          width: 120,
          render(h, { row }) {
            const [date = '', time = ''] = row.created_at ? row.created_at.split(' ') : []
            return (
              date && time
                ? (
                  <div>
                    <div>{ date }</div>
                    <div>{ time }</div>
                  </div>
                )
                : <span>-</span>
            )
          }
        },
        {
          label: '操作',
          'min-width': 120,
          fixed: 'right',
          render(h, { row }) {
            return (
              <div>
                <router-link
                  to={ { path: `/built/instance/entry/mongodb/detail/${row.id}` } }
                  class="text-active"
                >查看详情</router-link>
              </div>
            )
          }
        }
      ]
    }
  },
  
  methods: {
    forwardInstanceCreate() {
      this.$router.push('/built/create/mongodb')
    },
    handleReload() {
      // 混入的查询方法
      this.search()
    },
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.list-wrapper{
  padding: 20px;
  .content-wrapper{
    background-color: #fff;
    padding: 20px;
    padding-bottom: 40px;
    overflow-x: auto;
  }
}
</style>
