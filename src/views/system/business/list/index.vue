<template>
  <div class="app-container">
    <CloudFilters :filterProps="filterProps"/>
    <CloudTable
      ref="listTable"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
    <BusinessForm ref="businessForm"  @handle-reload="handleReload"/>
  </div>
</template>

<script>
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import { GET_BUSINESS_LIST, DELETE_BUSINESS } from '@/api/system'
import CloudFilters from '@/components/CloudFilters'
import BusinessForm from './BusinessForm'

export default {
  name: 'business',
  
  components: {
    CloudTable,
    CloudFilters,
    BusinessForm
  },
  
  mixins: [TableMixin],
  
  data() {
    const filterProps = {
        buttonProps: [
          { 
            text: '新建业务', 
            type: 'primary', 
            icon: 'el-icon-plus', 
            onClick: this.forwardInstanceCreate.bind(this),
            permission: 'business_add',
          }
        ],
        reloadProps: [
          { 
            onClick: this.handleReload.bind(this)
          }
        ],
        searchProps: { 
          options: [
            { label: '业务名', value: 'business_name' }, 
            { label: '描述', value: 'describtion' }
          ], 
          onClick: this.handleSearch.bind(this)
        }
    }
    const fetchConfig = {
      url: GET_BUSINESS_LIST,
      data: {
        machine_type: 1,
        paging: 1 // 表示分页数据
      }
    }
    return {
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps
    }
  },
  
  methods: {
    columnFields() {
      const state = {
        1: '待初始化',
        2: '运行中',
        3: '使用中',
        '-1': '待确认'
      }
      const stateClass = {
        1: 'text-warn',
        2: 'text-running',
        3: 'text-active',
        '-1': 'text-warn'
      }
      return [
        {
          label: '业务名',
          prop: 'business_name'
        },
        {
          label: '描述',
          prop: 'describtion'
        },
        {
          label: '业务负责人',
          prop: 'leader_name'
        },
        {
          label: '关联实例数',
          prop: 'instance_num',
          sortable: 'custom'
        },
        {
          label: '新建时间',
          prop: 'created_at'
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return (
              <el-button type="text" onClick={this.handleDelete.bind(this,row)} class="text-error">删除</el-button>
            )
          }
        }
      ]
    },
    forwardInstanceCreate() {
      this.$refs['businessForm'].showBusinessModal()
    },
    handleReload() {
      // 混入的查询方法
      this.search()
    },
    handleSearch(params) {
      console.log(params)
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    },
    async handleDelete({ business_name, id }) {
      try {
        const confirm = await this.$confirm(`删除业务不可逆，确定要删除${business_name}业务吗？`, '删除业务', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if (confirm === 'confirm') {
          const res = await this.$ajax.delete(DELETE_BUSINESS, '', [id])
          this.$message({
            message: '业务删除成功',
            type: 'success'
          })
          this.search()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
<style lang="scss">
</style>
