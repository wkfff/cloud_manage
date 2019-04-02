<!--
  @author:  lzc
  @date:    2019-02-01
  @desc:    用户详情->关联角色
  @require:
-->
<template>
  <div class="app-container">
    
    <CloudFilters :filterProps="filterProps"/>
    
    <CloudTable
      ref="listTable"
      :column-config="columnFields"
      :fetch-config="fetchConfig"
    />
  </div>
</template>

<script>
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'

export default {
  name: 'UserDetailRole',
  
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
          { label: '实例 ID', value: 'instance_name' },
          { label: '实例名称', value: 'display_name' },
          { label: '所属业务', value: 'business_name' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      data: {}
    }
    return {
      fetchConfig,
      filterProps
    }
  },
  
  computed: {
    columnFields() {
      return [
        {
          label: '角色名',
          prop: 'group'
        },
        {
          label: '角色ID',
          prop: 'business'
        },
        {
          label: '描述',
          prop: 'created_at'
        },
        {
          label: '操作',
          'min-width': 100,
          render: (h, { row }) => {
            return (
              <div>
                <el-button type="text">解除关联</el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  
  methods: {
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
