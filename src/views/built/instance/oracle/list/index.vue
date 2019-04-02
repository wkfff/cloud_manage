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
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps
    }
  },
  
  methods: {
    columnFields() {
      return [
        {
          label: '实例名称',
          prop: 'instance_name',
          'min-width': 140,
          render: (h, { row }) => {
            return (
              <div>
                <div>
                  {
                    row.is_init
                      ? <router-link
                        to={ { path: `/built/instance/entry/redis/detail/${row.id}` } }
                        class="text-active"
                      >{ row.instance_name }</router-link>
                      : <span>{ row.instance_name }</span>
                  }
                </div>
                <div>
                  { row.display_name }
                </div>
              </div>
            )
          }
        },
        {
          label: '所属项目',
          prop: 'instance_desc'
        },
        {
          label: '所有者',
          prop: 'instance_desc'
        },
        {
          label: '区域',
          prop: 'area',
          'min-width': 100,
          filterHead: true,
          columnFilters: INSTANCE_REDIS.AREA
        },
        {
          label: '所在主机',
          prop: 'instance_desc'
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
          prop: 'architecture',
          width: 100
        },
        {
          label: '节点数量',
          prop: 'architecture',
          width: 100
        },
        {
          label: '总内存',
          prop: 'disk',
          width: 100
        },
        {
          label: '版本',
          prop: 'db_spec',
          render(h, { row }) {
            return (
              <span>{ row.db_spec ? (row.db_spec.replace('C', '核') + ` ${row.disk}G`) : '' }</span>
            )
          }
        },
        {
          label: '已用/可用内存',
          prop: 'node_num',
          width: 140
        },
        {
          label: '创建时间',
          prop: 'created_at',
          sortable: 'custom',
          width: 120
        },
        {
          label: '操作',
          fixed: 'right',
          render(h, { row }) {
            return (
              <div>
                <router-link
                  to={ { path: `/built/instance/entry/redis/detail/${row.id}` } }
                  class="text-active"
                >查看详情</router-link>
              </div>
            )
          }
        }
      ]
    },
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
.list-wrapper{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  padding-top: 0;
  padding-right: 0;
  .content-wrapper{
    background-color: #fff;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 40px;
    width: 100%;
    overflow-x: auto;
  }
}
</style>
