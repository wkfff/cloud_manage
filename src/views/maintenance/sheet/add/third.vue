<!--
  @author:  DAniel
  @date:    2019-01-24
  @desc:    工单新建第一步
  @require:
-->
<template>
  <div class="view-wrapper sheet_create">
    <cloud-step :stepProps="stepProps" :currentProps="2"/>
    <div class="create_third" v-loading.lock="sheetLoading">
      <div class="create_content">
        <!--基本信息-->
        <div class="content-wrapper">
          <el-form ref="createForm" :model="formData" :rules="rules" label-width="158px">
            <div class="section">
              <div class="sub-title">
                <span class="checked-icon"></span>
                基本信息
              </div>
              <div class="sub-content">
                <el-form-item label="产品/服务" prop="product">
                  {{productName}}
                  <el-input class="hidden" v-model="product"></el-input>
                </el-form-item>

                <el-form-item label="运维类型" prop="handle_type">
                  {{maintenanceName}}
                  <el-input class="hidden" v-model="handle_type"></el-input>
                </el-form-item>

                <el-form-item label="工单标题" prop="work_order_name">
                  <el-input placeholder="请设置工单标题" v-model="work_order_name"></el-input>
                </el-form-item>

                <el-form-item label="简要描述" prop="description">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入本次申请的相关说明。温馨提示：请勿输入密码等机密信息。"
                    v-model="description"
                  ></el-input>
                </el-form-item>

                <div class="project_form">
                  <el-form-item label="所属项目" prop="project_code">
                    <el-input placeholder="请输入项目编码" v-model="project_code"></el-input>
                  </el-form-item>

                  <el-form-item label prop="project">
                    <el-input placeholder="请输入项目名称" v-model="project"></el-input>
                  </el-form-item>
                </div>

                <el-form-item label="TOP 系统" prop="top_system" v-if="getItemShow('top_system')">
                  <el-select v-model="top_system" filterable placeholder="请选择所属 TOP 系统">
                    <el-option v-for="item in topSystems" :key="item" :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="工单类型" prop="priority">
                  <el-radio-group v-model="getPriorityValue">
                    <el-radio
                      v-for="(item, key) in getPriority"
                      :key="key"
                      :label="item.label"
                      disabled
                    >{{item.name}}</el-radio>
                  </el-radio-group>
                  <div class="remark-span">注：若选择服务请求，将在审批通过后，自动执行运维操作。</div>
                </el-form-item>

                <el-form-item label="开始执行时间" prop="schedule_begin_time">
                  <el-date-picker
                    v-model="schedule_begin_time"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions1"
                    default-time="19:00:00"
                    @change="beginTimeChange"
                  ></el-date-picker>
                  <div class="remark-span">请填写当天19:00以后的时间，否则有被退回的风险。如果需要在19:00之前开始，请修改日期并填写紧急执行原因。</div>
                </el-form-item>

                <el-form-item
                  label="计划使用时长"
                  prop="plan_use_time"
                  v-if="getItemShow('plan_use_time')"
                >
                  <el-select v-model="plan_use_time" filterable placeholder="请选择计划使用时长">
                    <el-option label="12小时" value="12"></el-option>
                    <el-option label="24小时" value="24"></el-option>
                  </el-select>
                  <div class="remark-span">注意：所有权限最晚会在次日7:00前回收。</div>
                </el-form-item>

                <el-form-item label="紧急执行原因" prop="reason" v-if="handleBeginTimeIsShowReason">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请填写紧急执行原因（若开始执行时间在当天19:00点之前，则该项必填）。"
                    v-model="reason"
                  ></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                  <el-input placeholder="请输入手机号码。" class="prepend_select" v-model="phone">
                    <el-select v-model="selectPhoneType" slot="prepend" placeholder="请选择">
                      <el-option label="+ 86" value="1"></el-option>
                    </el-select>
                  </el-input>
                  <div
                    class="remark-span"
                  >工单的相关信息将发送到该手机号，紧急情况时，运维工程师会与您电话联系，请填写正确的手机号！</div>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                  <el-input placeholder="请输入邮箱地址" v-model="email"></el-input>
                  <!-- <div class="remark-span">如需填写多个邮箱地址，请以英文逗号隔开。</div> -->
                </el-form-item>

                <el-form-item label="数据库用户持有人" prop="hold_emp_no">
                  <el-select
                    v-model="hold_emp_no"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请搜索并选择用户持有人"
                    :remote-method="remoteMethod"
                    :loading="loading"
                    clearable
                    @change="handleChangeEmp"
                    no-data-text="找不到相关数据"
                  >
                    <el-option
                      v-for="item in remoteOptions"
                      :key="item.value"
                      :label="item.name + ' / ' + item.value"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <div class="remark-span">除了以上手机号和邮箱，系统还将自动发送工单相关消息给该用户持有人。</div>
                </el-form-item>
              </div>
            </div>

            <!--操作内容-->
            <div class="content-wrapper">
              <div class="section">
                <div class="sub-title">
                  <span class="checked-icon"></span>
                  操作内容
                </div>
                <CloudAlert :alertProps="alertProps"/>
              </div>
            </div>
            <CloudFilters :filterProps="filterProps"/>
            <CloudTable
              ref="listTable"
              :table-config="tableConfig"
              :column-config="getColumnProps"
              :fetch-config="fetchConfig"
              v-loading.lock="tableLoading"
            />
            <el-form-item class="custom-table" prop="items">
              <el-input class="hidden" v-model="validateItems"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="create_bottom">
        <el-button @click="handleCurrentStep('minus')">上一步</el-button>
        <el-button type="primary" @click="showSubmitDialog">提交工单</el-button>
        <el-button @click="showSaveDialog">保存工单</el-button>
      </div>
      <AddItemDialog
        v-model="visible"
        :productNameProps="productName"
        :maintenanceNameProps="maintenanceName"
        :productCodeProps="productCode"
        :maintenanceCodeProps="maintenanceCode"
        :addItemProps="addItem"
      />
      <BatchImportDialog
        v-model="importVisible"
        :productNameProps="productName"
        :maintenanceNameProps="maintenanceName"
        :productCodeProps="productCode"
        :maintenanceCodeProps="maintenanceCode"
        :addItemProps="addItem"
      />

      <SaveSheetDialog v-model="saveVisible"/>

      <SubmitSheetDialog v-model="submitVisible"/>

      <el-tooltip placement="top" content="回到顶部">
        <cloud-back-top
          transitionName="fade"
          :customStyle="myBackToTopStyle"
          :visibilityHeight="300"
          :backPosition="0"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapMutations } from "vuex";
