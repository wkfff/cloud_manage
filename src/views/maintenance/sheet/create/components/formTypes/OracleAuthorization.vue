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
} from '@/api/worksheet'

export default {
  name: 'OracleAuthorization',
  
  mixins: [FormMixin],
  
  data() {
    return {
      permission_types: [],
      permissions: [],
      instances: [],
      showPassword: false,
      isHost: false,
      remoteOptions: [],
      loading: false
    }
  },
  
  computed: {
    // 传入Form的fileds
    fieldsProps() {
      const _this = this
      return [
        {
          label: '产品/服务',
          render: () => {
            return <span>{ _this.productNameProps }</span>
          }
        },
        {
          label: '运维类型',
          render: () => {
            return <span>{ _this.maintenanceNameProps }</span>
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
              _this.$refs["oracleAuthorization"].setFieldValue({
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
              _this.$refs["oracleAuthorization"].setFieldValue({'instance_name': undefined})
            }
          }
        },
        {
          type: 'select',
          label: '实例名',
          prop: 'instance_name',
          options: {
            placeholder: '请选择实例名',
            selectOptions: _this.instances
          }
        },
        {
          type: 'input',
          label: 'Schema名',
          prop: 'object_owner'
        },
        {
          type: 'input',
          label: '对象名',
          prop: 'object_name'
        },
        {
          type: 'select',
          label: '权限类型',
          prop: 'authority_type',
          options: {
            placeholder: '请选择权限类型',
            selectOptions: _this.permission_types
          },
          events: {
            change: val => {
              const value = _this.permission_types.filter(v => v.name === val)[0]
              _this.getPermissions(value)
            }
          }
        },
        {
          type: 'select',
          label: '权限名',
          prop: 'authority',
          options: {
            placeholder: '请选择权限名',
            selectOptions: _this.permissions
          }
        },
        {
          type: 'radio',
          label: '被授权用户',
          prop: 'is_create_user',
          defaultValue: '1',
          options: {
            type: 'button',
            radioOptions: [
              { label: '新建用户帐号', value: '1' },
              { label: '使用已有用户帐号', value: '0' }
            ]
          },
          events: {
            change: val => {
              _this.showPassword = val !== '1'
            }
          }
        },
        {
          type: 'input',
          label: '',
          prop: 'grantee',
          options: {
            placeholder: '请输入用户名（帐号名）'
          }
        },
        {
          type: 'input',
          label: '默认用户密码',
          prop: 'password',
          defaultValue: 'cmb#2019',
          hidden: _this.showPassword,
          options: {
            placeholder: '请输入初始密码'
          },
          spanRender: () => {
            return <span>初始密码不允许包含@</span>
          }
        }
      ]
    },
    
    // 传入Form的config
    configProps() {
      const _this = this
      return {
        rules: {
          host: [
            { required: true, message: '请输入主机信息', trigger: 'change' }
          ],
          instance_name: [
            { required: true, message: '请选择实例名', trigger: 'change' }
          ],
          object_owner: [
            {
              required: true,
              message: '请输入Schema名',
              trigger: 'change'
            }
          ],
          object_name: [
            { required: true, message: '请输入对象名', trigger: 'change' }
          ],
          authority_type: [
            { required: true, message: '请选择权限类型', trigger: 'change' }
          ],
          authority: [
            { required: true, message: '请选择权限名', trigger: 'change' }
          ],
          is_create_user: [
            { required: true, message: '请输入被授权用户', trigger: 'change' }
          ],
          grantee: [
            { required: true, message: '请输入用户名（帐号名）', trigger: 'change' }
          ],
          password: [
            { required: true, message: '请输入默认用户密码', trigger: 'change' }
          ],
          switch: [
            { required: true, message: "请选择主机orIP", trigger: "change" }
          ]
        },
        labelWidth: 150
      }
    }
  },
  
  created() {
    if (Object.prototype.toString.call(this.permission_types) === '[object Array]' &&
      this.permission_types.length === 0) {
      // 获取参数列表
      this.getParameter()
    }
  },
  
  methods: {
    async getParameter() {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: 'ORACLE_AUTHORIZATION_TYPE'
      })
      this.permission_types = res.data.map(v => {
        return { ...v, label: v.name, value: v.name }
      })
      // 设置权限的默认值 设置被授权用户的默认值
      // this.$refs['oracleAuthorization'].setFieldValue({
      //   is_create_user: '0',
      //   password: 'cmb#2019',
      //   switch: '0'
      // })
    },
    async getInstances(host, type) {
      const res = await this.$ajax.get(GET_INSTANCE_BY_HOST, {
        host,
        dbType: 'ORACLE',
        hostType: type
      })
      this.instances = res.data.map(v => {
        return { ...v, label: v.name, value: v.name }
      })
    },
    async getPermissions(permission_types) {
      const res = await this.$ajax.get(GET_WORKSHEET_DICTIONARY, {
        type: permission_types.code
      })
      this.permissions = res.data.map(v => {
        return { ...v, label: v.name, value: v.name }
      })
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
}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>

</style>
