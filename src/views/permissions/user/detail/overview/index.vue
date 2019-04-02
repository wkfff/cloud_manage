<!--
  @author:  lzc
  @date:    2019-02-01
  @desc:    用户详情->概览
  @require:
-->
<template>
  <div>
    <CloudDetail
      ref="userDetailOverview"
      :fields="detailFields"
      :config="detailConfig"
    />
  </div>
</template>

<script type="text/ecmascript-6">
import CloudDetail from '@/components/CloudDetail'

export default {
  name: 'UserDetailOverview',
  
  components: {
    CloudDetail
  },
  
  props: {},
  
  data() {
    return {
      detailConfig: {
        title: '基本信息',
        colSpan: 12,
        rules: {
          'display_name': [{ required: true, message: '请输入实例名称', trigger: 'change' }],
          'business_id': [{ required: true, message: '请选择所属业务', trigger: 'change' }],
          'character_set': [{ required: true, message: '请选择字符集', trigger: 'change' }]
        }
      }
    }
  },
  
  computed: {
    detailFields() {
      const _this = this
      return [
        {
          label: '用户名',
          prop: 'display_name',
          type: 'input',
          hasEdit: true
        },
        {
          label: '用户ID',
          prop: 'instance_name'
        },
        {
          label: '所属区域',
          prop: 'area'
        },
        {
          label: '工号',
          prop: 'business'
        },
        {
          label: '状态',
          prop: 'instance_addr'
        },
        {
          label: '描述',
          colSpan: 24,
          prop: 'instance_desc'
        },
        {
          label: '邮箱',
          prop: 'instance_desc'
        },
        {
          label: '登录密码',
          prop: 'instance_desc'
        },
        {
          label: '手机号',
          prop: 'instance_desc'
        },
        {
          label: '创建时间',
          prop: 'instance_desc'
        }
      ]
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