import {
  GET_TOP_SYSTEM,
  ADD_WORK_ORDER,
  SAVE_WORK_ORDER,
  GET_HOLD_USER_LIST,
  GET_WORKSHEET_DETAIL,
  GET_WORKSHEET_ITEM
} from "@/api/worksheet";
import CloudFilters from "@/components/CloudFilters";
import CloudStep from "@/components/CloudStep";
import CloudTable from "@/components/CloudTable";
import CloudAlert from "@/components/CloudAlert";
import AddItemDialog from "./dialogs/AddItemDialog";
import BatchImportDialog from "./dialogs/BatchImportDialog";
import SaveSheetDialog from "./dialogs/SaveSheetDialog";
import SubmitSheetDialog from "./dialogs/SubmitSheetDialog";
import CloudBackTop from "@/components/CloudBackTop";
import { Json } from "@/utils";
import { Cache } from "@/utils";
const cache = new Cache();
import {
  PRIORITY,
  TABLE_COLUMN_PROPS,
  FORM_ITEM_SHOW,
  FORM_ITEM_PROJECT_VALIDATE
} from "@/utils/constant";
import { validatePhone, validateEmail } from "@/utils/validate";

import { createHelpers } from "@/plugins/vuex-fields";

const { mapFields } = createHelpers({
  getterType: "getFormDataField",
  mutationType: "UPDATA_FORMDATA"
});

const uuid = require("uuid");

