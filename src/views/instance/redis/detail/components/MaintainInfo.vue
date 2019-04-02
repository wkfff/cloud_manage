<!--
  @author:  lzc
  @date:    2019-01-23
  @desc:    维护配置
  @require:
-->
<template>
  <div>
    <cloud-detail
      :fields="detailFields"
      :config="detailConfig"
      :fieldsValues="fieldsValues.maintenance || {}"
      @configure="showDialog"
    />
    
    <!--设置维护信息-->
    <MaintainConfigDialog
      v-model="visible"
      :data-info="fieldsValues"
      @success="$emit('update')"
    />
  </div>
</template>

<script type="text/jsx">
import CloudDetail from '@/components/CloudDetail'
import MaintainConfigDialog from './MaintainConfigDialog'

export default {
  name: 'MaintainInfo',
  
  components: {
    CloudDetail,
    MaintainConfigDialog
  },
  
  props: {
    fieldsValues: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      detailConfig: {
        title: '维护信息',
        hasSettingBtn: false, // 设置按钮
        disableEdit: true, // 不能编辑
        colSpan: 12, // 24为1行，12即2列
        labelWidth: 120
      },
      visible: false
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '业务负责人',
          prop: 'service_time',
          colSpan: 24
        },
        {
          label: '开发室经理',
          prop: 'dev_manager_name'
        },
        {
          label: '开发负责人',
          prop: 'dev_leader_name'
        },
        {
          label: '系统负责人',
          prop: 'dev_leader_name'
        },
        {
          label: '数据库负责人',
          prop: 'dev_leader_name'
        },
        {
          label: '工作日维护时间',
          prop: 'maintain_work_day'
        },
        {
          label: '节假日维护时间',
          prop: 'maintain_weekend'
        },
        {
          label: 'RTO时长',
          prop: 'rto'
        },
        {
          label: 'RPO时长',
          prop: 'rpo'
        }
      ]
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    showDialog() {
      this.visible = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.item-content-box{
  .item-box{
    .title{}
    .value-text{
      margin-left: 15px;
    }
  }
}
</style>
