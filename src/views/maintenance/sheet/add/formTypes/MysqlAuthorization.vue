<!-- Daniel -->
<template>
  <div>
    <CloudForm :fields="fieldsProps" :config="configProps" ref="mysqlAuthorization"/>
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
  name: "MysqlAuthorization",

  mixins: [FormMixin],

  data() {
    return {
      parameters: [],
      instances: [],
      showPassword: false,
      isHost: false,
      remoteOptions: [],
      loading: false
    };
  },

  computed: {
    permissionDefault() {
      return this.parameters[0] && this.parameters[0].value;
    },

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
              const valid = _this.$refs["mysqlAuthorization"].validateField(
                "ip",
                valid => {
                  if (!valid) {
                    console.log(val);
                    _this.getInstances(val, "ip");
                    _this.$refs["mysqlAuthorization"].setFieldValue({
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
              _this.$refs["mysqlAuthorization"].setFieldValue({
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
                _this.$refs["mysqlAuthorization"].setFieldValue({
                  host: item.host
                });
              }
            }
          }
        },
        {
          type: "input",
          label: "Schema名",
          prop: "object_owner",
          options: {
            placeholder: "请输入Schema名（数据库名）"
          }
        },
        {
          type: "input",
          label: "对象名",
          prop: "object_name",
          defaultValue: "ALL",
          options: {
            placeholder: "请输入对象名，默认为ALL"
          }
        },
        {
          type: "select",
          label: "权限名",
          prop: "authority",
          options: {
            selectOptions: _this.parameters,
            placeholder: "请选择权限名",
            disabled: true
          }
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
                _this.$refs["mysqlAuthorization"].setFieldValue({
                  password: "cmb#2019"
                });
              } else {
                _this.$refs["mysqlAuthorization"].setFieldValue({
                  password: ""
                });
              }
            }
          }
          // extraInputRender: () => {
          //   return <el-input placeholder="请输入用户名（帐号名）"/>
          // }
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

  watch: {},

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
        type: "MYSQL_AUTHORIZATION"
      });
      this.parameters = res.data.map(v => {
        return { ...v, label: v.name, value: v.name };
      });
      // 设置权限的默认值 设置被授权用户的默认值
      this.$refs["mysqlAuthorization"].setFieldValue({
        authority: this.parameters[0] && this.parameters[0]["value"]
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
          ...v,
          label: v.name,
          value: v.name,
          host: v.hostname ? v.hostname : ""
        };
      });
    },
    // async querySearchAsync(queryString, cb) {
    //   if (queryString.length < 3 ) return false
    //   let restaurants = [];
    //   const res = await this.$ajax.get(GET_HOST_INFO, {
    //     host: queryString,
    //     dbType: 'MYSQL',
    //   });
    //   restaurants = res.data.map(v => {
    //     return { value: v, label: v };
    //   });
    //   var results = queryString
    //     ? restaurants.filter(this.createStateFilter(queryString))
    //     : restaurants;
    //   cb(results);
    // },
    // createStateFilter(queryString) {
    //   return state => {
    //     return (
    //       state.value.toLowerCase().indexOf(queryString.toLowerCase()) !==
    //       -1
    //     );
    //   };
    // },
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
