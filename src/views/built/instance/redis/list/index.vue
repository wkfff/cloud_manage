<template>
  <div class="list-wrapper">
    <div class="content-wrapper">
      <CloudFilters :filterProps="filterProps"/>
      <div style="width: 100%; overflow-x: auto">
        <CloudTable
          ref="listTable"
          :column-config="columnConfig"
          :fetch-config="fetchConfig"
        />
      </div>
    
    </div>
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import { GET_REDIS_LIST } from '@/api/instance'
import CloudFilters from '@/components/CloudFilters'
import { INSTANCE_REDIS } from '@/utils/constant'

export default {
  name: 'redis',
  
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
          { label: '实例名称', value: 'display_name' },
          { label: '描述', value: 'instance_desc' },
          { label: '所属业务', value: 'business_name' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_REDIS_LIST,
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
                  to={ { path: `/built/instance/entry/redis/detail/${row.id}` } }
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
          'min-width': 100,
          filterHead: true,
          columnFilters: INSTANCE_REDIS.AREA
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
          columnFilters: INSTANCE_REDIS.RUN_STATUS,
          render: (h, { row }) => {
            return (
              <span
                class={ `${INSTANCE_REDIS.RUN_STATUS_COLOR[row.run_status]} point` }>{ INSTANCE_REDIS.RUN_STATUS[row.run_status] }</span>
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
          width: 100
        },
        {
          label: '总内存',
          prop: 'mem_size',
          width: 100
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
          fixed: 'right',
          width: 120,
          render(h, { row }) {
            return (
              <div>
                <router-link
                  to={ { path: `/built/instance/entry/redis/detail/${row.id}` } }
                  class="text-active"
                >查看详情
                </router-link>
              </div>
            )
          }
        }
      ]
    }
  },
  
  methods: {
    forwardInstanceCreate() {
      this.$router.push('/built/create/redis')
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

<style rel="stylesheet/scss" lang="scss" scoped>
.list-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 40px;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
