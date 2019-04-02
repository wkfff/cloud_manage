<template>
  <div class="app-container">
    <!-- <div class="count-box">
      <span class="text">待您处理</span>
      <span class="value-text text-warn">{{ sheetCount.waitToDeal || 0 }}</span>
      
      <span class="text">处理中</span>
      <span class="value-text text-active">{{ sheetCount.dealing || 0 }}</span>
      
      <span class="text">全部工单</span>
      <span class="value-text text-active">{{ sheetCount.all || 0 }}</span>
    </div> -->
    
    <CloudFilters :filterProps="filterProps">
      <div
        style="margin-right: 10px"
        slot="right">
        <DateSelect
          @change="changeDate"
        />
      </div>
    </CloudFilters>
    
    <CloudTable
      ref="listTable"
      :column-config="columnConfig"
      :fetch-config="fetchConfig"
    />
    
    <!--审批弹出框-->
    <ApprovalDialog
      v-model="visible"
      :current-row="currentRow"
      @success="handleSearch"
    />
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import DateSelect from './components/DateSelect'
import ApprovalDialog from './components/ApprovalDialog'
import TableMixin from '@/components/CloudTable/TableMixin'
import CloudFilters from '@/components/CloudFilters'
import { GET_DICTIONARY } from '@/api/common'
import { GET_WORKSHEET_LIST, GET_WORKSHEET_COUNT } from '@/api/worksheet'
import { WORKSHEET } from '@/utils/constant'

export default {
  name: 'worksheet',
  
  components: {
    CloudTable,
    CloudFilters,
    DateSelect,
    ApprovalDialog
  },
  
  mixins: [TableMixin],
  
  data() {
    const filterProps = {
      buttonProps: [
        {
          text: '新建工单',
          type: 'primary',
          icon: 'el-icon-plus',
          permission: 'mysql_apply_create',
          onClick: this.forwardSheetCreate.bind(this)
        }
      ],
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '工单编号', value: 'apply_no' },
          { label: '工单描述', value: 'apply_desc' },
          { label: '提单用户', value: 'user_name' },
          { label: '产品/服务', value: 'product_name' },
          { label: '运维类型', value: 'handle_type_name' },
          { label: '简要描述', value: 'description' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_WORKSHEET_LIST,
      data: {
        machine_type: 1,
        pickerTime: null
      }
    }
    return {
      fetchConfig,
      filterProps,
      currentRow: null,
      visible: false,
      sheetCount: {},
      product: {}
    }
  },
  
  computed: {
    columnConfig() {
      return [
        {
          label: '工单编号',
          prop: 'order_no',
          render(h, { row }) {
            return (
              <router-link to={ { path: `/maintenance/sheet/detail/${row.id}` } }>
                <el-button type="text" class="text-active">{ row.order_no }</el-button>
              </router-link>
            )
          }
        },
        {
          label: '提单用户/工号',
          prop: 'user_name'
        },
        {
          label: '产品/服务',
          prop: 'product_name',
          filterProp: 'product',
          filterHead: true,
          columnFilters: WORKSHEET.PRODUCT_TYPE
        },
        {
          label: '运维类型',
          prop: 'handle_type_name',
          filterProp: 'handle_type',
          filterHead: true,
          columnFilters: WORKSHEET.HANDLE_TYPE
        },
        {
          label: '工单类型',
          prop: 'priority',
          filterHead: true,
          columnFilters: WORKSHEET.PRIORITY,
          render(h, { row }) {
            return (
              <span>{ WORKSHEET.PRIORITY[row.priority] }</span>
            )
          }
        },
        {
          label: '简要描述',
          prop: 'description'
        },
        {
          label: '处理状态',
          prop: 'status',
          filterHead: true,
          columnFilters: WORKSHEET.STATUS,
          render: (h, { row }) => {
            return (
              <span
                class={ `${WORKSHEET.STATUS_COLOR[row.status]} point` }>{ WORKSHEET.STATUS[row.status] }</span>
            )
          }
        },
        {
          label: '提单时间',
          prop: 'created_at',
          sortable: 'custom'
        },
        {
          label: '操作',
          render: (h, { row }) => {
            return (
              <div>
                <router-link to={ { path: `/maintenance/sheet/detail/${row.id}` } }>
                  <el-button type="text">查看详情</el-button>
                </router-link>
              </div>
            )
          }
        }
      ]
    }
  },
  
  created() {
    this.__getWorkSheetCount()
    this.__getAllProduct()
  },
  
  methods: {
    async __getWorkSheetCount() {
      try {
        const res = await this.$ajax.get(GET_WORKSHEET_COUNT)
        this.sheetCount = res.data || {}
      } catch (e) {
        console.error(e)
      }
    },
    
    async __getAllProduct() {
      try {
        const res = await this.$ajax.get(GET_DICTIONARY, { type: 'product' })
        console.log(res)
        this.product = {}
        res.data && res.data.forEach(item => {
          const { id, name } = item
          this.product[id] = name
        })
        this.product = res.data || {}
      } catch (e) {
        console.error(e)
      }
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
    changeDate(val) {
      console.log(val)
      this.fetchConfig.data.pickerTime = val ? val.join(',') : null
      this.handleSearch()
    },
    approvalSheet(row) {
      this.currentRow = row
      this.visible = true
    },
    forwardSheetCreate() {
      this.$router.push('/maintenance/sheet/create')
    }
  }
}
</script>
<style lang="scss">
// .count-box {
//   display: flex;
//   align-items: center;
//   padding: 20px 0;
//   font-size: 14px;
//   .text {
//     display: inline-block;
//     font-weight: 600;
//     color: $textLevelC;
//   }
//   .value-text {
//     display: inline-block;
//     padding: 0 20px;
//   }
// }
</style>
