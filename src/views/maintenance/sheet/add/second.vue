<!--
  @author:  DAniel
  @date:    2019-01-24
  @desc:    工单新建第一步
  @require:
-->
<template>
  <div class="view-wrapper sheet_create">
    <cloud-step :stepProps="stepProps" :currentProps="1"/>
    <div class="create_second" v-loading.lock="fullLoading">
      <div class="create_top">
        <span class="product-type">产品/服务:</span>
        <span class="product-type-value">{{productName}}</span>
        <el-autocomplete
          popper-class="my-autocomplete"
          v-model="secondInput"
          :fetch-suggestions="querySearch"
          placeholder="请输入运维类型"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="value">{{ item.value }}</div>
          </template>
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-autocomplete>
      </div>
      <div class="create_content">
        <el-button
          v-for="(item, key) in buttons"
          :key="key"
          :disabled="!item.status"
          @click="handleCurrentStep('add', item)"
        >{{item.name}}</el-button>
      </div>
      <div class="create_bottom">
        <el-button @click="handleCurrentStep('minus')">上一步</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from "vuex";
import { GET_WORKSHEET_DICTIONARY } from "@/api/worksheet";
import CloudStep from "@/components/CloudStep";
export default {
  name: "SheetCreateSecond",

  components: {
    CloudStep
  },

  props: {},

  data() {
    const stepProps = {
      list: [
        { title: "选择产品/服务" },
        { title: "选择运维类型" },
        { title: "创建工单" }
      ]
    };
    return {
      stepProps,
      buttons: [],
      productName: "",
      fullLoading: true
    };
  },

  computed: {
    secondInput: {
      get() {
        return this.$store.state.worksheet.secondInput;
      },
      set(value) {
        this.UPDATE_WORKSHEET({
          type: "secondInput",
          payload: value
        });
      }
    }
  },

  watch: {},

  created() {
    // const { name = "wu", code = "wu" } = this.getProduct();
    const { p_name, p_code } = this.$route.query
    this.productName = p_name;
    this.getDictionary(p_code);
  },

  mounted() {
    this.$eventBus.$on("stepClick", obj => {
      if (obj.path === "second") {
        if (obj.val === 1) {
          this.$router.push({
            path: "/maintenance/sheet/add",
            query: {
              p_id: "",
              p_code: "",
              p_name: "",
              m_id: "",
              m_code: "",
              m_name: ""
            }
          });
        } else {
          return false;
        }
      }
    });
  },

  destroyed() {},

  methods: {
    ...mapMutations("worksheet", ["UPDATE_WORKSHEET", "UPDATE_ITEMS"]),
    handleFilter() {
      console.log(1);
    },
    handleCurrentStep(type, maintenance) {
      // if (!!maintenance) {
      //   // 当进入上一步选择其他类型时，更新items
      //   if (
      //     maintenance.code !==
      //     (this.getMaintenance() && this.getMaintenance().code)
      //   )
      //     this.UPDATE_ITEMS([]);
      //   this.UPDATE_WORKSHEET({
      //     type: "checkedMaintenance",
      //     payload: {
      //       checkedMaintenance: maintenance
      //     }
      //   });
      // }
      this.handleStep(type, maintenance);
    },
    async getDictionary(product) {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: product
      });
      this.buttons = res.data;
      this.fullLoading = false;
    },
    querySearch(queryString, cb) {
      var buttons = this.buttons
        .filter(v => v.status !== 0)
        .map(v => {
          return { ...v, value: v.name };
        });
      var results = queryString
        ? buttons.filter(this.createFilter(queryString))
        : buttons;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return item => {
        return (
          item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        );
      };
    },
    handleSelect(item) {
      console.log(item);
      this.handleCurrentStep("add", item);
    },
    handleStep(type, maintenance) {
      if (type === "add" || !type) {
        const p_id = this.$route.query.p_id;
        const p_code = this.$route.query.p_code;
        const p_name = this.$route.query.p_name;
        this.$router.push({
          path: "/maintenance/sheet/add/third",
          query: {
            p_id,
            p_code,
            p_name,
            m_id: maintenance.id,
            m_code: maintenance.code,
            m_name: maintenance.name
          }
        });
        return false;
      }
      if (type === "minus") {
        this.$router.push({
          path: "/maintenance/sheet/add",
          query: {
            p_id: "",
            p_code: "",
            p_name: "",
            m_id: "",
            m_code: "",
            m_name: ""
          }
        });
        return false;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sheet_create {
  min-height: 355px;
  overflow-y: auto;
  background: $appMainBg;
  padding: 20px 15px;
  .create_second {
    width: 1080px;
    margin: 0 auto;
    .create_top {
      font-size: 14px;
      margin: 10px 20px 20px 20px;
      text-align: right;
      /deep/ .el-input-group {
        width: 320px;
      }
      /deep/ .el-input-group__append button.el-button {
        width: 36px;
        background: #409eff !important;
      }
      /deep/ .el-input-group__append button.el-button i {
        color: white;
        margin-left: -7px;
        font-size: 14px;
      }
      .product-type {
        float: left;
        color: $textNewDisabled;
        display: inline-block;
        width: 100px;
        text-align: left;
      }
      .product-type-value {
        color: $textLevelA;
        float: left;
        display: inline-block;
        text-align: left;
      }
    }
    .create_content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      /deep/ .el-button {
        text-align: left;
        font-size: 14px;
        width: 320px;
        height: 60px;
        margin: 0 20px 20px 20px;
        border: 1px solid rgba(175, 186, 203, 1);
        color: $textNewNormal;
      }
      /deep/ .el-button:focus,
      /deep/ .el-button:hover {
        border: none;
        background: $tableHoverBg;
        color: $textNewChecked;
      }
      /deep/ .el-button.is-disabled,
      /deep/ .el-button.is-disabled:focus,
      /deep/ .el-button.is-disabled:hover {
        background-color: $itemDisabledBg;
        border: none;
        color: $textNewDisabled;
      }
    }
    .create_bottom {
      margin: 100px 0 0 0;
      text-align: center;
    }
  }
}
</style>
