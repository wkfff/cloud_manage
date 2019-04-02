<!--
  @author:  lzc
  @date:    2019-01-16
  @desc:    table头部筛选
  @require:
-->
<template>
  <div class="drop-box">
    <div class="text">{{ titleText }}</div>
    <el-dropdown
      ref="messageDrop"
      :hide-on-click="false"
      trigger="click"
      placement="bottom"
      class="drop"
      @visible-change="changeDrop"
    >
      <span class="drop-icon">
        <svg-icon
          :style="{color: checked.length ? '#409EFF' : '#333'}"
          icon-class="ic_filter"
          class="icon"/>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-checkbox-group
          v-model="checked"
          size="mini"
          class="drop-down-box"
        >
          <el-dropdown-item
            v-for="(item, index) in filterDropData"
            :key="index"
            :style="{'background-color': checked.includes(item.code) ? '#eef9fe' : ''}">
            <el-checkbox
              :label="item.code"
              :key="item.code">{{ item.value }}
            </el-checkbox>
          </el-dropdown-item>
        </el-checkbox-group>
        <div class="foot">
          <el-button
            type="text"
            class="btn"
            @click="confirm"
          >确认
          </el-button>
          <el-button
            type="text"
            class="btn"
            @click="reset"
          >重置
          </el-button>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
import { isArray } from 'lodash'

export default {
  name: 'FilterTableHead',
  
  props: {
    column: {
      type: Object,
      required: true
    },
    titleText: {
      type: String,
      required: true
    }
  },
  
  data() {
    return {
      checked: [],
      oldChecked: [],
      filterDropData: []
    }
  },
  
  watch: {
    checked(newVal, oldVal) {
      this.oldChecked = oldVal
    }
  },
  
  created() {
    this.getFilters()
  },
  
  methods: {
    /**
     * 确定选择
     */
    confirm() {
      this.$refs.messageDrop.hide()
    },
    
    /**
     * 重置
     */
    reset() {
      this.checked = []
      this.$refs.messageDrop.hide()
    },
    
    /**
     * 显示状态改变
     * @param show {Boolean} true：显示 false: 隐藏
     */
    changeDrop(show) {
      if (!show) {
        if (`${this.checked}` !== `${this.oldChecked}`) {
          this.$emit('filter-change', this.checked)
        }
      }
    },
    
    /**
     * 下拉选择数据
     * @return {Promise<void>}
     */
    async getFilters() {
      try {
        const { columnFilters, filterFetch } = this.column
        // 普通数组类似定义，例如 [{code, value}]
        if (columnFilters && isArray(columnFilters)) {
          this.filterDropData = columnFilters
        }
        // 对象方式定义 {key: value}
        if (columnFilters && Object.prototype.toString.call(columnFilters) === '[object Object]') {
          this.filterDropData = []
          Object.keys(columnFilters).forEach(key => {
            this.filterDropData.push({
              code: key,
              value: columnFilters[key]
            })
          })
        }
        // 远程请求数据，如需自定义返回，columnFilters 回调，接受参数为请求回来的数据
        if (filterFetch) {
          filterFetch.method = filterFetch.method || 'GET'
          const res = await this.$ajax.fetch(filterFetch)
          if (res.data && isArray(res.data)) {
            const filter = []
            let customFilter = []
            // 如果配置 columnFilters 为函数，回调处理筛选格式
            if (columnFilters && typeof columnFilters === 'function') {
              customFilter = columnFilters(res.data)
            } else {
              res.data.forEach(item => {
                const { name, id } = item
                filter.push({
                  code: id,
                  value: name
                })
              })
            }
            this.filterDropData = customFilter.length ? customFilter : filter
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.drop-box {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  padding: 0;
  .text{
    width: auto;
    min-width: auto;
    padding: 0;
    overflow: inherit;
    white-space: normal;
    text-overflow: inherit;
  }
  .drop {
    height: 20px;
    width: 14px;
    min-width: 14px;
    line-height: 20px;
    padding: 0;
    margin-left: 4px;
    display: flex;
    align-items: center;
    .drop-icon {
      cursor: pointer;
      outline: none;
    }
  }
}
.drop-down-box{
  /deep/ .el-checkbox__label{
    font-weight: 500;
  }
}
.foot {
  border-top: 1px solid #EAEDF1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btn {
    font-size: 12px;
    padding: 10px 15px;
    &:last-child {
      margin-left: 0;
    }
  }
}
</style>
