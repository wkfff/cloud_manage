<!--
  @author:  lzc
  @date:    2019-03-12
  @file:    xx
  @require:
-->
<template>
  <div class="info-wrapper">
    <CloudDetail
      :fields="detailFields"
      :config="detailConfig"
      :fields-values="createMysqlFormData"
    />
  </div>
</template>

<script type="text/jsx">
import CloudDetail from '@/components/CloudDetail'
import { mapGetters } from 'vuex'

export default {
  name: 'ViewInfo',
  
  components: {
    CloudDetail
  },
  
  props: {
    instanceType: {
      type: Array,
      default: () => []
    },
    rpoObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    rtoObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    systemLists: {
      type: Array,
      default: () => []
    },
    projectLists: {
      type: Array,
      default: () => []
    }
  },
  
  data() {
    return {
      detailConfig: {
        disableEdit: true,
        hideTitle: true,
        onlyShow: true,
        formItemStyle: {
          'margin-bottom': '10px'
        }
      }
    }
  },
  
  computed: {
    ...mapGetters('built', ['createMysqlFormData']),
    detailFields() {
      const _this = this
      return [
        {
          label: '区域',
          prop: 'city'
        },
        {
          label: '数据库类型',
          prop: 'instance_type',
          render(h) {
            return (
              <span>MySQL</span>
            )
          }
        },
        {
          label: '实例名',
          prop: 'instance_name'
        },
        {
          label: '描述',
          prop: 'instance_desc'
        },
        {
          label: '所属业务系统',
          prop: 'business_name',
          render(h, { row }) {
            let str = '-'
            _this.systemLists.forEach(v => {
              if (v.value === row.business) {
                str = v.label
              }
            })
            return (
              <span>{ str }</span>
            )
          }
        },
        {
          label: '所属项目',
          prop: 'project_name',
          render(h, { row }) {
            let str = '-'
            _this.projectLists.forEach(v => {
              if (v.value === row.project_name) {
                str = v.label
              }
            })
            return (
              <span>{ str }</span>
            )
          }
        },
        {
          label: '架构类型',
          prop: 'instance_type_name'
        },
        {
          label: '数据库版本',
          prop: 'db_version'
        },
        {
          label: '计算规格',
          prop: 'db_spec',
          render(h, { row }) {
            const str = row.db_spec ? row.db_spec.replace('C', '核') : '-'
            return (
              <span>{ str }</span>
            )
          }
        },
        {
          label: '数据存储容量',
          prop: 'disk',
          render(h, { row }) {
            return (
              <span>{ row.disk > 0 ? `${row.disk}G` : '-' }</span>
            )
          }
        },
        {
          label: '日志存储容量',
          prop: 'disk_log_size',
          render(h, { row }) {
            return (
              <span>{ row.disk_log_size > 0 ? `${row.disk_log_size}G` : '-' }</span>
            )
          }
        },
        {
          label: '数据库用户名',
          prop: 'root_name'
        },
        {
          label: '数据库密码',
          prop: 'root_password'
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
          label: '申请数量',
          prop: 'apply_num'
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
          label: '维护时间',
          prop: 'maintain_work_day',
          render(h, { row }) {
            const workDay = Array.isArray(row.maintain_work_day) ? `${row.maintain_work_day[0]}-${row.maintain_work_day[1]}` : '-'
            const weekendDay = Array.isArray(row.maintain_weekend) ? `${row.maintain_weekend[0]}-${row.maintain_weekend[1]}` : '-'
            return (
              <div>
                <div>工作日{ workDay }</div>
                <div>节假日{ weekendDay }</div>
              </div>
            )
          }
        },
        {
          label: 'RTO',
          prop: 'rto',
          render(h, { row }) {
            return (
              <span>{ row.rto ? `${_this.rtoObj[row.rto]}` : '-' }</span>
            )
          }
        },
        {
          label: 'RPO',
          prop: 'rpo',
          render(h, { row }) {
            return (
              <span>{ row.rpo ? `${_this.rpoObj[row.rpo]}` : '-' }</span>
            )
          }
        },
        {
          label: '业务负责人',
          prop: 'app_owner'
        },
        {
          label: '开发负责人',
          prop: 'dev_leader_name'
        },
        {
          label: '开发室经理',
          prop: 'dev_manager_name'
        },
        {
          label: '推荐管理员',
          prop: 'recommend_leader'
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
.info-wrapper {
  padding: 20px 5px;
  .item {
    position: relative;
    font-size: 0;
    line-height: 0;
    padding-left: 100px;
    .label, .value {
      display: inline-block;
      vertical-align: top;
      font-weight: 500;
      line-height: 1.5;
    }
    .label {
      box-sizing: border-box;
      width: 100px;
      padding: 6px 8px;
      padding-left: 0;
      font-size: 14px;
      color: #333;
      position: absolute;
      left: 0;
      top: 0;
      color: $textLevelC;
      word-break: break-all;
      word-wrap: break-word;
    }
    .value {
      word-break: break-all;
      font-size: 14px;
      padding: 7px 7px 7px 0;
      div, span, p {
        display: inline-block;
        margin: 0;
      }
      .unit {
        margin-left: 8px;
      }
    }
  }
}
</style>
