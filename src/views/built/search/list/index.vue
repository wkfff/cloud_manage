<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    xx
  @require:
-->
<template>
  <div class="search-list">
    <StatusCard
      v-model="fetchConfig.data.order_type"
      :fields="statusFields"
      @update="search"
    />
    
    <div class="list-box">
      <CloudFilters :filterProps="filterProps">
        <DateSelect
          @change="changeDate"
        />
      </CloudFilters>
      <CloudTable
        ref="listTable"
        :column-config="columnConfig"
        :fetch-config="fetchConfig"
      />
    </div>
    
    <!--重新执行-->
    <RestartExecute
      v-model="visible"
      :row="rowData"
    />
    
    <!--联系值班管理员-->
    <ContactAdministrator
      v-model="contactVisible"
      :row="rowData"
    />
  </div>
</template>

<script type="text/jsx">
import StatusCard from './components/StatusCard'
import CloudTable from '@/components/CloudTable'
import CloudFilters from '@/components/CloudFilters'
import RestartExecute from './components/RestartExecute'
import DateSelect from './components/DateSelect'
import ContactAdministrator from './components/ContactAdministrator'
import { BUILT } from '@/utils/constant'
import { mapMutations } from 'vuex'
import {
  GET_SHEET_LIST,
  DELETE_SHEET,
  GET_SHEET_COUNT
} from '@/api/worksheet'

export default {
  name: 'SheetSearch',
  
  components: {
    StatusCard,
    CloudTable,
    CloudFilters,
    RestartExecute,
    DateSelect,
    ContactAdministrator
  },
  
  props: {},
  
  data() {
    const filterProps = {
      buttonProps: [],
      reloadProps: [
        {
          onClick: this.search.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '订单编号', value: 'order_no' },
          { label: '订单标题', value: 'work_order_name' },
          { label: '提单人/工号', value: 'user_name' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    return {
      fetchConfig: {
        data: {
          order_type: 'unfinish',
          pickerTime: ''
        }
      },
      filterProps,
      visible: false,
      contactVisible: false,
      rowData: null,
      timer: null,
      count: {}
    }
  },
  
  computed: {
    /**
     * 状态
     * @return {*[]}
     */
    statusFields() {
      return [
        {
          label: '未完成订单',
          value: this.count.unfinish || 0,
          status: 'unfinish'
        },
        {
          label: '已完成订单',
          value: this.count.finish || 0,
          status: 'finish'
        },
        {
          label: '全部订单',
          value: this.count.all || 0,
          status: ''
        }
      ]
    },
    
    /**
     * 列表
     * @return {*}
     */
    columnConfig() {
      return [
        {
          label: '订单编号',
          prop: 'order_no',
          'min-width': 120,
          render(h, { row }) {
            const route = {
              path: `/built/search/detail/overview/${row.id}`
            }
            return (
              row.status === 1
                ? <span>{ row.order_no || '-' }</span>
                : (
                  <router-link to={ route }>
                    <span class="text-active">{ row.order_no || '-' }</span>
                  </router-link>
                )
            )
          }
        },
        {
          label: '产品/服务',
          prop: 'product_name',
          'min-width': 100
        },
        {
          label: '类型',
          prop: ''
        },
        {
          label: '数量',
          prop: ''
        },
        {
          label: '提单人/工号',
          prop: 'user_name',
          'min-width': 100
        },
        {
          label: '订单状态',
          prop: 'status',
          filterHead: true,
          columnFilters: BUILT.STATUS,
          render(h, { row }) {
            return (
              <span
                class={ `${BUILT.STATUS_COLOR[row.status]} point` }>
                { BUILT.STATUS[row.status] }
              </span>
            )
          }
        },
        {
          label: '部署状态',
          prop: 'execute_status',
          filterHead: true,
          columnFilters: BUILT.EXECUTE_STATUS,
          render(h, { row }) {
            return (
              <span
                class={ `${BUILT.EXECUTE_STATUS_COLOR[row.execute_status]} point` }>
                { BUILT.EXECUTE_STATUS[row.execute_status] }
              </span>
            )
          }
        },
        {
          label: '提单时间',
          prop: 'created_at'
        },
        {
          label: '操作',
          'min-width': 120, // 230
          fixed: 'right',
          render: (h, { row }) => {
            const route = { path: `/built/search/detail/overview/${row.id}` }
            
            // 未提交状态
            const unfinished = (
              <div>
                <el-button
                  type="text"
                  class="text-active"
                  onClick={ this.continueSheet.bind(this, row) }
                >继续填单
                </el-button>
                
                <el-button
                  type="text"
                  class="text-error"
                  onClick={ this.deleteSheet.bind(this, row) }
                >删除
                </el-button>
              </div>
            )
            // 查看详情
            const checkDetail = (
              <router-link to={ route }>
                <span class="text-active">查看详情</span>
              </router-link>
            )
            
            // 执行失败 状态
            const executeFail = (
              <div>
                <el-button
                  type="text"
                  class="text-active"
                  onClick={ this.restartExecute.bind(this, row) }
                >重新部署
                </el-button>
                <el-button
                  type="text"
                  class="text-active"
                  onClick={ this.contactAdministrator.bind(this, row) }
                >联系DBA
                </el-button>
                { checkDetail }
              </div>
            )
            return (
              <div>
                {
                  row.status === 1
                    ? unfinished
                    : <div>{ row.execute_status === 3 ? executeFail : checkDetail }</div>
                }
              </div>
            )
          }
        }
      ]
    }
  },
  
  destroyed() {
    if (this.timer) {
      window.clearInterval(this.timer)
      this.timer = null
    }
  },
  
  methods: {
    ...mapMutations('worksheet', [
      'UPDATE_WORKSHEET',
      'UPDATE_WORKSHEET_FORMDATA',
      'UPDATE_ITEMS'
    ]),
    
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    },
    
    search(type, ontLoading) {
      this.$refs.listTable && this.$refs.listTable.updateTable(type, ontLoading)
    },
    
    async __getCount() {
      try {
        const res = await this.$ajax.get(GET_SHEET_COUNT)
        this.count = res.data || {}
      } catch (e) {
        console.error(e)
      }
    },
    
    /**
     * 删除订单
     * @param row
     * @return {Promise<void>}
     */
    async deleteSheet(row) {
      try {
        const isDel = await this.$confirm(`确定删除该订单？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        
        if (isDel === 'confirm') {
          await this.$ajax.delete(DELETE_SHEET, '', [row.id])
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.search('page')
        }
      } catch (e) {
        console.error(e)
      }
    },
    
    /**
     * 继续配置
     * @param row
     * @return {Promise<void>}
     */
    async continueSheet(row) {
      this.$router.push('/built/create/mysql')
    },
    /**
     * 重新执行
     * @param row
     */
    restartExecute(row) {
      this.rowData = row
      this.visible = true
    },
    /**
     * 日期选择
     * @param val
     */
    changeDate(val) {
      this.fetchConfig.data.pickerTime = val ? val.join(',') : null
      this.search()
    },
    /**
     * 联系值班人
     * @param row
     */
    contactAdministrator(row) {
      this.rowData = row
      this.contactVisible = true
    }
  }
  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.search-list {
  margin: 20px;
  .list-box {
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
  }
}
</style>
