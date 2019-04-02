<!-- 智能看板 -->
<template>
  <div class="smart-wrapper">
    <div class="smart">
      <div class="mgb-20">
        <CloudFilters :filterProps="filterProps1">
          <span>
            全部业务系统共
            <span class="text-active">12</span> 个
          </span>
        </CloudFilters>
      </div>
      <panel-card
        :fields="statusFields"
        @change="changeModel('show')"
        v-model="panelConfig.status"
      />
      <div class="pagination-wrap">
        <el-pagination
          background
          layout="sizes, prev, pager, next, jumper"
          :total="2"
          :page-sizes="[5, 10, 12, 20]"
          :page-size="12"
        ></el-pagination>
      </div>
      <div :class="['bottom-model', isClick ? 'notUseAnimation' : 'useAnimation']">
        <div class="rollup" @click="changeModel('hide')">
          收起
          <i class="el-icon-caret-bottom"></i>
        </div>
        <div class="wrap">
          <div class="model-left">
            <CloudDetail
              ref="tasksDetail"
              :fields="detailFields"
              :config="detailConfig"
              :fields-values="detailInfo"
            />
          </div>
          <div class="model-right">
            <CloudFilters :filterProps="filterProps">
              <div class="header-title">
                <span class="checked-icon"></span>关联数据库实例
              </div>
            </CloudFilters>
            <CloudTable ref="listTable" :column-config="columnConfig" :fetch-config="fetchConfig"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelCard from "./components/PanelCard.vue";
import CloudTable from "@/components/CloudTable";
import TableMixin from "@/components/CloudTable/TableMixin";
import { GET_REDIS_LIST } from "@/api/instance";
import CloudFilters from "@/components/CloudFilters";
import CloudDetail from "@/components/CloudDetail";

export default {
  name: "smart",

  mixins: [TableMixin],

  components: {
    PanelCard,
    CloudTable,
    CloudFilters,
    CloudDetail
  },

  data() {
    const filterProps = {
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: "实例名", value: "display_name" },
          { label: "所有者/工号", value: "owner" }
        ],
        onClick: this.handleSearch.bind(this)
      }
    };
    const filterProps1 = {
      reloadProps: [
        {
          onClick: this.handleReload.bind(this)
        }
      ],
      search2Props: {
        onClick: this.handleSearch.bind(this)
      }
    };
    const fetchConfig = {
      customData: [
        {
          instance_name: "实例名1",
          instance_desc: "123456",
          instance_type: "MySQL",
          created_time: "2019-03-11 08:00:00"
        },
        {
          instance_name: "实例名2",
          instance_desc: "123456",
          instance_type: "Oracle",
          created_time: "2019-03-11 08:00:00"
        },
        {
          instance_name: "实例名3",
          instance_desc: "123456",
          instance_type: "DB2",
          created_time: "2019-03-11 08:00:00"
        }
      ]
    };
    return {
      isClick: false,
      columnConfig: this.columnFields(),
      fetchConfig,
      filterProps,
      filterProps1,
      detailConfig: {
        title: "基本信息",
        colSpan: 24,
        disableEdit: true
      },
      detailInfo: {
        order_no: "网银大众版",
        work_order_name: "123456",
        ittl_no: "张三/123456",
        ittl_num: "业务介绍"
      },
      panelConfig: {
        status: ""
      }
    };
  },

  computed: {
    statusFields() {
      return [
        {
          label: "网银大众版",
          value: 6,
          status: "1"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "2"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "3"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "4"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "5"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "6"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "7"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "8"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "9"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "10"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "11"
        },
        {
          label: "业务2名称",
          value: 2,
          status: "12"
        }
      ];
    },
    detailFields() {
      return [
        {
          label: "业务名称",
          prop: "order_no"
        },
        {
          label: "业务ID",
          prop: "work_order_name"
        },
        {
          label: "业务负责人",
          prop: "ittl_no"
        },
        {
          label: "业务介绍",
          prop: "ittl_num"
        }
      ];
    }
  },

  methods: {
    changeModel(type) {
      if (type === "hide") {
        this.isClick = true;
        setTimeout(() => {
          this.isClick = false;
          this.panelConfig.status = "";
        }, 300);
      } else {
        this.isClick = false;
        setTimeout(() => {
          this.isClick = true;
        }, 300);
      }
    },
    columnFields() {
      return [
        {
          label: "实例名",
          prop: "instance_name",
          "min-width": 140
        },
        {
          label: "所有者/工号",
          prop: "instance_desc"
        },
        {
          label: "类型",
          prop: "instance_type"
        },
        {
          label: "创建时间",
          prop: "created_time",
          "min-width": 100
        },
        {
          label: "操作",
          fixed: "right",
          render(h, { row }) {
            return (
              <div>
                <router-link
                  to={{ path: `/smart/overview` }}
                  class="text-active"
                >
                  全景视图
                </router-link>
                <router-link
                  to={{ path: `/smart/overview` }}
                  class="text-active"
                >
                  性能容量
                </router-link>
              </div>
            );
          }
        }
      ];
    },
    handleReload() {},
    handleSearch() {}
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.smart-wrapper {
  position: relative;
  overflow: hidden;
}
.smart {
  margin: 20px;
  background: white;
  padding: 20px;
  height: calc(100vh - 100px);
  /deep/ .cloud-filters {
    font-size: unset;
  }
  .pagination-wrap {
    margin-top: 20px;
    text-align: right;
  }

  .bottom-model {
    display: table-column;

    height: 500px;
    // background: grey;
    position: absolute;
    width: 100%;
    bottom: 0;
    // left: 280px;
    right: 0;
    border-top: 1px solid #ccc;
    background: white;
    // display: flex;
    .rollup {
      height: 44px;
      line-height: 44px;
      text-align: center;
      cursor: pointer;
      color: #4a8df0;
    }
    .wrap {
      width: 100%;
      display: flex;
      overflow-x: overlay;

      .model-left {
        padding: 20px 10px 20px 10px;
        border: 1px solid #ccc;
        min-width: 300px;
        max-width: 300px;
        height: 460px;
        margin: 0 5px 20px 10px;
        /deep/ .detail-box {
          padding: 5px 20px;
          /deep/ .checked-wrap {
            /deep/ .cloud-section-title {
              height: 17px;
              line-height: 17px;
              border-left: 4px solid #4a8df0;
              /deep/ .left {
                /deep/ .text {
                  font-size: 14px;
                  font-weight: bold;
                }
              }
            }
          }
          /deep/ .detail-edit-form {
            padding: 20px 0;
          }
        }
      }
      .model-right {
        padding: 20px 10px 20px 10px;
        border: 1px solid #ccc;
        width: 100%;
        height: 460px;
        margin: 0 10px 20px 5px;
        .header-title {
          font-size: 14px;
          font-weight: bold;
          .checked-icon {
            display: inline-block;
            width: 4px;
            height: 16px;
            background: #4a8df0;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
      }
    }
  }

  .useAnimation {
    transform: translateY(500px);
    transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7),
      box-shadow 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
  }
  .notUseAnimation {
    box-shadow:0px -2px 4px 0px rgba(0,0,0,0.2); 
    transform: translateY(0);
    transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7),
      box-shadow 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
  }
}
</style>