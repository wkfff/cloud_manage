<!--
  @author:  lzc
  @date:    2018-11-30
  @desc:    表格头部排序
  @require:
-->
<template>
  <div
    class="box"
    @click="toggleIcon">
    <span>{{ column.label }}</span>
    <span style="cursor: pointer; margin-left: 2px;">
      <svg-icon
        :icon-class="statusClass"
        class="icon"
      />
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'SortTableHead',
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
  },
  data() {
    return {
      flag: false
    }
  },
  computed: {
    statusClass() {
      let status = 'ic_none_sort'
      console.log(this.sort)
      if (this.sort) {
        const { prop = '', order = '' } = this.sort
        if (order === 'descending' && prop === this.column.prop) status = 'ic_table_desc'
        if (order === 'ascending' && prop === this.column.prop) status = 'ic_table_aesc'
      }
      return status
    }
  },
  methods: {
    toggleIcon() {
      this.flag = !this.flag
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  line-height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  .text {
    padding: 0;
  }
  .icon {
    cursor: pointer;
  }
  /*.popover{
    display: flex;
    align-items: center;
  }*/
}
</style>

