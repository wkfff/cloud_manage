<!--
  @author:  lzc
  @date:    2019-02-12
  @file:    树形穿梭框
  @require:
-->
<template>
  <div
    :style="{width, height}"
    class="transfer-wrapper"
  >
    <!--左侧数据源框-->
    <div class="transfer-left">
      <!--标题头部-->
      <div class="transfer-title">
        <el-checkbox
          v-model="fromCheckAll"
          :indeterminate="fromIsIndeterminate"
          @change='fromAllCheckboxChange'/>
        <span>{{ title[0] }}</span>
      </div>
      <!-- 内容区 -->
      <div class="transfer-main">
        <el-input
          v-if="filter"
          v-model="fromFilterStr"
          :placeholder="placeholder"
          size="small"
          class="filter-tree"/>
        <el-tree
          ref='fromTree'
          :data="fromTreeData"
          :node-key="fromTreeOptions.nodeKey || 'id'"
          v-bind="fromTreeOptions"
          show-checkbox
          @check='fromTreeChecked'
        />
        <slot name="left-footer"></slot>
      </div>
    </div>
    
    <!--穿梭区 按钮框-->
    <div class="transfer-center">
      <template v-if='buttonTexts.length'>
        <div class="transfer-center-item">
          <el-button
            :disabled="!fromCheckedKeys.length"
            icon="el-icon-arrow-right"
            type="primary"
            @click="addToTarget">
            {{ buttonTexts[0] }}
          </el-button>
        </div>
        <div class="transfer-center-item">
          <el-button
            :disabled="!toCheckedKeys.length"
            type="primary"
            @click='removeToSource'
            icon="el-icon-arrow-left">
            {{ buttonTexts[1] }}
          </el-button>
        </div>
      </template>
      <template v-else>
        <div class="transfer-center-item">
          <el-button
            :disabled="!fromCheckedKeys.length"
            circle
            type="primary"
            icon="el-icon-arrow-right"
            @click="addToTarget"/>
        </div>
        <div class="transfer-center-item">
          <el-button
            :disabled="!toCheckedKeys.length"
            circle
            type="primary"
            icon="el-icon-arrow-left"
            @click="removeToSource"/>
        </div>
      </template>
    </div>
    
    <!--右侧目标框-->
    <div class="transfer-right">
      <!--标题头部-->
      <div class="transfer-title">
        <el-checkbox
          v-model="toCheckAll"
          :indeterminate="toIsIndeterminate"
          @change='toAllCheckboxChange'/>
        <span>{{ title[1] }}</span>
      </div>
      <!-- 内容区 -->
      <div class="transfer-main">
        <el-input
          v-if="filter"
          v-model="fromFilterStr"
          :placeholder="placeholder"
          size="small"
          class="filter-tree"/>
        <el-tree
          ref='toTree'
          :data="toTreeData"
          :node-key="fromTreeOptions.nodeKey || 'id'"
          v-bind="toTreeOptions"
          show-checkbox
          @check='toTreeChecked'
        />
        <slot name="left-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { cloneDeep } from 'lodash'

