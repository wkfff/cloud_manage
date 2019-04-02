<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    状态卡片
  @require:
-->
<template>
  <div class="status-wrapper">
    <div
      v-for="(field, index) in fields"
      :key="index"
      :class="[active === field.status ? 'active' : '']"
      class="card-box"
      @click="changeStatus(field.status)"
    >
      <div class="card-warp">
        <div>
          <svg-icon iconClass="ic_business" class="icon-style"></svg-icon>
        </div>
        <!-- <div class="text">{{ field.label }}</div> -->
      </div>

      <div class="card-warp">
        <div class="wrap-inner-text">{{field.label}}</div>
        <div class="number">
          <span class="number-text">实例数</span>
          <span class="number-value">{{ field.value }}</span>
        </div>
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
    changeStatus(status) {
      this.active = status;
      this.$emit("update");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.status-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .card-box {
    width: 23%;
    min-width: 180px;
    padding: 13px;
    background-color: #fff;
    margin-right: 20px;
    margin-bottom: 20px;

    border-radius: 4px;
    display: flex;
    align-items: center;
    display: flex;
    justify-content: space-between;
    border: 1px solid #ccc;
    cursor: pointer;
    &.active {
      color: #4a8df0;
      background: rgba(240, 250, 255, 1);
      border: 1px solid rgba(74, 141, 240, 1);
      .number,
      .icon-style,
      .wrap-inner-text,
      .number-text,
      .number-value {
        color: #4a8df0 !important;
      }
    }
    &:hover {
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(175, 186, 203, 1);
    }
    .card-warp {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
      .icon-style {
        width: 50px;
        height: 50px;
        color: #afbacb;
      }
      .wrap-inner-text {
        font-size: 20px;
        color: #303133;
        margin-bottom: 20px;
      }
      .number {
        font-size: 16px;
        color: $numberFontDefaultColor;
        display: flex;
        flex-direction: row;
        align-items: center;
        .number-text {
          font-size: 14px;
          color: #777e8c;
        }
        .number-value {
          margin-left: 20px;
          font-size: 25px;
          color: #777e8c;
        }
      }
      .text {
        font-size: 16px;
        margin-left: 20px;
        color: $textNewChecked;
        font-weight: bold;
      }
    }
  }
  .card-box:nth-child(4n) {
    margin-right: 0;
  }
}
</style>
