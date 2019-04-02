<!-- Daniel -->
<template>
  <div>
    <CloudForm :fields="fieldsProps" :config="configProps" ref="oracleAuthorization"/>
  </div>
</template>

<script>
import FormMixin from "./formMixin";
import {
  GET_WORKSHEET_DICTIONARY,
  GET_INSTANCE_BY_HOST,
  GET_HOST_INFO
} from "@/api/worksheet";
import { ORACLE_AUTHORIZATION_AUTHORITY_TYPE_HIDE } from "@/utils/constant";

export default {
  name: "OracleAuthorization",

  mixins: [FormMixin],

  data() {
    return {
      permission_types: [],
      permissions: [],
      instances: [],
      showPassword: false,
      isHost: false,
      remoteOptions: [],
      loading: false,
      isAuthorityType: true
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
              const valid = _this.$refs["oracleAuthorization"].validateField(
                "ip",
                valid => {
                  if (!valid) {
                    console.log(val);
                    _this.getInstances(val, "ip");
                    _this.$refs["oracleAuthorization"].setFieldValue({
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
              _this.$refs["oracleAuthorization"].setFieldValue({
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
              if (!_this.isHost) {
                const item = _this.instances.filter(v => v.value === val)[0];
                _this.$refs["oracleAuthorization"].setFieldValue({
                  host: item.host
                });
              }
            }
          }
        },
        {
          type: "select",
          label: "权限类型",
          prop: "authority_type",
          options: {
            placeholder: "请选择权限类型",
            selectOptions: _this.permission_types
          },
          events: {
            change: val => {
              const authority_type = _this.permission_types.filter(
                item => item.name === val
              )[0];
              if (
                ORACLE_AUTHORIZATION_AUTHORITY_TYPE_HIDE.includes(
                  authority_type.code.toUpperCase()
                )
              ) {
                _this.isAuthorityType = false;
              } else {
                _this.isAuthorityType = true;
              }
              _this.getPermissions(authority_type);
              _this.$refs["oracleAuthorization"].setFieldValue({
                authority: "",
                object_owner: "",
                object_name: ""
              });
            }
          }
        },
        {
          type: "select",
          label: "权限名",
          prop: "authority",
          options: {
            placeholder: "请选择权限名",
            selectOptions: _this.permissions
          }
        },
        {
          type: "input",
          label: "Schema名",
          prop: "object_owner",
          hidden: !_this.isAuthorityType
        },
        {
          type: "input",
          label: "对象名",
          prop: "object_name",
          hidden: !_this.isAuthorityType
        },
        {
          type: "radio",
          label: "被授权用户",
          prop: "is_create_user",
          defaultValue: "1",
          options: {
            type: "button",
            radioOptions: [
              { label: "新建用户帐号", value: "1" },
              { label: "使用已有用户帐号", value: "0" }
            ]
          },
          events: {
            change: val => {
              _this.showPassword = val !== '1';
              if (val === "1") {
                _this.$refs["oracleAuthorization"].setFieldValue({
                  password: "cmb#2019"
                });
              } else {
                _this.$refs["oracleAuthorization"].setFieldValue({
                  password: ""
                });
              }
            }
          }
        },
        {
          type: "input",
          label: "",
          prop: "grantee",
          options: {
            placeholder: "请输入用户名（帐号名）"
          }
        },
        {
          type: "input",
          label: "默认用户密码",
          prop: "password",
          defaultValue: "cmb#2019",
          hidden: _this.showPassword,
          options: {
            placeholder: "请输入初始密码"
          },
          spanRender: () => {
            return <span>初始密码不允许包含@</span>;
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
          object_owner: [
            {
              required: true,
              message: "请输入Schema名",
              trigger: "change"
            }
          ],
          object_name: [
            { required: true, message: "请输入对象名", trigger: "change" }
          ],
          authority_type: [
            { required: true, message: "请选择权限类型", trigger: "change" }
          ],
          authority: [
            { required: true, message: "请选择权限名", trigger: "change" }
          ],
          is_create_user: [
            { required: true, message: "请输入被授权用户", trigger: "change" }
          ],
          grantee: [
            {
              required: true,
              message: "请输入用户名（帐号名）",
              trigger: "change"
            }
          ],
          password: [
            { required: true, message: "请输入默认用户密码", trigger: "change" }
          ],
          switch: [
            { required: true, message: "请选择主机orIP", trigger: "change" }
          ]
        },
        labelWidth: 150
      };
    }
  },

  created() {
    if (
      Object.prototype.toString.call(this.permission_types) ===
        "[object Array]" &&
      this.permission_types.length === 0
    ) {
      // 获取参数列表
      this.getParameter();
    }
  },

  methods: {
    async getParameter() {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: "ORACLE_AUTHORIZATION_TYPE"
      });
      this.permission_types = res.data.map(v => {
        return { ...v, label: v.name, value: v.name };
      });
    },
    async getInstances(host, type) {
      const res = await this.$ajax.get(GET_INSTANCE_BY_HOST, {
        host,
        dbType: "ORACLE",
        hostType: type
      });
      this.instances = res.data.map(v => {
        return {
          ...v,
          label: v.name,
          value: v.name,
          host: v.hostname ? v.hostname : ""
        };
      });
    },
    async getPermissions(permission_types) {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: permission_types.code
      });
      this.permissions = res.data.map(v => {
        return { ...v, label: v.name, value: v.name };
      });
    },
    async remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const res = await this.$ajax.get(GET_HOST_INFO, {
          host: query,
          dbType: "ORACLE"
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
