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
          label: '架构类型',
          prop: 'instance_type'
        },
        {
          label: '架构',
          prop: 'architecture'
        },
        {
          label: '数据库版本',
          prop: 'db_version'
        },
        {
          label: '计算规格',
          prop: 'db_spec'
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
          label: '日志存储容量',
          prop: 'disk_log_size',
          render(h, { row }) {
            return (
              <span>{ row.disk_log_size ? `${row.disk_log_size} G` : `-` }</span>
            )
          }
        },
        {
          label: '数据库用户名',
          prop: 'root_name'
        },
        {
          label: '数据库密码',
          prop: 'root_password',
          render() {
            return <span>******</span>
          }
        },
        {
          label: '字符集',
          prop: 'character_set'
        },
        {
          label: '最大连接数',
          prop: 'max_connections'
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
