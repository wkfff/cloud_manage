<!-- Daniel -->
<template>
  <div>
    <CloudForm :fields="fieldsProps" :config="configProps" ref="db2Parameter"/>
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
  name: "Db2Parameter",

  mixins: [FormMixin],

  data() {
    return {
      instances: [],
      databases: [],
      param_types: [],
      param_keys: [],
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
          type: 'radio',
          label: '主机信息',
          prop: 'switch',
          defaultValue: '0',
          options: {
            type: 'button',
            radioOptions: [
              { label: '使用 IP 地址', value: '0' },
              { label: '使用主机名', value: '1' }
            ]
          },
          events: {
            change: val => {
              _this.isHost = val !== '0'
            }
          }
        },
        {
          type: "input",
          label: "",
          prop: "host",
          hidden: _this.isHost,
          options: {
            placeholder: '请输入 IP 地址'
          },
          events: {
            change: val => {
              console.log(val);
              _this.getInstances(val, 'ip');
              _this.$refs["db2Parameter"].setFieldValue({
                object_owner: undefined,
                instance_name: undefined
              });
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
            change: (val) => {
              console.log(val)
              _this.getInstances(val, 'host')
              _this.$refs["db2Parameter"].setFieldValue({
                object_owner: undefined,
                instance_name: undefined
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
              console.log(val);
              _this.getDatabases(val);
              _this.$refs["db2Parameter"].setFieldValue({
                object_owner: undefined
              });
            }
          }
        },
        {
          type: "select",
          label: "数据库名",
          prop: "object_owner",
          options: {
            placeholder: "请选择数据库名",
            selectOptions: _this.databases
          }
        },
        {
          type: "select",
          label: "参数类型",
          prop: "param_type",
          options: {
            placeholder: "请选择参数类型",
            selectOptions: _this.param_types
          },
          events: {
            change: val => {
              console.log(val);
              const value = _this.param_types.filter(v => v.name === val)[0]
              _this.getParamKeys(value);
              _this.$refs["db2Parameter"].setFieldValue({
                param_key: undefined
              });
            }
          }
        },
        {
          type: "select",
          label: "参数名",
          prop: "param_key",
          options: {
            placeholder: "请选择参数名",
            selectOptions: _this.param_keys
          }
        },
        {
          type: "number",
          label: "参数值（修改后）",
          prop: "param_value",
          options: {
            min: 0,
            max: 0,
            placeholder: "参数范围：0",
            position: "right"
          },
          spanRender: () => {
            return <span>注：该参数将在修改生效12小时后自动恢复原值。</span>;
          }
        }
      ];
    },

    // 传入Form的config
    configProps() {
      const _this = this;
      return {
        rules: {
          host: [
            { required: true, message: "请输入主机信息", trigger: "change" }
          ],
          instance_name: [
            { required: true, message: "请选择实例名", trigger: "change" }
          ],
          object_owner: [
            { required: true, message: "请选择数据库名", trigger: "change" }
          ],
          param_type: [
            { required: true, message: "请选择参数类型", trigger: "change" }
          ],
          param_key: [
            { required: true, message: "请选择参数名", trigger: "change" }
          ],
          param_value: [
            {
              required: true,
              message: "请输入修改后的参数值",
              trigger: "change"
            }
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
    // 获取参数类型
    this.getParameter()
  },

  methods: {
    async getInstances(host, type) {
      const res = await this.$ajax.get(GET_INSTANCE_BY_HOST, {
        host,
        dbType: "DB2",
        hostType: type
      });
      this.instances = res.data.map(v => {
        return { ...v, label: v.name, value: v.name };
      });
    },
    getDatabases(instance) {
      const [instanceTem] = this.instances.filter(v => v.value === instance)
      this.databases = instanceTem.dbnames.map(v => {
        return { label: v, value: v }
      })
    },
    async getParameter() {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: 'DB2_PARAM_TYPE'
      })
      this.param_types = res.data.map(v => {
        return { ...v, label: v.name, value: v.name }
      })
      // 设置权限的默认值 设置被授权用户的默认值
      // this.$refs['db2Parameter'].setFieldValue({
      //   param_key: undefined,
      //   switch: '0'
      // })
    },
    async getParamKeys(param_types) {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: param_types.code
      })
      this.param_keys = res.data.map(v => {
        return { ...v, label: v.name, value: v.name }
      })
    },
    // async querySearchAsync(queryString, cb) {
    //   if (queryString.length < 3 ) return false
    //   let restaurants = [];
    //   const res = await this.$ajax.get(GET_HOST_INFO, {
    //     host: queryString,
    //     dbType: 'DB2',
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
          dbType: 'DB2',
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