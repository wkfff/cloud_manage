<!--
  @author:  lzc
  @date:    2019-01-30
  @desc:    xx->xx
  @require:
-->
<template>
  <el-dialog
    title="新建用户"
    :visible.sync="show"
    :close-on-click-modal="false"
    width="650px"
    @opened="openDialog"
  >
    
    <div class="content">
      <CloudForm
        ref="createUserForm"
        :fields="formFields"
        :config="formConfig"
      />
    </div>
    
    <div
      slot="footer"
      class="dialog-footer">
      <el-button
        type="primary"
        @click="confirm">确 定
      </el-button>
      <el-button
        @click="show = false">取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script type="text/jsx">
import DialogMixin from '@/mixins/DialogMixin'
import CloudForm from '@/components/CloudForm'

export default {
  name: 'CreateUser',
  
  components: {
    CloudForm
  },
  
  mixins: [DialogMixin],
  
  props: {},
  
  data() {
    return {
      customPassword: true
    }
  },
  
  computed: {
    /**
     * 表单项
     * @return {*[]}
     */
    formFields() {
      const _this = this
      return [
        {
          type: 'input',
          label: '用户名称',
          prop: 'user_name',
          tipsRender: () => {
            return (
              <div>
                <p>1、用户名称全局唯一，应基本能描述权限范围。</p>
                <p>2、1-32个字符，仅允许包含中文、英文字母、数字或“-”。</p>
              </div>
            )
          }
        },
        {
          type: 'input',
          label: '工号',
          prop: 'user_account'
        },
        {
          type: 'input',
          label: '描述',
          prop: 'user_desc'
        },
        {
          type: 'input',
          label: '邮箱',
          prop: 'user_mail'
        },
        {
          type: 'input',
          label: '手机号码',
          prop: 'user_phone'
        }
      ]
    },
  
    /**
     * 表单配置
     * @return {{}}
     */
    formConfig() {
      return {
        rules: {
          user_name: [{ required: true, message: '请输入用户名称', trigger: 'change' }],
          user_mail: [{ required: true, message: '请输入邮箱', trigger: 'change' }]
        }
      }
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    
    async confirm() {
      const valid = await this.$refs.createUserForm.validate()
      console.log(valid)
    },
    
    openDialog() {
      this.$refs.createUserForm.resetFields()
    }
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
