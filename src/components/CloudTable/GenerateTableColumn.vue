<!--
  @author:  lzc
  @date:    2019-02-19
  @file:    生成table列组件
  @require:
-->
<template>
  <el-table-column
    v-bind="column"
    :align="column.align || 'left'"
    :show-overflow-tooltip="typeof column['show-overflow-tooltip'] !== 'undefined' ? column['show-overflow-tooltip'] : (column.label !== '操作')"
  >
    
    <!--自定义筛选的头部-->
    <template
      v-if="column.filterHead"
      slot-scope="scope"
      :slot="column.filterHead ? 'header' : 'none'">
      <FilterTableHead
        :column="column"
        :title-text="column.label"
        @filter-change="val => $emit('filter-change', val)"/>
    </template>
    
    <!--自定义排序头部样式-->
    <template
      v-if="column.sortable"
      :slot="column.sortable ? 'header' : 'none'"
      slot-scope="scope"
    >
      <SortTableHead
        :column="column"
        :sort="sort"
      />
    </template>
    
    <!--列表内容-->
    <div slot-scope="scope">
      <!--filter方式渲染-->
      <div
        v-if="column.filter"
        class="cell-text">
        {{ constructor.filter(column['filter'])(scope.row[column.prop]) }}
      </div>
      
      <!--slot方式渲染-->
      <div
        v-else-if="column.slotName"
        class="cell-text">
        <slot
          :name="column.slotName"
          :row="scope.row"
          :$index="scope.$index"/>
      </div>
      
      <!--JSX方式渲染-->
      <template v-else-if="column.render">
        <div
          :class="[column.label === '操作' ? 'handle-column' : '']"
          class="cell-text">
          <JsxRender
            :row="scope.row"
            :render="column.render"
            :index="scope.$index"/>
        </div>
      </template>
      
      <!--默认显示对应属性值-->
      <div
        v-else
        class="cell-text">
        {{
        typeof scope.row[column.prop] === 'number'
        ? (scope.row[column.prop] || 0)
        : (scope.row[column.prop] || '-')
        }}
      </div>
    </div>
    
    <!--多级表头递归生成-->
    <template
      v-if="column.children && column.children.length > 0"
      v-for="(col, colIndex) in column.children">
      <GenerateTableColumn
        :column="col"
        :key="colIndex"
      />
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
import JsxRender from './JsxRender'
import FilterTableHead from './FilterTableHead'
import SortTableHead from './SortTableHead'

export default {
  name: 'GenerateTableColumn',
  
  components: {
    JsxRender,
    FilterTableHead,
    SortTableHead
  },
  
  props: {
    column: {
      type: Object,
      required: true
    },
    sort: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
