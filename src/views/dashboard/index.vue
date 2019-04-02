<template>
  <div class="view-wrapper dashboard">
    <el-alert title="欢迎使用DBaaS云管平台！" type="info"></el-alert>
    <div class="top_wrap">
      <div class="database">
        <title-card :cardProps="dbCardItems" :handleClickProps="handleClick">
          <svg-icon iconClass="ic_database"></svg-icon>
        </title-card>
        <panel-card :fields="statusFields" v-model="panelConfig.status"/>
      </div>
      <div class="user">
        <div class="svg-wrap">
          <svg-icon iconClass="male"></svg-icon>
        </div>
        <div class="user-info">
          <span class="user-name">{{`${nickName}/${userName}`}}</span>
          <!-- {{`${nickName}/${userName}`}} -->
        </div>
        <div class="user-profile">普通用户</div>
        <canvas id="canvas"></canvas>
      </div>
    </div>
    <div class="right_wrap">
      <div class="order">
        <title-card :cardProps="orderCardItems" :handleClickProps="handleClick">
          <svg-icon iconClass="ic_orderdash"></svg-icon>
        </title-card>
        <div class="table-wrap">
          <CloudTable
            ref="listTable"
            :column-config="columnConfigOrder"
            :fetch-config="fetchConfigOrder"
            :table-config="tableConfig"
          />
        </div>
      </div>

      <div class="sheet">
        <title-card :cardProps="sheetCardItems" :handleClickProps="handleClick">
          <svg-icon iconClass="ic_sheet"></svg-icon>
        </title-card>
        <div class="table-wrap">
          <CloudTable
            ref="listTable"
            :column-config="columnConfig"
            :fetch-config="fetchConfig"
            :table-config="tableConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { DASHBOARD } from "@/api/dashboard";
import PanelCard from "./components/PanelCard.vue";
import TitleCard from "./components/TitleCard.vue";
import CloudTable from "@/components/CloudTable";
import { GET_SHEET_LIST } from "@/api/worksheet";
import { WORKSHEET, BUILT } from "@/utils/constant";

