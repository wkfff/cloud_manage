<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    添加项
  @require:
-->
<template>
  <el-dialog title="添加项" :visible.sync="show" :close-on-click-modal="false" width="600px">
    <div class="content">
      <!-- <CloudForm :fields="fieldsProps" :config="configProps" ref="addItemForm"/> -->
      <component
        :is="computeCorrespond"
        :key="Math.random()"
        :productCodeProps="productCodeProps"
        :maintenanceCodeProps="maintenanceCodeProps"
        :productNameProps="productNameProps"
        :maintenanceNameProps="maintenanceNameProps"
        @handleNode="v => vNode = v"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
      <el-button @click="show = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from "@/mixins/DialogMixin";
import DelayButton from "@/components/DelayButton/index.vue";
import { INTANCE_DB_TYPE } from "@/utils/constant";
import { PATCH_APPROVAL, PATCH_APPROVAL_REJECT } from "@/api/worksheet";
import CloudForm from "@/components/CloudForm";

export default {
  name: "AddItemDialog",

  components: {
    DelayButton,
    CloudForm,
    MysqlParameter: () => import("../formTypes/MysqlParameter.vue"),
    MysqlAuthorization: () => import("../formTypes/MysqlAuthorization.vue"),
    MysqlWhitelist: () => import("../formTypes/MysqlWhitelist.vue"),
    OracleParameter: () => import("../formTypes/OracleParameter.vue"),
    OracleAuthorization: () => import("../formTypes/OracleAuthorization.vue"),
    OracleWhitelist: () => import("../formTypes/OracleWhitelist.vue"),
    Db2Parameter: () => import("../formTypes/Db2Parameter.vue"),
    Db2Authorization: () => import("../formTypes/Db2Authorization.vue"),
    Db2Whitelist: () => import("../formTypes/Db2Whitelist.vue"),
    SqlserverWhitelist: () => import("../formTypes/SqlserverWhitelist.vue")
  },

  mixins: [DialogMixin],

  props: {
    productNameProps: {
      type: String,
      default: () => {
        return "wu";
      }
    },
    maintenanceNameProps: {
      type: String,
      default: () => {
        return "wu";
      }
    },
    productCodeProps: {
      type: String,
      default: () => {
        return "wu";
      }
    },
    maintenanceCodeProps: {
      type: String,
      default: () => {
        return "wu";
      }
    },
    addItemProps: {
      type: Function,
      default: () => {
        return function() {
          console.log("not a function");
        };
      }
    }
    // parametersProps: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   }
    // }
  },

  data() {
    const instances = ["1", "2"];

    return {
      instances,
      formData: {
        host: "",
        instance_name: "",
        param_key: "",

        param_value: ""
      },
      vNode: null
    };
  },

  computed: {
    computeCorrespond() {
      return (
        this.productCodeProps.split("_")[0].toLowerCase() +
        this.maintenanceCodeProps.toLowerCase().replace(/^/, () => "-")
      );
    }
  },

  watch: {
    currentRow: {
      deep: true,
      handler(val) {}
    }
  },

  created() {
    console.log(1111);
  },

  mounted() {},

  destroyed() {},

  methods: {
    async handleSubmit() {
      const values = await this.vNode.validate();
      console.log(values);
      if (values) {
        this.handleAddItem(values);
        this.show = false;
        this.vNode.resetFields();
      }
    },
    handleAddItem(values) {
      if (!this.addItemProps) return false;
      this.addItemProps(values);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sheet-text {
  font-weight: 600;
  cursor: pointer;
  margin-left: 5px;
  &.active {
    .more-handle-icon {
      transition: transform 0.1s linear;
      transform: rotate(180deg);
    }
  }
  /deep/ .el-icon--right {
    margin-left: 0;
  }
}

.content {
  padding-top: 20px;
  /deep/ .el-form-item__label {
    font-weight: 500;
  }
  /deep/ .el-input-number {
    width: 280px;
  }
  /deep/ .el-radio-group {
    width: 280px;
    display: contents;
    & > label:first-child {
      & > .el-radio-button__inner {
        width: 140px;
      }
    }
    & > label:last-child {
      & > .el-radio-button__inner {
        width: 140px;
      }
    }
  }
}
</style>
