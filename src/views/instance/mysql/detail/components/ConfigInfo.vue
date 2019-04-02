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
          label: '架构',
          prop: 'architecture'
        },
        {
          label: '数据库版本',
          prop: 'db_version'
        },
        {
          label: '计算规格',
          prop: 'db_spec',
          render(h, { row }) {
            return (
              <span>{ row.db_spec ? (row.db_spec.replace('C', '核')) : '' }</span>
            )
          }
        },
        {
          label: '数据存储容量',
          prop: ''
        },
        {
          label: '日志存储容量',
          prop: ''
        },
        {
          label: '字符集',
          prop: ''
        },
        {
          label: '节点数量',
          prop: 'node_num'
        },
        {
          label: '备份策略',
          prop: 'created_at'
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
