<!-- Daniel -->
<template>
  <div>
    <CloudForm :fields="fieldsProps" :config="configProps" ref="mysqlParameter"/>
  </div>
</template>

<script>
import FormMixin from "./formMixin";
import {
  GET_WORKSHEET_DICTIONARY,
  GET_INSTANCE_BY_HOST,
  GET_HOST_INFO
} from "@/api/worksheet";

export default {
  name: "MysqlParameter",

  mixins: [FormMixin],

  data() {
    return {
      parameters: [],
      instances: [],
      isHost: false,
      remoteOptions: [],
      loading: false
    };
  },

  computed: {
    // 传入Form的fileds
    fieldsProps() {
      const _this = this;
      return [
        {
          label: "产品/服务",
          render: () => {
            return <span>{_this.productNameProps}</span>;
          }
        },
        {
          label: "运维类型",
          render: () => {
            return <span>{_this.maintenanceNameProps}</span>;
          }
        },
        {
          type: "radio",
          label: "主机信息",
          prop: "switch",
          defaultValue: "0",
          options: {
            type: "button",
            radioOptions: [
              { label: "使用 IP 地址", value: "0" },
              { label: "使用主机名", value: "1" }
            ]
          },
          events: {
            change: val => {
              _this.isHost = val !== "0";
            }
          }
        },
        {
          type: "input",
          label: "",
          prop: "ip",
          hidden: _this.isHost,
          options: {
            placeholder: "请输入 IP 地址"
          },
          events: {
            change: val => {
              const valid = _this.$refs["mysqlParameter"].validateField(
                "ip",
                valid => {
                  if (!valid) {
                    console.log(val);
                    _this.getInstances(val, "ip");
                    _this.$refs["mysqlParameter"].setFieldValue({
                      instance_name: ""
                    });
                  }
                }
              );
            }
          }
        },
        {
          type: "select",
          label: "",
          prop: "host",
          hidden: !_this.isHost,
          options: {
            selectOptions: _this.remoteOptions,
            placeholder: "请输入主机名",
            remoteMethod: _this.remoteMethod,
            filterable: true,
            clearable: true,
            remote: true,
            reserveKeyword: true,
            noDataText: "找不到相关数据",
            loading: _this.loading
          },
          events: {
            change: val => {
              console.log(val);
              _this.getInstances(val, "host");
              _this.$refs["mysqlParameter"].setFieldValue({
                instance_name: ""
              });
            }
          }
        },
        {
          type: "select",
          label: "实例名",
          prop: "instance_name",
          options: {
            placeholder: "请选择实例名",
            selectOptions: _this.instances
          },
          events: {
            change: val => {
              console.log("=====", _this.instances);
              if (!_this.isHost) {
                const item = _this.instances.filter(v => v.value === val)[0];
                // _this.getInstances(val, "host");
                _this.$refs["mysqlParameter"].setFieldValue({
                  host: item.host
                });
              }
            }
          }
        },
        {
          type: "select",
          label: "参数名",
          prop: "param_key",
          options: {
            placeholder: "请选择参数名",
            selectOptions: _this.parameters
          }
        },
        {
          type: "number",
          label: "参数值（修改后）",
          prop: "param_value",
          options: {
            min: 240,
            max: 1500,
            placeholder: "参数范围：240-1500",
            position: "right"
          }
        }
      ];
    },

    // 传入Form的config
    configProps() {
      const _this = this;
      var checkIP = (rule, value, callback) => {
        var pattern = /(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}/g;
        if (value && !pattern.test(value)) {
          return callback(new Error("请输入正确的 IP 地址"));
        } else {
          callback();
        }
      };
      return {
        rules: {
          ip: [
            { required: true, message: "请输入 IP 地址", trigger: "change" },
            { validator: checkIP, trigger: "change" }
          ],
          host: [
            { required: true, message: "请输入主机信息", trigger: "change" }
          ],
          instance_name: [
            { required: true, message: "请选择实例名", trigger: "change" }
          ],
          param_key: [
            { required: true, message: "请选择参数名", trigger: "change" }
          ],
          switch: [
            { required: true, message: "请选择主机orIP", trigger: "change" }
          ],
          param_value: [
            {
              required: true,
              message: "请输入修改后的参数值",
              trigger: "change"
            }
          ]
        },
        labelWidth: 150
      };
    }
  },

  created() {
    if (
      Object.prototype.toString.call(this.parameters) === "[object Array]" &&
      this.parameters.length === 0
    ) {
      // 获取参数列表
      this.getParameter();
    }
  },

  methods: {
    async getParameter() {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: "MYSQL_PARAM"
      });
      this.parameters = res.data.map(v => {
        return { ...v, label: v.name, value: v.name };
      });
    },
    async getInstances(host, type) {
      const res = await this.$ajax.get(GET_INSTANCE_BY_HOST, {
        host,
        dbType: "MYSQL",
        hostType: type
      });
      this.instances = res.data.map(v => {
        return {
          label: v.name,
          value: v.name,
          host: v.hostname ? v.hostname : ""
        };
      });
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const res = await this.$ajax.get(GET_HOST_INFO, {
          host: query,
          dbType: "MYSQL"
        });
        this.loading = false;
        this.remoteOptions = res.data.map(v => {
          return { value: v, label: v };
        });
      } else {
        this.remoteOptions = [];
      }
    }
  }
};
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
</style>