export default {
  name: "SheetCreateThird",

  components: {
    CloudFilters,
    CloudStep,
    CloudTable,
    AddItemDialog,
    BatchImportDialog,
    CloudAlert,
    CloudBackTop,
    SaveSheetDialog,
    SubmitSheetDialog
  },

  props: {},

  data() {
    const { formData, isDisabled } = this.$store.state.worksheet;
    // const { items } = formData;
    const stepProps = {
      list: [
        { title: "选择产品/服务" },
        { title: "选择运维类型" },
        { title: "创建工单" }
      ]
    };

    const pickerOptions = {
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    };

    const pickerOptions1 = {
      shortcuts: [
        {
          text: "今天",
          onClick(picker) {
            picker.$emit("pick", new Date());
          }
        },
        {
          text: "昨天",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit("pick", date);
          }
        },
        {
          text: "一周前",
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", date);
          }
        }
      ],
      disabledDate(time) {
        return time.getTime() < Date.now() - 8.64e7;
      }
    };

    // const fetchConfig = {
    //   customData: items
    // };

    const myBackToTopStyle = {
      right: "50px",
      bottom: "50px",
      width: "40px",
      height: "40px",
      "border-radius": "4px",
      "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
      background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
    };

    return {
      stepProps,
      // 回显产品和运维名称，不需要穿给后端
      productName: "",
      maintenanceName: "",
      // 这两项是用来判断变更类型
      productCode: "",
      maintenanceCode: "",

      // rules,
      // formData, // 表单数据
      topSystems: [],
      pickerOptions,
      // columnConfig: this.columnFields(),
      // fetchConfig,
      visible: false, // 添加的model框
      submitVisible: false, // 提交工单modal框
      importVisible: false, // 导入的model框
      // parameters: [], // 对话框中的列表
      selectPhoneType: "1",
      // radio: 1,
      // searchInput: "third",
      selections: [], // 选中的项
      myBackToTopStyle,
      // priorityTypes
      pickerOptions1,
      loading: false,
      remoteOptions: [],
      saveVisible: false,
      sheetLoading: true,
      itemsKeywords: "",
      tableLoading: false
    };
  },

  computed: {
    fetchConfig() {
      return {
        customData: this.filterItems
      };
    },

    getColumnProps() {
      if (this.productCode && this.maintenanceCode) {
        return TABLE_COLUMN_PROPS[this.productCode][this.maintenanceCode];
      } else {
        return [];
      }
    },

    formData() {
      return this.$store.state.worksheet.formData;
    },

    alertTitle() {
      // const { code: product_code } = this.getProduct();
      // const { code: maintenance_code } = this.getMaintenance();
      const product_code = this.productCode;
      const maintenance_code = this.maintenanceCode;
      let title = "";
      switch (product_code) {
        case "ORACLE_PRODUCT":
          title =
            maintenance_code === "PARAMETER"
              ? "温馨提示：若修改参数项PROCESS，需在工单审批完成后，联系DBA重启实例才能生效。"
              : "";
          break
        case "DB2_PRODUCT":
          title =
            maintenance_code === "PARAMETER"
              ? "温馨提示：若修改参数项MAX_LOG/NUM_LOG_SPAN，将在修改生效12小时后自动恢复原值。"
              : "";
          break
      }
      return title;
    },

    alertShow() {
      const existProducts = ["ORACLE_PRODUCT", "DB2_PRODUCT"];
      const existMaintenances = ["PARAMETER"];
      // const { code: product_code } = this.getProduct();
      // const { code: maintenance_code } = this.getMaintenance();
      const product_code = this.productCode;
      const maintenance_code = this.maintenanceCode;
      return (
        existProducts.includes(product_code || "wu") &&
        existMaintenances.includes(maintenance_code || "wu")
      );
    },

    alertProps() {
      return {
        type: "info",
        title: this.alertTitle,
        description: "",
        showIcon: true,
        closable: true,
        closeText: "",
        center: false,
        show: this.alertShow
      };
    },

    filterProps() {
      return {
        buttonProps: [
          {
            text: "添加",
            type: "primary",
            permission: "mysql_apply_create",
            onClick: this.showAddItemDialog.bind(this)
          },
          {
            text: "批量导入",
            type: "primary",
            permission: "mysql_apply_create",
            onClick: this.showBatchImportDialog.bind(this)
          },
          {
            text: "删除",
            permission: "mysql_apply_create",
            disabled: !this.selections.length,
            onClick: this.deleteItems.bind(this)
          }
        ],
        reloadProps: [
          {
            onClick: this.handleReload.bind(this)
          }
        ],
        search2Props: [
          {
            onClick: this.handleSearch.bind(this)
          }
        ]
      };
    },

    tableConfig() {
      const _this = this;
      return {
        hasSelection: true,
        events: {
          "selection-change": data => {
            this.$set(this, "selections", data);
            this.$set(
              this,
              "filterProps.buttonProps[2].disabled",
              !data.length
            );
          }
        }
      };
    },

    // 处理formData的插件
    ...mapFields("worksheet", [
      "items",
      "handle_type",
      "product",
      "description",
      // 'maintenTime',
      "top_system",
      "priority",
      "phone",
      "email",
      "hold_emp_no",
      "reason",
      "schedule_begin_time",
      "plan_use_time",
      "project_code",
      "project",
      "work_order_name"
    ]),

    handleBeginTimeIsShowReason() {
      if (!this.schedule_begin_time) return false;
      let show = false;
      const dateStr = this.schedule_begin_time.split(" ")[0];
      const date = new Date();
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const nowDateStr = date.getFullYear() + "-" + month + "-" + day;

      // 需要显示的时间判断 表示日期格式相等，否则不显示，因为日期只能比当前时间大
      if (dateStr === nowDateStr) {
        const fixTime = new Date(nowDateStr + " 19:00:00").getTime();
        const nowTime = new Date(this.schedule_begin_time).getTime();
        if (fixTime > nowTime) {
          show = true;
        }
      }
      return show;
    },

    getPriorityValue: {
      get() {
        if (this.productCode && this.maintenanceCode) {
          this.priority = PRIORITY[this.productCode][this.maintenanceCode];
          return PRIORITY[this.productCode][this.maintenanceCode];
        } else {
          this.priority = 1;
          return 1;
        }
      }
    },

    validateItems() {
      return Json.dumps(this.filterItems);
    },

    filterItems: {
      get() {
        return this.items.filter(val => {
          return Object.keys(val).some(
            v =>
              val[v] &&
              val[v]
                .toString()
                .toLowerCase()
                .indexOf(this.itemsKeywords.toLowerCase()) !== -1
          );
        });
      },
      set(val) {
        this.items = val;
      }
    },

    getPriority() {
      const priorityTypes = [
        { label: 1, name: "服务请求" },
        { label: 2, name: "标准变更" }
      ];
      let varia = undefined;
      if (this.productCode && this.maintenanceCode) {
        varia = PRIORITY[this.productCode][this.maintenanceCode];
      } else {
        varia = 1;
      }
      const values = priorityTypes.filter(v => v.label === varia);
      return values;
    },

    getItemShow() {
      return function(type) {
        if (this.productCode && this.maintenanceCode) {
          return FORM_ITEM_SHOW[this.productCode][
            this.maintenanceCode
          ].includes(type);
        } else {
          return false;
        }
      };
    },

    rules() {
      var checkItems = (rule, value, callback) => {
        if (
          !value ||
          value === "[]" ||
          (Object.prototype.toString.call(value) === "[object Array]" &&
            value.length === 0)
        ) {
          return callback(new Error("操作内容为空"));
        } else {
          callback();
        }
      };
      return {
        description: [
          { required: true, message: "请输入简要描述", trigger: "change" },
          { min: 1, message: "简要描述最小长度为1", trigger: "change" },
          { max: 255, message: "简要描述最大长度为255", trigger: "change" }
        ],
        priority: [
          { required: true, message: "请选择工单类型", trigger: "change" }
        ],
        work_order_name: [
          { required: true, message: "请设置工单标题", trigger: "change" },
          { min: 2, message: "工单标题最小长度为2", trigger: "change" },
          { max: 64, message: "工单标题最大长度为64", trigger: "change" }
        ],
        top_system: [
          { required: true, message: "请选择所属 TOP 系统", trigger: "change" }
        ],
        phone: [
          { required: true, validator: validatePhone, trigger: "change" }
        ],
        email: [
          { required: true, validator: validateEmail, trigger: "change" }
        ],
        items: [{ validator: checkItems, trigger: "change" }],
        hold_emp_no: [
          {
            required: true,
            message: "请选择数据库用户持有人",
            trigger: "change"
          }
        ],
        reason: [
          { required: true, message: "请输入紧急执行原因", trigger: "change" },
          { min: 1, message: "紧急执行原因最小长度为1", trigger: "change" },
          { max: 255, message: "紧急执行原因最大长度为255", trigger: "change" }
        ],
        schedule_begin_time: [
          { required: true, message: "请选择开始执行时间", trigger: "change" }
        ],
        plan_use_time: [
          { required: true, message: "请选择计划使用时长", trigger: "change" }
        ],
        project_code: [
          {
            required: this.getProjectCode,
            message: "请输入项目编码",
            trigger: "change"
          }
        ],
        project: [
          {
            required: this.getmaintenanceCode,
            message: "请输入项目名称",
            trigger: "change"
          }
        ]
      };
    },

    getProjectCode() {
      if (this.productCode && this.maintenanceCode) {
        return FORM_ITEM_PROJECT_VALIDATE[this.productCode][
          this.maintenanceCode
        ];
      } else {
        return false;
      }
    },

    getmaintenanceCode() {
      if (this.productCode && this.maintenanceCode) {
        return FORM_ITEM_PROJECT_VALIDATE[this.productCode][
          this.maintenanceCode
        ];
      } else {
        return false;
      }
    }
  },

  watch: {},

  created() {
    const paramId = this.$route.params.id;
    paramId && this.setFormData(paramId);

    this.setChecked();
    // 查询top系统
    this.getTopSystem();

    !this.schedule_begin_time && this.setBeginTime();
    setTimeout(() => {
      this.sheetLoading = false;
    }, 500);
  },

  mounted() {
    this.$eventBus.$on("stepClick", obj => {
      if (
        obj.path === "third" ||
        Object.prototype.toString.call(obj.path - 0) === "[object Number]"
      ) {
        if (obj.val === 2) {
          const p_id = this.$route.query.p_id;
          const p_code = this.$route.query.p_code;
          const p_name = this.$route.query.p_name;
          this.$router.push({
            path: "/maintenance/sheet/add/second",
            query: {
              p_id,
              p_code,
              p_name,
              m_id: "",
              m_code: "",
              m_name: ""
            }
          });
        } else if (obj.val === 1) {
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

  methods: {
    ...mapMutations("worksheet", [
      "UPDATE_ITEMS",
      "UPDATE_WORKSHEET",
      "RESET",
      "RESET_FORMDATA",
      "UPDATE_FORMDATA_OTHER",
      "UPDATE_WORKSHEET_FORMDATA"
    ]),
    handleCurrentStep(type) {
      this.handleStep(type);
    },
    async getTopSystem() {
      const res = await this.$ajax.get(GET_TOP_SYSTEM);
      this.topSystems = res.data;
    },
    async handleSubmit() {
      const valid = await this.$refs["createForm"].validate();
      if (valid) {
        const { p_id, m_id } = this.$route.query;
        const values = {
          ...this.$store.state.worksheet.formData,
          product: p_id,
          handle_type: m_id
        };

        const res = await this.$ajax.post(SAVE_WORK_ORDER, values);
        if (res.code === 0) {
          const { orderId = 0 } = res.data;
          // 如果保存成功记录IDx下次就不用了继续调接口了
          this.UPDATE_FORMDATA_OTHER({
            type: "id",
            payload: {
              id: orderId
            }
          });
          const res1 = await this.$ajax.post(ADD_WORK_ORDER, {}, [orderId]);
          if (res1.code === 0) {
            this.$message({
              message: "工单提交成功！",
              type: "success"
            });
          }
        }
        this.$router.push("/maintenance/search/list");
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    async showSubmitDialog() {
      const valid = await this.$refs["createForm"].validate();
      if (valid) {
        this.submitVisible = true;
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    handleReload() {
      this.tableLoading = true
      setTimeout(() => {this.tableLoading = false}, 500) 
    },
    handleSearch(val) {
      this.tableLoading = true
      setTimeout(() => {this.tableLoading = false}, 500) 
      this.itemsKeywords = val.keywords;
    },

    showAddItemDialog() {
      this.visible = true;
    },
    showBatchImportDialog() {
      this.importVisible = true;
    },
    addItem(value) {
      this.tableLoading = true
      setTimeout(() => {this.tableLoading = false}, 500) 
      let values = [];
      if (Object.prototype.toString.call(value) === "[object Object]") {
        const param = {
          ...value,
          tableId: uuid.v1()
        };
        values.push(param);
      } else if (Object.prototype.toString.call(value) === "[object Array]") {
        values = value.map((item, key) => {
          return { ...item, tableId: uuid.v1() };
        });
      }
      const itemsTmp = [...this.items];
      values.map((item, key) => {
        itemsTmp.unshift(item);
      });

      this.UPDATE_ITEMS(itemsTmp);
    },

    async deleteItems() {
      console.log("==========>", [...this.items]);
      const confirm = await this.$confirm(
        `确定要删除已选的 ${this.selections.length} 项吗？`,
        "删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      );
      if (confirm === "confirm") {
        this.tableLoading = true
        setTimeout(() => {this.tableLoading = false}, 500) 
        const selections = this.selections.map(v => v.tableId);
        const itemsTmp = [...this.items];
        
        const newArr = itemsTmp.filter((val, key) => !selections.includes(val.tableId));
        // this.fetchConfig.customData = customData;
        this.UPDATE_ITEMS(newArr);
        this.$message({
          message: "删除成功",
          type: "success"
        });
      }
    },
    async remoteMethod(query) {
      let isSearch = false;
      const flag =
        parseInt(query) === 0 ? true : parseInt(query).toString() === query;
      if (flag) {
        isSearch = query.length >= 4;
      } else {
        isSearch = query.length >= 2;
      }
      if (query !== "" && isSearch) {
        this.loading = true;
        const res = await this.$ajax.get(GET_HOLD_USER_LIST, {
          hold_emp_no: query
        });
        this.loading = false;
        this.remoteOptions = res.data.map(v => {
          return { ...v, value: v.hold_emp_no, name: v.hold_name };
        });
      } else {
        this.remoteOptions = [];
      }
    },
    async showSaveDialog() {
      // const valid = await this.$refs["createForm"].validate();
      // if (valid) {
      //   this.saveVisible = true;
      // }

      this.saveVisible = true;
    },
    beginTimeChange(val) {
      const excuteTime = new Date(val).getTime();
      const nowTime = Date.now();
      if (excuteTime < nowTime) {
        this.$message.error("开始执行时间不能早于当前时间！");
        this.schedule_begin_time = "";
        return false;
      }
      this.schedule_begin_time = val;
    },
    setBeginTime() {
      const specificTimeStr = " 19:00:00";
      const nowDateTime = Date.now();

      const nowDateStr = this.getTimeStr();

      const todayTimeStr = nowDateStr + specificTimeStr;

      const defaultDateTime = new Date(todayTimeStr).getTime();

      if (nowDateTime > defaultDateTime) {
        const nextTime =
          new Date(nowDateStr + specificTimeStr).getTime() + 8.64e7;
        this.schedule_begin_time = this.getTimeStr(nextTime) + specificTimeStr;
        return false;
      }

      this.schedule_begin_time = this.getTimeStr() + specificTimeStr;
    },
    getTimeStr(time) {
      let date = new Date();
      if (time) date = new Date(time);
      const month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const dateStr = date.getFullYear() + "-" + month + "-" + day;
      return dateStr;
    },
    handleStep(type) {
      if (type === "minus") {
        const p_id = this.$route.query.p_id;
        const p_code = this.$route.query.p_code;
        const p_name = this.$route.query.p_name;
        this.$router.push({
          path: "/maintenance/sheet/add/second",
          query: {
            p_id,
            p_code,
            p_name,
            m_id: "",
            m_code: "",
            m_name: ""
          }
        });
        return false;
      }
    },
    handleChangeEmp(val) {
      const item = this.remoteOptions.filter(v => v.hold_emp_no === val)[0];
      this.UPDATE_FORMDATA_OTHER({
        type: "hold_emp_name",
        payload: {
          hold_emp_name: val ? item.hold_name : ""
        }
      });
      this.UPDATE_FORMDATA_OTHER({
        type: "hold_phone",
        payload: {
          hold_phone: val ? item.hold_phone : ""
        }
      });
      this.UPDATE_FORMDATA_OTHER({
        type: "hold_email",
        payload: {
          hold_email: val ? item.hold_email : ""
        }
      });
    },
    async setFormData(paramId) {
      const res = await this.$ajax.get(GET_WORKSHEET_DETAIL, {}, [paramId]);
      const res1 = await this.$ajax.get(GET_WORKSHEET_ITEM, {
        work_order_id: res.data.id
      });

      this.UPDATE_WORKSHEET_FORMDATA(res.data);
      this.UPDATE_ITEMS(res1.data.list);
    },
    setChecked() {
      const { p_id, p_code, p_name, m_id, m_code, m_name } = this.$route.query;
      this.productCode = p_code;
      this.productName = p_name;
      this.maintenanceCode = m_code;
      this.maintenanceName = m_name;
      // work_order_name需要单独做处理
      this.UPDATE_FORMDATA_OTHER({
        type: "work_order_name",
        payload: {
          work_order_name: p_name + "-" + m_name
        }
      });
      const { phone, email } = cache.get("user") || {};
      this.UPDATE_FORMDATA_OTHER({
        type: "phone",
        payload: {
          phone
        }
      });
      this.UPDATE_FORMDATA_OTHER({
        type: "email",
        payload: {
          email
        }
      });
    }
  },
  destroyed() {
    // this.RESET();
    this.RESET_FORMDATA();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sheet_create {
  position: relative;
  min-height: 355px;
  overflow-y: auto;
  background: $appMainBg;
  padding: 20px 15px;
  .create_third {
    .create_content {
      .sheet-cont-title {
        font-weight: bold;
        .checked-icon {
          display: inline-block;
          width: 2px;
          height: 30px;
          background: #4a8df0;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
      .content-wrapper {
        .section {
          .sub-title {
            font-size: 16px;
            font-weight: 600;
            height: 45px;
            line-height: 25px;
            padding-bottom: 20px;
            color: $textLevelA;
            .checked-icon {
              display: inline-block;
              width: 4px;
              height: 16px;
              background: $menuCheckedBg;
              margin-right: 5px;
              vertical-align: middle;
            }
          }
          .sub-content {
            padding-left: 20px 15px;
            /deep/ .el-form-item__label {
              font-weight: 500;
            }
            /deep/ .el-form-item__content .el-input {
              width: 400px;
            }
            /deep/ .el-form-item__content .el-textarea__inner {
              width: 400px;
            }
            /deep/ .el-input-group__prepend .el-input {
              width: 100px;
            }
            .remark-span {
              color: $textLevelD;
            }
            .project_form {
              display: flex;
              /deep/ .el-form-item {
                width: 440px;
              }
            }
          }
          .btn-box {
            padding-top: 30px;
          }
        }
      }
      /deep/ .custom-table .el-form-item__content {
        margin-left: 0 !important;
      }
    }
    .create_bottom {
      font-size: 0;
      margin: 100px 0 0 0;
      text-align: center;
    }
  }
}
</style>
