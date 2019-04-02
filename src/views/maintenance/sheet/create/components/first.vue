<!--
  @author:  DAniel
  @date:    2019-01-24
  @desc:    工单新建第一步
  @require:
-->
<template>
  <div class="create_first" v-loading.lock="fullLoading">
    <div class="create_top">
      <!-- <el-input placeholder="请输入产品/服务" v-model="firstInput"
                    @keyup.enter.native="handleFilter">
                <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
      </el-input>-->
      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="firstInput"
        :fetch-suggestions="querySearch"
        placeholder="请输入产品/服务"
        @select="handleSelect"
      >
        <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        <template slot-scope="{ item }">
          <div class="value">{{ item.value }}</div>
          <!-- <span class="desc">{{ item.type }}</span> -->
        </template>
      </el-autocomplete>
    </div>
    <div class="create_content">
      <el-button
        v-for="(item, key) in buttons"
        :key="key"
        :disabled="!item.status"
        @click="handleCurrentStep(item)"
      >
        <div class="svg-wraper">
          <svg-icon :iconClass="item.icon" class="iconClassName"/>
          <span class="mgl-20">{{item.name}}</span>
        </div>
      </el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { GET_WORKSHEET_DICTIONARY } from "@/api/worksheet";
import { mapMutations, mapGetters } from "vuex";
// import { Loading } from 'element-ui'
export default {
  name: "SheetCreateFirst",

  components: {},

  props: {
    handleStep: {
      type: Function,
      default: () => {
        return "is a function!";
      }
    }
  },

  data() {
    return {
      buttons: [],
      // searchInput: ''
      fullLoading: true
    };
  },

  computed: {
    firstInput: {
      get() {
        return this.$store.state.worksheet.firstInput;
      },
      set(value) {
        this.UPDATE_WORKSHEET({
          type: "firstInput",
          payload: value
        });
      }
    }
  },

  watch: {},

  created() {
    // let loadingInstance = Loading.service({target: '.create_first', fullscreen: false});
    this.getDictionary();
    // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
    //    let loadingInstance = Loading.service({target: '.create_first', fullscreen: false});
    //    loadingInstance.close()
    // });
  },

  mounted() {
    // let loadingInstance = Loading.service({target: '.create_first', fullscreen: false});
  },

  destroyed() {},

  methods: {
    ...mapGetters("worksheet", ["getProduct"]),
    ...mapMutations("worksheet", ["UPDATE_WORKSHEET", "UPDATE_ITEMS"]),
    handleFilter() {
      console.log(1);
    },
    handleCurrentStep(product) {
      // 当进入上一步选择其他类型时，更新items
      if (product.code !== (this.getProduct() && this.getProduct().code))
        this.UPDATE_ITEMS([]);
      this.UPDATE_WORKSHEET({
        type: "checkedProduct",
        payload: {
          checkedProduct: product
        }
      });
      if (!this.handleStep) return false;
      this.handleStep("add");
    },
    async getDictionary() {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: "PRODUCT"
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
      this.handleCurrentStep(item);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create_first {
  width: 1080px;
  margin: 0 auto;
  .create_top {
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
  .svg-wraper {
    display: flex;
    align-items: center;
  }
  .iconClassName {
    width: 30px;
    height: 30px;
  }
}
</style>
