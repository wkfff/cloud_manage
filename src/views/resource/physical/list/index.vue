<template>
  <div class="app-container">
    <CloudFilters :filterProps="filterProps"/>
    <CloudTable
      ref="listTable"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
    <AddMachine
      v-model="physicalModalVisible"
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
  name: 'physical',
  
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
          text: '添加物理机',
          type: 'primary',
          icon: 'el-icon-plus',
          onClick: this.showPhysicalModal.bind(this),
          permission: 'physical_machine_import'
        }
      ],
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '物理机名', value: 'machine_name' },
          { label: '标签', value: 'tag' },
          { label: '机器序列码', value: 'machine_physical' },
          { label: '机型', value: 'model' },
          { label: 'SSH IP', value: 'ssh_ip' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_MACHINE_LIST,
      data: {
        machine_type: 2
      }
    }
    return {
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps,
      physicalModalVisible: false
    }
  },
  
  methods: {
    columnFields() {
      return [
        {
          label: '物理机名',
          prop: 'machine_name'
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
          prop: 'city'
        },
        {
          label: '机器序列码',
          prop: 'city'
        },
        {
          label: 'SSH IP',
          prop: 'ssh_ip'
        },
        {
          label: '状态',
          prop: 'state',
          filterHead: true,
          columnFilters: RESOURCE_MACHINE.STATE,
          render(h, { row }) {
            return (
              <span class={ `${RESOURCE_MACHINE.STATE_COLOR[row.state]} point` }>{ RESOURCE_MACHINE.STATE[row.state] }</span>
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
          label: '实例数量',
          prop: 'disk'
        },
        {
          label: '添加时间',
          prop: 'created_at'
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return (
              <el-button type="text" class="text-error" onClick={this.handleDelete.bind(this,row)}>删除</el-button>
            )
          }
        }
      ]
    },
    showPhysicalModal() {
      this.physicalModalVisible = true
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
        const confirm = await this.$confirm(`删除物理机不可逆，删除后机器不可用，确定要删除${machine_name}吗？`, '删除物理机', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        if (confirm === 'confirm') {
          const res = await this.$ajax.delete(DELETE_MACHINE, '', [id])
          this.$message({
            message: '物理机删除成功',
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
