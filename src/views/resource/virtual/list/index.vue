<template>
  <div class="app-container">
    <CloudFilters :filterProps="filterProps"/>
    <CloudTable
      ref="listTable"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
    <AddMachine
      v-model="virtualModalVisible"
      @success="search"
    />
  </div>
</template>

<script>
import CloudTable from '@/components/CloudTable'
import TableMixin from '@/components/CloudTable/TableMixin'
import { GET_MACHINE_LIST, DELETE_MACHINE } from '@/api/resource'
import CloudFilters from '@/components/CloudFilters'
import AddMachine from './components/AddMachine'
import { RESOURCE_MACHINE } from '@/utils/constant'

export default {
  name: 'virtual',
  
  components: {
    CloudTable,
    CloudFilters,
    AddMachine
  },
  
  mixins: [TableMixin],
  
  data() {
    const filterProps = {
      buttonProps: [
        {
          text: '添加虚拟机',
          type: 'primary',
          icon: 'el-icon-plus',
          onClick: this.showVirtualModal.bind(this),
          permission: 'virtual_machine_import'
        }
      ],
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '虚拟机名', value: 'machine_name' },
          { label: '标签', value: 'tag' },
          { label: '所属物理机序列码', value: 'machine_physical' },
          { label: 'SSH IP', value: 'ssh_ip' },
          { label: '总CPU(核)', value: 'cpu' },
          { label: '总内存(GB)', value: 'machine_memory' },
          { label: '总硬盘(GB)', value: 'disk' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_MACHINE_LIST,
      data: {
        machine_type: 1
      }
    }
    return {
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps,
      virtualModalVisible: false
    }
  },
  
  methods: {
    columnFields() {
      return [
        {
          label: '虚拟机名',
          prop: 'machine_name',
          'min-width': 130,
          align: 'left'
        },
        {
          label: '标签',
          prop: 'tag'
        },
        {
          label: '区域',
          prop: 'city'
        },
        {
          label: '数据中心',
          prop: 'idc'
        },
        {
          label: '所属物理机序列码',
          prop: 'machine_physical'
        },
        {
          label: 'SSH IP',
          prop: 'ssh_ip',
          width: '160'
        },
        {
          label: '状态',
          prop: 'state',
          'min-width': 100,
          filterHead: true,
          columnFilters: RESOURCE_MACHINE.STATE,
          render(h, { row }) {
            return (
              <span
                class={ `${RESOURCE_MACHINE.STATE_COLOR[row.state]} point` }>{ RESOURCE_MACHINE.STATE[row.state] }</span>
            )
          }
        },
        {
          label: '总CPU(核)',
          prop: 'cpu',
          sortable: 'custom',
          width: 120
        },
        {
          label: '总内存(GB)',
          prop: 'machine_memory'
        },
        {
          label: '总硬盘(GB)',
          prop: 'disk'
        },
        {
          label: '所应用实例ID',
          prop: '',
          width: 120
        },
        {
          label: '添加时间',
          prop: 'created_at'
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return (
              <el-button
                type="text"
                class="text-error"
                onClick={ this.handleDelete.bind(this, row) }
              >删除</el-button>
            )
          }
        }
      ]
    },
    
    showVirtualModal() {
      this.virtualModalVisible = true
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
    
    async handleDelete({ machine_name, id }) {
      try {
        const confirm = await this.$confirm(`删除虚拟机不可逆，删除后机器不可用，确定要删除${machine_name}吗？`, '删除虚拟机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if (confirm === 'confirm') {
          await this.$ajax.delete(DELETE_MACHINE, '', [id])
          this.$message({
            message: '虚拟机删除成功',
            type: 'success'
          })
          this.search('page')
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
