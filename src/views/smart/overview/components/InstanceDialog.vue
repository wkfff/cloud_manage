<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    添加项
  @require:
-->
<template>
  <el-dialog title="Instance指标对比" :visible.sync="show" :close-on-click-modal="false" width="1000px">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="事务数" name="first"></el-tab-pane>
        <el-tab-pane label="操作数" name="second"></el-tab-pane>
        <el-tab-pane label="IOPS" name="third"></el-tab-pane>
        <el-tab-pane label="连接数" name="fourth"></el-tab-pane>
        <el-tab-pane label="响应时间" name="fifth"></el-tab-pane>
        <el-tab-pane label="CPU使用率" name="sixth"></el-tab-pane>
        <el-tab-pane label="内存使用率" name="senventh"></el-tab-pane>
        <el-tab-pane label="硬盘使用率" name="eighth"></el-tab-pane>
      </el-tabs>
      <div id="wrapEcharts">
        <div class="inner-first" id="innerFirst"></div>
        <div class="inner-second" id="innerSecond"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from "@/mixins/DialogMixin";

export default {
  name: "InstanceDialog",

  components: {},

  mixins: [DialogMixin],

  props: {},

  data() {
    return {
      activeName: "first"
    };
  },

  computed: {},

  watch: {
    show(val) {
      this.$nextTick(() => {
        val && this.drawLine();
      });
    }
  },

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    handleClick() {},
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("innerFirst"));
      let myChart2 = this.$echarts.init(document.getElementById("innerSecond"));
      // 绘制图表
      myChart1.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [2500, 3000, 5000, 7500, 6000, 7500, 15000],
            type: "line",
            areaStyle: {}
          }
        ]
      });
      myChart2.setOption({
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [1500, 3400, 4700, 2000, 6000, 7500, 8000],
            type: "line",
            areaStyle: {}
          }
        ],
        itemStyle: {
          color: "#334455"
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  #wrapEcharts {
    display: flex;
    justify-content: space-between;
    .inner-first {
      border: 1px solid #ccc;
      width: 49%;
      height: 330px;
    }
    .inner-second {
      border: 1px solid #ccc;
      width: 49%;
      height: 330px;
    }
  }
}
</style>