export default {
  name: 'CloudTreeTransfer',
  
  components: {},
  
  model: {
    prop: 'value',
    event: 'change'
  },
  
  props: {
    // 数据源
    data: {
      type: Array,
      required: true
    },
    // 选中的值
    value: {
      type: Array,
      required: true
    },
    // 宽度
    width: {
      type: String,
      default: '100%'
    },
    // 高度
    height: {
      type: String,
      default: '320px'
    },
    // 标题
    title: {
      type: Array,
      default: () => ['源列表', '目标列表']
    },
    // 是否启用筛选
    filter: {
      type: Boolean,
      default: false
    },
    // 筛选placeholder
    placeholder: {
      type: String,
      default: '输入关键字进行过滤'
    },
    buttonTexts: {
      type: Array,
      default: () => []
    },
    // 源表树形element配置属性
    fromTreeOptions: {
      type: Object,
      default: () => {
        return {}
      }
    },
    toTreeOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      fromCheckAll: false, // 源是否选中所有
      fromIsIndeterminate: false, // 源是否处于半选中状态
      fromFilterStr: '', // 源查询字符
      fromCheckedKeys: [], // 源选中的node
      fromSelectionsNode: [],
      
      toCheckAll: false,
      toIsIndeterminate: false,
      toTreeData: [],
      toCheckedKeys: []
    }
  },
  
  computed: {
    fromTreeData() {
      this.data.forEach((item, i) => {
        item.pid = 0
        item.sid = this.data[i + 1] ? this.data[i + 1].id : 99999
        if (item.children.length) {
          this.__setNodePid(item.children, item.id)
        }
      })
      console.log('处理之后的数据', this.data)
      return this.data
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    /**
     * 左侧头部CheckBox选择
     */
    fromAllCheckboxChange() {
      this.toTreeData = this.fromSelectionsNode.halfCheckedNodes[0]
    },
    
    /**
     * 左侧树形CheckBox选择
     * @param node
     * @param data
     */
    fromTreeChecked(node, data) {
      this.fromSelectionsNode = data
      this.fromCheckedKeys = data.checkedKeys || []
      console.log(node)
      console.log(data)
    },
    
    /**
     * 添加目标
     */
    addToTarget() {
      const checkedNodes = this.$refs.fromTree.getCheckedNodes()
      const halfCheckedNodes = cloneDeep(this.$refs.fromTree.getHalfCheckedNodes())
      
      // 半选中状态的节点，骨架节点
      const newHalfCheckedNodes = []
      halfCheckedNodes.forEach(item => {
        if (!this.__isExistNode(item)) {
          newHalfCheckedNodes.push(item)
        }
      })
      newHalfCheckedNodes.forEach(node => {
        node.children = []
        // const siblingNode = this.$refs.toTree.getNode(node.sid)
        if (node.pid === 0) {
          /* siblingNode
           ? this.$refs.toTree.insertBefore(node, node.sid)
           : this.$refs.toTree.append(node) */
          this.$refs.toTree.append(node)
        } else {
          this.$refs.toTree.append(node, node.pid)
          // this.$refs.toTree.insertBefore(node, node.sid)
        }
      })
      
      // 非末端全选节点
      const newCheckedNodes = []
      cloneDeep(checkedNodes).forEach(item => {
        !this.__isExistNode(item) && newCheckedNodes.push(item)
      })
      newCheckedNodes.forEach(item => {
        if (item.children && item.children.length) {
          item.children = []
          this.$refs.toTree.append(item, item.pid)
        }
      })
      
      // 末端全选节点
      const leafCheckedNodes = cloneDeep(checkedNodes).filter(item => {
        // 删除左侧选中的数据
        this.$refs.fromTree.remove(item)
        return !item.children || (item.children && !item.children.length)
      })
      leafCheckedNodes.forEach(item => {
        !this.__isExistNode(item) && this.$refs.toTree.append(item, item.pid)
      })
      // 移动到目标按钮恢复禁用状态
      this.fromCheckedKeys = []
    },
    
    /**
     * 移除目标
     */
    removeToSource() {
      const checkedNodes = this.$refs.toTree.getCheckedNodes()
      const halfCheckedNodes = cloneDeep(this.$refs.toTree.getHalfCheckedNodes())
      
      // 半选中状态的节点，骨架节点
      const newHalfCheckedNodes = []
      halfCheckedNodes.forEach(item => {
        if (!this.__isExistNode(item, this.fromTreeData)) {
          newHalfCheckedNodes.push(item)
        }
      })
      newHalfCheckedNodes.forEach(node => {
        node.children = []
        if (node.pid === 0) {
          this.$refs.fromTree.append(node)
        } else {
          this.$refs.fromTree.append(node, node.pid)
        }
      })
      
      // 非末端全选节点
      const newCheckedNodes = []
      cloneDeep(checkedNodes).forEach(item => {
        !this.__isExistNode(item, this.fromTreeData) && newCheckedNodes.push(item)
      })
      newCheckedNodes.forEach(item => {
        if (item.children && item.children.length) {
          item.children = []
          this.$refs.fromTree.append(item, item.pid)
        }
      })
      
      // 末端全选节点
      const leafCheckedNodes = cloneDeep(checkedNodes).filter(item => {
        // 删除右侧选中的数据
        this.$refs.toTree.remove(item)
        return !item.children || (item.children && !item.children.length)
      })
      leafCheckedNodes.forEach(item => {
        !this.__isExistNode(item, this.fromTreeData) && this.$refs.fromTree.append(item, item.pid)
      })
      // 移动到目标按钮恢复禁用状态
      this.fromCheckedKeys = []
    },
    
    toAllCheckboxChange() {
    
    },
    
    toTreeChecked(node, data) {
      this.toCheckedKeys = data.checkedKeys || []
    },
    
    __setNodePid(data, pid) {
      data.forEach((item, i) => {
        item.pid = pid
        item.sid = data[i + 1] ? data[i + 1].id : 99999
        if (item.children && item.children.length) this.__setNodePid(item.children, item.id)
      })
    },
    
    __isExistNode(node, data = this.toTreeData) {
      let existed = false
      for (let i = 0; i < data.length; i++) {
        if (node.id === data[i].id) {
          existed = true
          return existed
        }
        return data[i].children && data[i].children.length && this.__isExistNode(node, data[i].children)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.transfer-wrapper {
  position: relative;
  overflow: hidden;
  
  .transfer-left {
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .transfer-right {
    position: absolute;
    top: 0;
    right: 0;
  }
  
  .transfer-right-item {
    height: calc((100% - 41px) / 2);
  }
  
  .transfer-right-small {
    height: 41px;
  }
  
  .transfer-main {
    padding: 10px;
    height: calc(100% - 41px);
    box-sizing: border-box;
    overflow: auto;
  }
  
  .transfer-left,
  .transfer-right {
    border: 1px solid #ebeef5;
    width: calc((100% - 100px) / 2);
    height: 100%;
    box-sizing: border-box;
    vertical-align: middle;
  }
  
  .transfer-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  
  .transfer-center-item {
    padding: 10px;
    overflow: hidden;
  }
  
  .transfer-title {
    border-bottom: 1px solid #ebeef5;
    padding: 0 15px;
    height: 40px;
    line-height: 40px;
    color: #333;
    font-size: 16px;
    background-color: #f5f7fa;
  }
  
  .transfer-title .el-checkbox {
    margin-right: 10px;
  }
  
  .filter-tree {
    margin-bottom: 10px;
  }
}
</style>
