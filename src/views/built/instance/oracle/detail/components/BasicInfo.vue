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
import { INSTANCE_MYSQL, CHARACTER_TYPE } from '@/utils/constant'
import { find } from 'lodash'

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
      const _this = this
      return [
        {
          label: '实例名称',
          prop: 'display_name',
          type: 'input',
          hasEdit: true
        },
        {
          label: '实例ID',
          prop: 'instance_name'
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
          hasEdit: true,
          type: 'textarea'
        },
        {
          label: '所属业务系统',
          prop: 'business',
          type: 'select',
          hasEdit: true,
          editProp: 'business_id',
          options: {
            selectOptions: _this.businessOptions
          },
          events: {
            change(value) {
              const label = find(_this.businessOptions, {value})['label']
              _this.business = label
              console.log(label)
            }
          }
        },
        {
          label: '所属架构办代码',
          prop: 'area'
        },
        {
          label: '所有者',
          prop: 'area'
        },
        {
          label: '所属用户组',
          prop: 'area'
        },
        {
          label: '所在区域',
          prop: 'area'
        },
        {
          label: '所在主机',
          prop: 'area'
        },
        {
          label: '所属项目',
          prop: 'area'
        },
        {
          label: '访问地址',
          prop: 'instance_addr'
        },
        {
          label: '所属订单号',
          prop: 'instance_addr'
        },
        {
          label: '创建时间',
          prop: 'instance_addr'
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