export default {
  name: "DashBoard",

  components: {
    PanelCard,
    TitleCard,
    CloudTable
  },

  data() {
    const dbCardItems = {
      title: "常用数据库",
      text: "新建数据库",
      type: "database"
    };
    const sheetCardItems = {
      title: "近7天工单",
      text: "更多工单",
      type: "sheet"
    };
    const orderCardItems = {
      title: "近7天订单",
      text: "更多订单",
      type: "order"
    };
    const tableConfig = {
      pageSize: 5,
      pagerCount: 5
    };
    const fetchConfig = {
      url: GET_SHEET_LIST,
      data: {
        order_type: "unfinish",
        pickerTime: ""
      }
    };
    const fetchConfigOrder = {
      url: GET_SHEET_LIST,
      data: {
        order_type: "unfinish",
        pickerTime: ""
      }
    };
    return {
      panelConfig: {
        status: ""
      },
      fetchConfig,
      fetchConfigOrder,
      tableConfig,
      dbCardItems,
      sheetCardItems,
      orderCardItems
    };
  },

  computed: {
    ...mapGetters(["userName","nickName"]),
    statusFields() {
      return [
        {
          label: "MySQL 数据库",
          value: 6,
          status: "unfinish",
          icon: "ic_mysql",
          path: "/built/instance/entry/mysql/list"
        },
        {
          label: "Redis 数据库",
          value: 2,
          status: "finish",
          icon: "ic_redis",
          path: "/built/instance/entry/redis/list"
        },
        {
          label: "MongoDB 数据库",
          value: 2,
          status: "finish",
          icon: "ic_mongodb",
          path: "/built/instance/entry/mongodb/list"
        },
        {
          label: "Oracle 数据库",
          value: 2,
          status: "finish",
          icon: "ic_oracle",
          path: "/built/instance/entry/oracle/list"
        },
        {
          label: "DB2 数据库",
          value: 2,
          status: "finish",
          icon: "ic_db2",
          path: "/built/instance/entry/db2/list"
        }
      ];
    },
    /**
     * 列表
     * @return {*}
     */
    columnConfig() {
      return [
        {
          label: "工单编号",
          prop: "order_no",
          "min-width": 120,
          render(h, { row }) {
            const route = {
              path: `/maintenance/search/detail/overview/${row.id}`
            };
            return row.status === 1 ? (
              <span>{row.order_no ? row.order_no : '-'}</span>
            ) : (
              <router-link to={route}>
                <span class="text-active">{row.order_no}</span>
              </router-link>
            );
          }
        },
        {
          label: "产品/服务",
          prop: "product_name",
          "min-width": 100
        },
        {
          label: "运维类型",
          prop: "handle_type_name",
          "min-width": 110,
          filterHead: true,
          filterProp: "handle_type",
          columnFilters: WORKSHEET.HANDLE_TYPE
        },
        {
          label: "工单状态",
          prop: "status",
          "min-width": 110,
          filterHead: true,
          columnFilters: WORKSHEET.STATUS,
          render(h, { row }) {
            return (
              <span class={`${WORKSHEET.STATUS_COLOR[row.status]} point`}>
                {WORKSHEET.STATUS[row.status]}
              </span>
            );
          }
        },
        {
          label: "执行状态",
          prop: "execute_status",
          "min-width": 110,
          filterHead: true,
          columnFilters: WORKSHEET.EXECUTE_STATUS,
          render(h, { row }) {
            return (
              <span
                class={`${
                  WORKSHEET.EXECUTE_STATUS_COLOR[row.execute_status]
                } point`}
              >
                {WORKSHEET.EXECUTE_STATUS[row.execute_status]}
              </span>
            );
          }
        }
      ];
    },
    /**
     * 列表
     * @return {*}
     */
    columnConfigOrder() {
      return [
        {
          label: "订单编号",
          prop: "order_no",
          "min-width": 120,
          render(h, { row }) {
            const route = {
              path: `/built/search/detail/overview/${row.id}`
            };
            return row.status === 1 ? (
              <span>{row.order_no || "-"}</span>
            ) : (
              <router-link to={route}>
                <span class="text-active">{row.order_no || "-"}</span>
              </router-link>
            );
          }
        },
        {
          label: "数据库类型",
          prop: ""
        },
        {
          label: "订单状态",
          prop: "status",
          filterHead: true,
          columnFilters: BUILT.STATUS,
          render(h, { row }) {
            return (
              <span class={`${BUILT.STATUS_COLOR[row.status]} point`}>
                {BUILT.STATUS[row.status]}
              </span>
            );
          }
        }
      ];
    }
  },

  created() {
    // token 过期就会跳到登录页
    this.getDashboard();
  },

  mounted() {
    this.$nextTick(() => {
      this.drawWave();
    });
  },

  methods: {
    async getDashboard() {
      const res = await this.$ajax.get(DASHBOARD);
    },
    handleClick(type) {
      console.log(type);
      if (type === "database") {
        this.$router.push("/built/create/db");
      } else if (type === "sheet") {
        this.$router.push("/maintenance/search/list");
      } else if (type === "order") {
        this.$router.push("/built/search/list");
      }
    },
    drawWave() {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      //画布属性
      var mW = (canvas.width = 240);
      var mH = (canvas.height = 50);

      //Sin 曲线属性
      var sX = 0;
      var axisLength = mW; //轴长
      var waveWidth = 0.05; //波浪宽度,数越小越宽
      var waveHeight = 6; //波浪高度,数越大越高
      var speed = 0.05; //波浪速度，数越大速度越快
      var xOffset = 0; //波浪x偏移量

      //画圈函数
      var IsdrawRected = false;
      var drawRect = function() {
        ctx.beginPath();
        ctx.strokeStyle = "#0698FB";
        ctx.rect(0, 0, 240, 50);
        ctx.stroke();
        IsdrawRected = true;
      };

      //画sin 曲线函数
      var drawSin = function(xOffset, color, waveHeight) {
        ctx.save();

        var points = []; //用于存放绘制Sin曲线的点

        ctx.beginPath();
        //在整个轴长上取点
        for (var x = sX; x < sX + axisLength; x += 20 / axisLength) {
          //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
          var y = Math.sin((-sX - x) * waveWidth + xOffset) * 0.8 + 0.3;

          var dY = mH * (1 - 40 / 65); // todo

          points.push([x, dY + y * waveHeight]);
          ctx.lineTo(x, dY + y * waveHeight);
        }

        //封闭路径
        ctx.lineTo(axisLength, mH);
        ctx.lineTo(sX, mH);
        ctx.lineTo(points[0][0], points[0][1]);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
      };

      var render = function() {
        ctx.clearRect(0, 0, mW, mH);

        if (IsdrawRected == false) {
          drawRect();
        }

        drawSin(xOffset + Math.PI * 0.7, "#DCF2F4", 5);
        drawSin(xOffset, "#C5DEFF", 3);

        xOffset += speed;
        requestAnimationFrame(render);
      };

      render();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  /deep/ .el-alert--info {
    background-color: rgba(74, 141, 240, 0.1);
    color: $textLevelA;
    margin-bottom: 20px;
    display: inline-table;
  }
  .top_wrap {
    display: flex;
    height: 325px;
    min-height: 325px;
    margin-bottom: 10px;
    flex-direction: row;
    .database {
      background: white;
      width: 100%;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
    }
    .user {
      position: relative;
      background: white;
      width: 240px;
      min-width: 240px;
      display: flex;
      flex-direction: column;
      .svg-wrap {
        margin-top: 30px;
        display: flex;
        justify-content: center;
        svg {
          font-size: 120px;
        }
      }
      .user-info {
        font-size: 18px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        // margin-top: 20px;
        margin: 20px 20px 0 20px;
        border-bottom: 1px solid #d3d8df;
        .user-name {
          color: #424754;
          margin-right: 20px;
        }
      }
      .user-profile {
        font-size: 18px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin: 0 55px;
      }
      #canvas {
        position: absolute;
        width: 100%;
        height: 50px;
        bottom: 0;
        // border: 1px dashed rgba(0, 0, 0, 0.1);
      }
    }
  }
  .right_wrap {
    height: 100%;
    display: flex;
    flex-direction: row;
    .sheet {
      overflow-x: hidden;
      background: white;
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    .order {
      width: 50%;
      background: white;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
    }
  }
  .table-wrap {
    width: 100%;
    overflow-y: auto;
    padding: 0 10px;
    /deep/ .table-box {
      padding-top: 0;
    }
  }
}
</style>
