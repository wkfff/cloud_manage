<!--
  @author:  daniel
  @date:    2019-02-28
  @file:    状态卡片
  @require:
-->
<template>
  <div class="title-card">
    <div class="left">
      <div class="title-icon">
        <slot></slot>
      </div>
      <div class="title">{{cardProps.title}}</div>
    </div>
    <div class="right">
      <el-button type="text" @click="handleClick(cardProps.type)">{{cardProps.text}}</el-button>
      <el-button type="text" icon="el-icon-refresh" style="fontSize: 18px"></el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "TitleCard",

  components: {},

  props: {
    cardProps: {
      type: Object,
      default: () => {
        return {};
      }
    },
    handleClickProps: {
      type: Function,
      default: () => {
        return function() {};
      }
    }
  },

  data() {
    return {};
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleClick(type) {
      if (this.handleClickProps) {
        this.handleClickProps(type);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title-card {
  min-height: 70px;
  height: 70px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
  .left {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    .title-icon {
      width: 50px;
      height: 50px;
      svg {
        font-size: 50px;
      }
    }
    .title {
      display: flex;
      align-items: center;
      margin-left: 10px;
      font-size: 15px;
      font-weight: bold;
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    /deep/ .el-button--medium {
      padding: 0;
    }
  }
}
</style>
