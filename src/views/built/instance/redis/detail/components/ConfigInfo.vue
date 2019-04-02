<!--
  @author:  lzc
  @date:    2019-01-23
  @desc:    配置信息
  @require:
-->
<template>
  <div>
    <cloud-detail
      :fields="detailFields"
      :config="detailConfig"
      :fieldsValues="fieldsValues"
    />
  </div>
</template>

<script type="text/jsx">
import CloudDetail from '@/components/CloudDetail'

export default {
  name: 'ConfigInfo',
  
  components: {
    CloudDetail
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
        title: '配置信息',
        labelWidth: 120,
        disableEdit: true,
        colSpan: 12
      }
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '类型',
          prop: 'instance_type'
        },
        {
          label: '数据库版本',
          prop: 'db_version'
        },
        {
          label: '总内存',
          prop: 'mem_size',
          render(h, { row }) {
            return (
              <span>{ row.mem_size ? `${row.mem_size} G` : `-` }</span>
            )
          }
        },
        {
          label: '数据存储容量',
          prop: 'disk',
          render(h, { row }) {
            return (
              <span>{ row.disk ? `${row.disk} G` : `-` }</span>
            )
          }
        },
        {
          label: '数据库密码',
          prop: 'root_password',
          render() {
            return <span>******</span>
          }
        },
        {
          label: '节点数量',
          prop: 'node_num'
        },
        {
          label: '备份策略',
          prop: 'backup_policy'
        },
        
        {
          label: '业务服务时间',
          prop: 'service_time'
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
  
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
