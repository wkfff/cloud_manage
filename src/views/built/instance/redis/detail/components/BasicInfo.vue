<!--
  @author:  lzc
  @date:    2019-01-23
  @desc:    基本信息
  @require:
-->
<template>
  <div>
    <cloud-detail
      ref="basicDetail"
      :fields="detailFields"
      :config="detailConfig"
      :fieldsValues="fieldsValues"
      @success="editDetail"
    />
  </div>
</template>

<script type="text/jsx">
import CloudDetail from '@/components/CloudDetail'
import { GET_BUSINESS, PATCH_MYSQL } from '@/api/instance'
import { INSTANCE_MYSQL } from '@/utils/constant'

export default {
  name: 'BasicInfo',
  
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
        title: '基本信息',
        disableEdit: true,
        labelWidth: 120,
        colSpan: 12,
        rules: {
          'display_name': [{ required: true, message: '请输入实例名称', trigger: 'change' }],
          'business_id': [{ required: true, message: '请选择所属业务', trigger: 'change' }],
          'character_set': [{ required: true, message: '请选择字符集', trigger: 'change' }]
        }
      },
      businessOptions: [],
      business: null
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '实例名',
          prop: 'display_name',
          type: 'input',
          hasEdit: true
        },
        {
          label: '实例ID',
          prop: 'dbaas_instance_id'
        },
        {
          label: '运行状态',
          prop: 'run_status',
          render: (h, { row }) => {
            return (
              <span class={ `${INSTANCE_MYSQL.RUN_STATUS_COLOR[row['run_status']]} point` }>
                { INSTANCE_MYSQL.RUN_STATUS[row['run_status']] }
              </span>
            )
          }
        },
        {
          label: '描述',
          prop: 'instance_desc',
          type: 'textarea'
        },
        {
          label: '所属业务系统',
          prop: 'business_name'
        },
        {
          label: '所属项目',
          prop: 'project_name'
        },
        {
          label: '所有者',
          prop: 'owner'
        },
        {
          label: '所属用户组',
          prop: 'org_name'
        },
        {
          label: '所在区域',
          prop: 'area'
        },
        {
          label: '所在主机',
          prop: 'machine_names',
          render(h, { row }) {
            return (
              row.machine_names && Array.isArray(row.machine_names) && row.machine_names.length
                ? (
                  <div>
                    {
                      row.machine_names.map(v => <div>{ v }</div>)
                    }
                  </div>
                )
                : <span>-</span>
            )
          }
        },
        {
          label: '访问地址',
          prop: 'instance_addr'
        },
        {
          label: '所属订单号',
          prop: 'apply_no'
        },
        {
          label: '创建时间',
          prop: 'created_at'
        }
      ]
    }
  },
  
  watch: {},
  
  created() {
    this.__getBusiness()
  },
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    /**
     * 获取所属业务类型
     * @return {Promise<void>}
     * @private
     */
    async __getBusiness() {
      try {
        const res = await this.$ajax.get(GET_BUSINESS)
        const data = []
        if (res.data) {
          res.data.forEach(item => {
            const { id, business_name } = item
            data.push({
              value: id,
              label: business_name
            })
          })
        }
        this.businessOptions = data
      } catch (e) {
        console.error(e)
      }
    },
    
    async editDetail(data) {
      try {
        const commitData = {
          ...data,
          id: this.$route.params.id,
          dbaas_instance_id: this.fieldsValues.dbaas_instance_id
        }
        if (this.business) commitData.business = this.business
        await this.$ajax.patch(PATCH_MYSQL, commitData, [this.$route.params.id])
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.$emit('update')
        // 关闭编辑状态
        this.$refs.basicDetail.handleCancelEdit()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
