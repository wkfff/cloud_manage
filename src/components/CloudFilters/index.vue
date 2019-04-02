<!--
  @author:  Daniel
  @date:    2019-01-15
  @desc:    filter组件
  @require:
-->
<template>
  <div class="cloud-filters">
    <div class="left">
      <template v-for="(item,key) in buttonProps">
        <el-button
          v-permission="item.permission"
          :key="key + 'buttonProp'" :type="item.type"
          :icon="item.icon"
          :disabled="item.disabled"
          class="btn-primary"
          @click="handleButtonClick(item.onClick)"
        > {{item.text}}
        </el-button>
      </template>
      <slot/>
    </div>
    <div class="right">
      <template>
        <slot name="right"/>
      </template>
      <div>
        <template v-for="(item,key) in selectProps">
          <el-select
            v-model="item.selectValue" placeholder="请选择"
            :key="key + 'selectProp'"
            class="select-simple"
            @change="handleSelectChange(item.onChange)"
          >
            <el-option
              v-for="(option,key) in item.options"
              :key="key"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-for="(item,key) in reloadProps">
          <el-button
            :key="key + 'reloadProp'" type="text"
            icon="el-icon-refresh" class="textBtn"
            @click="handleReloadClick(item.onClick)"
          />
        </template>
        <template
          v-for="(item,key) in (Object.keys(searchProps).length === 0 || !searchProps) ? [] : [searchProps]"
        >
          <el-input
            :key="key + 'searchProp'"
            :placeholder="getPlaceHolder" v-model="searchInput"
            clearable
            @clear="handleAppendClick(item.onClick)"
            @keyup.enter.native="handleAppendClick(item.onClick)"
          >
            <el-select
              v-model="getSelectValue"
              slot="prepend"
              placeholder="请选择"
              class="prepend-select"
              @change="handleChangePlaceholder($event,item)"
            >
              <el-option
                v-for="(option,key) in item.options"
                :key="key"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleAppendClick(item.onClick)"
            />
          </el-input>
        </template>
        <template v-for="(item,key) in search2Props">
          <el-input
            v-model="searchInput2"
            :key="key + 'search2Prop'"
            clearable
            placeholder="请输入关键字符"
            @clear="handleAppend2Click(item.onClick)"
            @keyup.enter.native="handleAppend2Click(item.onClick)"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleAppend2Click(item.onClick)"
            />
          </el-input>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'CloudFilters',
  
  components: {},
  
  props: {
    /**
     * filter配置、主要分属性配置，事件配置
     * options: {}
     * events: {}
     */
    filterProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    const { reloadProps = [], searchProps = {}, selectProps = [], search2Props = [] } = this.filterProps
    
    return {
      // 从当前对象直接获得默认的label
      selectLabel: '',
      // 从当前对象直接获得默认的value
      selectValue: searchProps && searchProps.options && searchProps.options[0] && searchProps.options[0]['value'],
      
      // buttonProps,
      reloadProps,
      searchProps,
      selectProps,
      search2Props,
      
      // searchProps组件中间输入框的值
      searchInput: '',
      // searchProps2组件中间输入框的值
      searchInput2: ''
    }
  },
  
  computed: {
    getPlaceHolder() {
      return '请输入' + (this.selectLabel || this.searchProps.options[0]['label'] || '【哭脸】')
    },
    // getPlaceHolder() {
    //   return '请输入' + (this.selectLabel || '【哭脸】')
    // },
    
    getSelectValue: {
      get() {
        return this.selectValue || this.searchProps.options[0]['value']
      },
      set(val) {
        this.selectValue = val
      }
    },
    
    // 对buttonProps里的删除操作的禁用状态做渲染
    buttonProps() {
      return this.filterProps.buttonProps
    }
  },
  
  methods: {
    handleButtonClick(callback) {
      if (typeof callback !== 'function') {
        console.error('buttonProps传入的不是方法！')
        return false
      }
      callback()
    },
    handleReloadClick(callback) {
      if (typeof callback !== 'function') {
        console.error('reloadProps传入的不是方法！')
        return false
      }
      callback()
    },
    handleSelectChange(callback) {
      if (typeof callback !== 'function') {
        console.error('selectProps传入的不是方法！')
        return false
      }
      callback()
    },
    handleAppendClick(callback) {
      if (typeof callback !== 'function') {
        console.error('searchProps传入的不是方法！')
        return false
      }
      const params = {
        keywords: this.searchInput,
        searchWord: this.selectValue
      }
      callback(params)
    },
    handleAppend2Click(callback) {
      if (typeof callback !== 'function') {
        console.error('search2Props传入的不是方法！')
        return false
      }
      const params = {
        keywords: this.searchInput2
      }
      callback(params)
    },
    handleChangePlaceholder(event, item) {
      const { options } = item
      this.selectLabel = options.filter(v => v.value === event)[0].label
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cloud-filters {
  font-size: 0;
  height: 36px;
  line-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
  }
  .right {
    display: flex;
  }
  .select-simple /deep/ .el-input__inner {
    width: 105px;
    height: 36px !important;
  }
  /deep/ .el-input-group {
    width: 330px;
    float: right;
    margin-right: 10px;
  }
  .prepend-select /deep/ .el-input__inner {
    width: 105px;
  }
  /deep/ .el-input-group__append button.el-button {
    width: 36px;
    border: 1px solid #409EFF;
    background: #409EFF !important;
    i {
      color: white;
      margin-left: -7px;
      font-size: 14px;
    }
  }
  .textBtn {
    font-size: 20px !important;
    font-weight: bolder !important;
    float: right;
    // margin-left: 10px;
    padding: 7px 0;
  }
  .select-simple {
    margin-right: 10px;
  }
  /deep/ .el-input-group__append, /deep/ .el-input-group__prepend {
    background: white;
  }
  .btn-primary {
    margin-right: 10px !important;
    margin-left: 0 !important;
  }
}
</style>
