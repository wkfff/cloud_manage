<!--
  @author:  lzc
  @date:    2019-01-15
  @desc:    table组件
  @require:
-->
<template>
  <div class="cloud-table">
    <el-table
      v-loading.lock="loading"
      ref="table"
      :data="tableConfig.tableData || showTableData"
      :default-sort="tableConfig.defaultSort"
      stripe
      v-bind="tableConfig.options"
      v-on="tableConfig.events"
      class="table"
      element-loading-text="加载中..."
      @sort-change="sortChange"
    >
      <!--多选表格，配置 tableConfig.options.hasSelection-->
      <el-table-column
        v-if="tableConfig.hasSelection"
        :selectable="checkSelectable"
        type="selection"
        width="50"/>
      
      <!--单选表格 配置tableConfig.options.hasRadioSelection-->
      <el-table-column
        v-if="tableConfig.hasRadioSelection"
        width="50">
        <div slot-scope="scope">
          <el-radio
            v-model="radioVal"
            :label="scope.row.id"/>&nbsp;
        </div>
      </el-table-column>
      
      <!--table列-->
      <template v-for="(column, columnIndex) in columnConfig">
        <GenerateTableColumn
          :column="column"
          :key="columnIndex"
          :sort="sort"
          @filter-change="val => filterChange(val, column)"
        />
      </template>
      
      <!--table空值显示-->
      <div slot="empty">
        <div class="empty-icon">
          <svg-icon icon-class="empty_data"/>
        </div>
        <p class="empty-text">没有数据哦</p>
      </div>
    </el-table>
    <div
      v-if="!tableConfig.hidePagination"
      class="pagination-box">
      <el-pagination
        :current-page.sync="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="pagerCount"
        @size-change="sizeChange"
        @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import GenerateTableColumn from './GenerateTableColumn'
import { cloneDeep, isArray } from 'lodash'

export default {
  name: 'CloudTable',
  
  components: {
    GenerateTableColumn
  },
  
  props: {
    /**
     * table配置、主要分属性配置，事件配置
     * options: {}
     * events: {}
     */
    tableConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    
    fetchConfig: {
      type: Object,
      default: () => {
        return {}
      }
    },
    
    columnConfig: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  
  data() {
    return {
      tableData: [], // 表格数据
      sort_field: null,
      sort_order: null,
      page: 1, // 页码
      pageSize: this.tableConfig.pageSize || 10, // 每页条数
      total: 0, // 总条数
      radioVal: '', // 单选框值
      loading: false,
      sort: null,
      pagerCount: this.tableConfig.pagerCount || 7
    }
  },
  
  computed: {
    showTableData() {
      if (this.fetchConfig && this.fetchConfig.customData && isArray(this.fetchConfig.customData)) {
        this.$set(this, 'total', this.fetchConfig.customData.length)
        const start = (this.page - 1) * this.pageSize
        const end = this.page * this.pageSize
        return this.fetchConfig.customData.slice(start, end)
      } else {
        return this.tableData
      }
    }
  },
  
  created() {
    this.__getTableData()
  },
  
  methods: {
    /**
     * 获取table数据
     * @param type {String}
     * @return {Promise<void>}
     * @private
     */
    async __getTableData(type, notLoading) {
      try {
        const fetchConfig = cloneDeep(this.fetchConfig)
        if (fetchConfig && fetchConfig.url) {
          fetchConfig.method = fetchConfig.method || 'GET'
          fetchConfig.data = fetchConfig.data || {}
          
          // 页数处理
          if (type === 'page') { // 当传page时，留在当前页
            fetchConfig.data.page = this.page
          } else {
            fetchConfig.data.page = 1
            this.page = 1
          }
          
          // 页码
          fetchConfig.data.pageSize = this.pageSize || 999999
          
          // 排序
          if (this.sort_field) fetchConfig.data.sort_field = this.sort_field
          if (this.sort_order) fetchConfig.data.sort_order = this.sort_order
          
          this.loading = !notLoading
          
          const res = await this.$ajax.fetch(fetchConfig)
          
          const { list, total } = res.data
          
          // 自定义格式数据
          this.tableData = typeof this.fetchConfig.formatData === 'function'
            ? this.fetchConfig.formatData(res.data) || list
            : list
          
          this.total = total
          this.$emit('getTableData', list)
          this.$emit('ajaxData', res.data)
  
          !notLoading && window.setTimeout(() => {
            this.loading = false
          }, 200)
        }
        
        if (fetchConfig && fetchConfig.customData && isArray(fetchConfig.customData)) {
          this.total = fetchConfig.customData.length
          const start = (this.page - 1) * this.pageSize
          const end = this.page * this.pageSize
          this.tableData = fetchConfig.customData.slice(start, end)
        }
      } catch (e) {
        this.loading = false
        console.error(e)
      }
    },
    
    /**
     * 头部筛选
     * @param value
     * @param column
     */
    filterChange(value, { prop, filterProp, filterMethod }) {
      const custom = typeof filterMethod === 'function' && filterMethod(value)
      const val = custom || value.join(',')
      const p = filterProp || prop
      if (this.fetchConfig.data[p] !== val) {
        // 设置查询参数值
        this.fetchConfig.data[p] = val
        this.__getTableData()
      }
    },
    
    /**
     * 改变每页页数大小
     * @param size
     */
    sizeChange(size) {
      this.pageSize = size
      this.__getTableData()
    },
    
    /**
     * 点击分页
     * @param page
     */
    pageChange(page) {
      this.page = page
      this.__getTableData('page')
    },
    
    /**
     * 排序
     * @param prop {String} 排序字段
     * @param order {String} 排序方式
     */
    sortChange(sort) {
      const { prop, order } = sort
      this.sort = sort
      if (order) {
        this.sort_field = prop
        this.sort_order = order === 'ascending' ? 'ascend' : 'descend'
      } else {
        this.sort_field = null
        this.sort_order = null
      }
      this.__getTableData()
    },
    
    /**
     * 更新列表
     * @param type
     * @param notLoading {Boolean} 为true时，不会出现loading效果，用于自动更新列表等
     */
    updateTable(type, notLoading) {
      this.__getTableData(type, notLoading)
    },
    
    /**
     * 自定义设置列表数据
     * @param data
     */
    setTableData(data) {
      if (isArray(data)) {
        this.tableData = data
      }
    },
    
    /**
     * 获取列表数据
     * @return {*}
     */
    getTableData() {
      return this.tableData
    },
    
    /**
     * 有checkbox时，设置某些行不能选择，不设置默认全部能选择
     * @param args
     * @return {*}
     */
    checkSelectable(...args) {
      if (this.tableConfig && this.tableConfig.events && this.tableConfig.events.selectable && typeof this.tableConfig.events.selectable === 'function') {
        return this.tableConfig.events.selectable(...args)
      } else {
        return true
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cloud-table {
  padding-top: 20px;
  .pagination-box {
    padding: 20px;
    text-align: right;
  }
  .empty-icon {
    padding: 15px 0;
    padding-bottom: 0;
    font-size: 48px;
    font-weight: 600;
    color: $textLevelD;
  }
  .empty-text {
    margin-top: 0;
    padding-bottom: 20px;
    line-height: 20px;
  }
  /deep/ .el-checkbox__input.is-disabled .el-checkbox__inner {
    width: 5px;
    height: 0;
    border: 0;
    border-top: 1px solid $textLevelB;
  }
  // 隐藏原有排序图标
  /deep/ .el-table .caret-wrapper {
    display: none;
    width: 0;
    height: 0;
  }
}
</style>
