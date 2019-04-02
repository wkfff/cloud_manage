<template>
  <div class="cmp-wrapper">
    <div class="content-box">
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
          prop: 'instance_name',
          'min-width': 140,
          render: (h, { row }) => {
            return (
              <div>
                <div>
                  {
                    row.is_init
                      ? <router-link
                        to={ { path: `/instance/mongodb/detail/${row.id}` } }
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
          label: '运行状态',
          prop: 'run_status',
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
          label: '所属业务',
          prop: 'business'
        },
        {
          label: '区域',
          prop: 'area',
          filterHead: true,
          columnFilters: INSTANCE_MONGODB.AREA
        },
        {
          label: '版本',
          prop: 'db_version'
        },
        {
          label: '节点数量',
          prop: 'node_num',
          sortable: 'custom',
          width: 120
        },
        {
          label: '规格',
          prop: 'db_spec',
          filterHead: true,
          columnFilters: [
            { code: 1, value: '待初始化' },
            { code: 2, value: '运行中' },
            { code: 3, value: '使用中' },
            { code: -1, value: '待确认' }
          ],
          render(h, { row }) {
            return (
              <span>{ row.db_spec ? (row.db_spec.replace('C', '核') + ` ${row.disk}G`) : '' }</span>
            )
          }
        },
        {
          label: '创建时间',
          prop: 'created_at',
          width: 120
        },
        {
          label: '操作',
          fixed: 'right',
          render(h, { row }) {
            return (
              <div>
                <router-link
                  to={ { path: `/instance/mongodb/detail/${row.id}` } }
                  class="text-active"
                >查看详情</router-link>
              </div>
            )
          }
        }
      ]
    },
    forwardInstanceCreate() {
      this.$router.push('/instance/mongodb/create')
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

<style lang="scss" scoped>
.cmp-wrapper {
  margin: 20px;
  .content-box {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
