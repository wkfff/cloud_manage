<!--
  @author:  Daniel
  @date:    2019-01-15
  @desc:    step组件
  @require:
-->
<template>
  <div>
    <div class="cloud-step-wrap">
      <div class="cloud-step">
        <el-steps :active="getCurrentStep" finish-status="success">
          <el-step v-for="(item,key) in list" :key="key" :title="item.title" v-on:click.native.stop="handleClick(key + 1)">
            <i :class="'step-0' + (key + 1)" slot="icon"></i>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "CloudStep",

  components: {},

  props: {
    /**
     * step配置、主要分属性配置，事件配置
     * options: {}
     * events: {}
     */
    stepProps: {
      type: Object,
      default: () => {
        return {};
      }
    },
    currentProps: {
      type: Number,
      default: () => {
        return 0;
      }
    }
  },

  data() {
    return {
      list: this.getRealSteps()
    };
  },

  computed: {
    getCurrentStep() {
      return this.currentProps;
    }
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    getRealSteps() {
      if (!this.stepProps.list) {
        return [];
      }
      if (this.stepProps.list.length > 5 || this.stepProps.list < 2) {
        console.error("step数量不符合预期，请传入2~5");
        return [];
      }
      return this.stepProps.list;
    },
    forward(current) {
      const length = this.stepProps.list.length;
      if (current < length - 1) {
        if (this.stepProps.forward) this.stepProps.forward();
      }
    },
    back(current) {
      if (current > 0) {
        if (this.stepProps.back) this.stepProps.back();
      }
    },
    handleClick(val) {
      const path = this.$route.path.split('/')[this.$route.path.split('/').length - 1]
      this.$eventBus.$emit('stepClick', {path, val})
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cloud-step-wrap {
  padding: 20px 0;
  background: white;
  .cloud-step {
    // background: white;
    width: 512px;
    height: 60px;
    margin: 0 auto;

    /deep/ .el-step__title {
      font-size: 16px;
    }

    /deep/ .el-step__icon.is-text {
      border: 16px solid;
    }
    /deep/ .el-step__head.is-wait {
      cursor: not-allowed;
    }
    /deep/ .el-step__head.is-success {
      color: $textSuccess;
      cursor: pointer;
    }
    /deep/ .el-step__head.is-process {
      color: $textRunning;
      cursor: not-allowed;
    }

    /deep/ .el-icon-check:before {
      content: "\e611";
      color: $textNone;
    }

    @each $number in 1, 2, 3, 4, 5 {
      /deep/ .step-0#{$number}:before {
        content: "#{$number}";
        color: $textNone;
      }
    }

    /deep/ .el-step__icon {
      width: 32px;
      height: 32px;
      // cursor: not-allowed;
    }
    /deep/ .el-step.is-horizontal .el-step__line {
      top: 14px;
      left: 42px;
      right: 10px;
    }

    @each $status, $color in (wait, $textInfo), (process, $textRunning),
      (success, $textSuccess)
    {
      /deep/ .el-step__title.is-#{$status} {
        position: absolute;
        top: 32px;
        left: -44px;
        width: 120px;
        text-align: center;
        color: #{$color};
        font-weight: normal;
      }
    }
  }
}
</style>
