<!--
  @author:  Daniel
  @date:    2019-01-24
  @desc:    批量导入
  @require:
-->
<template>
  <el-dialog title="批量导入" :visible.sync="show" :close-on-click-modal="false" width="600px">
    <div class="content">
      <el-form
        ref="batchImportForm"
        :model="formData"
        :rules="rules"
        label-width="150px"
        class="batchImport-form"
      >
        <el-form-item label="产品/服务" prop="products">{{productName}}</el-form-item>
        <el-form-item label="运维类型" prop="handle_type">{{maintenanceName}}</el-form-item>

        <el-form-item label="上传文件" prop="fileList">
          <el-upload
            ref="upload"
            class="upload-demo"
            :before-remove="beforeRemove"
            :file-list="formData.fileList"
            action="*"
            :multiple="false"
            :auto-upload="false"
            :http-request="upload"
            :on-change="changeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <a @click.stop="downloadTemplate" type="ghost" class="text-active" ref="downloadLink">下载模板</a>
            <div slot="tip" class="el-upload__tip">只能上传 'xlsx', 'xls'格式的文件，且大小不超过1M</div>
          </el-upload>
        </el-form-item>
      </el-form>
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
import CloudUpload from "@/components/CloudUpload/index.vue";
import {
  INTANCE_DB_TYPE,
  WORKSHEET_DOWNLOAD_LINK,
  WORKSHEET_DOWNLOAD_QUERY
} from "@/utils/constant";
import {
  PATCH_APPROVAL,
  PATCH_APPROVAL_REJECT,
  IMPORT_WORKSHEET_TEMPLATE
} from "@/api/worksheet";

export default {
  name: "BatchImportDialog",

  components: {
    DelayButton,
    CloudUpload
  },

  mixins: [DialogMixin],

  props: {
    productNameProps: {
      type: String,
      default: ""
    },
    maintenanceNameProps: {
      type: String,
      default: ""
    },
    productCodeProps: {
      type: String,
      default: ""
    },
    maintenanceCodeProps: {
      type: String,
      default: ""
    },
    addItemProps: {
      type: Function,
      default: () => {
        return function() {
          console.log("not a function !");
        };
      }
    }
  },

  data() {
    const instances = ["1", "2"];
    const rules = {
      fileList: [
        { required: true, message: "请选择上传文件", trigger: "change" }
      ]
    };
    const productName = this.productNameProps;
    const maintenanceName = this.maintenanceNameProps;
    return {
      instances,
      formData: {
        fileList: []
      },
      rules,
      productName,
      maintenanceName,
      fileList: []
    };
  },

  computed: {
    getDownloadLink() {
      return WORKSHEET_DOWNLOAD_LINK[this.productCodeProps][
        this.maintenanceCodeProps
      ];
    },
    getQuery() {
      return WORKSHEET_DOWNLOAD_QUERY[this.productCodeProps][
        this.maintenanceCodeProps
      ];
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
      const valid = await this.$refs["batchImportForm"].validate();
      this.$refs["upload"].submit();
    },

    async upload({ file }) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await this.$ajax.upload(
          IMPORT_WORKSHEET_TEMPLATE,
          formData,
          [this.getQuery]
        );
        this.$refs["batchImportForm"].clearValidate();
        this.formData.fileList = [];
        this.$message({
          message: "导入成功",
          type: "success"
        });
        const values = res.data.map((item, key) => {
          return {
            host: item.host,
            instance_name: item.instance_name,
            param_key: item.param_key,
            param_value: item.param_value
          };
        });
        this.addItemProps(values);
        // this.$emit("success");
        this.show = false;
      } catch (e) {
        // this.$refs.confirmBtn.clear();
        console.error(e);
      }
    },
    /**
     * 上传一个
     * @param file
     * @param fileList
     */
    changeUpload(file, fileList) {
      this.$refs["batchImportForm"].clearValidate();
      this.formData.fileList = fileList.slice(-1);
    },
    async beforeRemove(file, fileList) {
      const confirm = await this.$confirm(`确定移除 ${file.name}？`);
      if (confirm === "confirm") {
        this.$refs["batchImportForm"].clearValidate();
        this.formData.fileList = [];
        return "confirm";
      }
    },
    downloadTemplate() {
      this.$refs['downloadLink'].href = this.getDownloadLink
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

.batchImport-form {
  padding-top: 20px;
  /deep/ .el-form-item__label {
    font-weight: 500;
  }
  /deep/ .el-input-number {
    width: 280px;
  }
}
</style>
