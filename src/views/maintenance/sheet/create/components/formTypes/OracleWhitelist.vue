<!-- Daniel -->
<template>
  <div>
    <CloudForm :fields="fieldsProps" :config="configProps" ref="oracleWhitelist"/>
  </div>
</template>

<script>
import FormMixin from "./formMixin";
import {
  GET_WORKSHEET_DICTIONARY,
  GET_INSTANCE_BY_HOST,
  GET_HOST_INFO
} from "@/api/worksheet";
import { AUTHORITY_TYPES } from '@/utils/constant'

export default {
  name: "OracleWhitelist",

  mixins: [FormMixin],

  data() {
    return {
      instances: [],
      databases: [],
      authoritys: [],
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
          label: '产品/服务',
          render: () => {
            return <span>{_this.productNameProps}</span>
          }
        },
        {
          label: '运维类型',
          render: () => {
            return <span>{_this.maintenanceNameProps}</span>
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
              _this.$refs["oracleWhitelist"].setFieldValue({
                instance_name: undefined,
                object_owner: undefined
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
              _this.$refs["oracleWhitelist"].setFieldValue({
                instance_name: undefined,
                object_owner: undefined
              })
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
              _this.$refs["oracleWhitelist"].setFieldValue({
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
          label: "提权类型",
          prop: "authority_type",
          options: {
            placeholder: "请选择提权类型",
            selectOptions: _this.authoritys
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
          authority_type: [
            { required: true, message: "请选择提权类型", trigger: "change" }
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
    // 获取提权类型
    this.getAuthorityTypes()
  },

  methods: {
    async getInstances(host, type) {
      const res = await this.$ajax.get(GET_INSTANCE_BY_HOST, {
        host,
        dbType: 'ORACLE',
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
    async getAuthorityTypes() {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: "ORACLE_WHITE_LIST_RIGHT"
      });
      this.authoritys = res.data.map(v => {
        return { ...v, label: AUTHORITY_TYPES[v.name], value: v.name }
      });
      // 设置权限的默认值 设置被授权用户的默认值
      // this.$refs['oracleWhitelist'].setFieldValue({
      //   switch: '0'
      // })
    },
    // async querySearchAsync(queryString, cb) {
    //   if (queryString.length < 3 ) return false
    //   let restaurants = [];
    //   const res = await this.$ajax.get(GET_HOST_INFO, {
    //     host: queryString,
    //     dbType: 'ORACLE',
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
          dbType: 'ORACLE',
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