<!--
  @author:  daniel
  @date:    2019-02-28
  @file:    状态卡片
  @require:
-->
<template>
  <div class="status-wrapper">
    <div
      v-for="(field, index) in fields"
      :key="index"
      class="card-box"
      @click="changeStatus(field.path)"
    >
      <div class="card-warp">
        <div>
          <svg-icon :iconClass="field.icon" class="icon-style"></svg-icon>
        </div>
        <div class="text">{{ field.label }}</div>
      </div>

      <div class="card-warp">
        <div class="number">{{ field.value }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "PanelCard",

  components: {},

  model: {
    prop: "status",
    event: "change"
  },

  props: {
    // 状态
    status: {
      type: [String, Number],
      default: 0
    },
    fields: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {};
  },

  computed: {
    active: {
      get() {
        return this.status;
      },
      set(val) {
        this.$emit("change", val);
      }
    }
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    changeStatus(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.status-wrapper {
  overflow-y: auto;
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10px;
  .card-box {
    background: rgba(242, 244, 246, 1);
    border: 1px solid white;
    border-radius: 4px;
    margin-bottom: 20px;
    margin-right: 2%;
    width: 32%;
    min-width: 180px;
    padding: 15px;
    // background-color: rgba(242,244,246,1);
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    // border: 1px solid #ccc;
    cursor: pointer;
    &.active {
      border: none;
      background: #e6f7ff;
      color: #4a8df0;
      box-shadow: 0px 2px 4px 0px rgba(74, 141, 240, 0.2);
    }
    &:hover {
      border: none;
      background: #e6f7ff;
      color: #4a8df0;
      border: 1px solid #4a8df0;
      // box-shadow: 0px 2px 4px 0px rgba(74, 141, 240, 0.2);
      .text {
        color: #4a8df0 !important;
      }
    }
    .card-warp {
      display: flex;
      align-items: center;
      .icon-style {
        width: 30px;
        height: 30px;
        color: #4a8df0;
      }
      .number {
        font-size: 14px;
        // color: #4a8df0;
      }
      .text {
        font-size: 14px;
        margin-left: 20px;
        color: #424754;
      }
    }
  }
  .card-box:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
