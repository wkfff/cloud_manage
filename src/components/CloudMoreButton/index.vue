<!--
  @author:  lzc
  @date:    2019-01-29
  @desc:    下拉更多
  @require:
-->
<template>
  <div
    :class="[options.hasBorder ? 'has-border': '']"
    class="drop-box">
    <el-dropdown
      v-bind="options"
      @command="data => $emit('command', data)"
      @visible-change="data => show = data">
    <button
      :disabled="options.disabled"
      :class="[options.disabled ? 'disabled' : '']"
      class="el-dropdown-link">
      {{ titleText }}
      <i
        :class="[show ? 'active' : '']"
        class="el-icon-arrow-down el-icon--right more-btn"/>
    </button>
      <el-dropdown-menu
        slot="dropdown"
        style="min-width: 100px; line-height: 36px">
        <el-dropdown-item
          v-for="(item, index) in dropItems"
          :key="index"
          :command="item">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'CloudMoreButton',
  
  components: {},
  
  props: {
    titleText: {
      type: String,
      default: '更多'
    },
    dropItems: {
      type: Array,
      default: () => {
        return []
      }
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      show: false
    }
  },
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.drop-box {
  display: inline-block;
  vertical-align: top;
  outline: none;
  cursor: default;
  margin-left: 10px;
  line-height: 1;
  .el-dropdown-link {
    display: inline-block;
    border: 0;
    outline: none;
    font-size: 14px;
    line-height: 1;
    background-color: #fff;
    color: $textRunning;
    &.disabled{
      background-color: $btnDisabledBg;
      
    }
  }
  &.has-border {
    background-color: #409EFF;
    &:hover {
      background: #66b1ff;
      border-color: #66b1ff;
      color: #fff;
    }
    .el-dropdown-link {
      display: inline-block;
      background-color:  #409EFF;
      padding: 11px 20px;
      font-size: 14px;
      line-height: 1;
      color: #fff;
      &.disabled{
        cursor: not-allowed;
        background-color: $btnDisabledBg;
        color: $textLevelC;
      }
    }
  }
  .more-btn {
    &.active {
      transition: transform .3s linear;
      transform: rotate(180deg);
    }
  }
}
</style>
