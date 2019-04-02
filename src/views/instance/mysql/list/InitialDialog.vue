<template>
  <el-dialog title="初始化实例" :visible.sync="dialogProps.visible" @closed="closeDialog" width="550px">
    <el-form :model="formProps" ref="businessForm" :rules="formRules">
      <!-- <el-form-item label="业务名称"  prop="business_name">
        <el-input v-model="formProps.business_name" style="width: 280px"></el-input>
      </el-form-item>
      <el-form-item label="业务负责人"  prop="leader_name">
        <el-input v-model="formProps.leader_name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="describtion">
        <el-input type="textarea" v-model="formProps.describtion"></el-input>
      </el-form-item> -->
      暂无
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script type="text/jsx">
import { ADD_BUSINESS } from '@/api/business'

export default {
  name: 'DialogForm',
  data() {
    let formProps = this.resetFields()
    
    const dialogProps = {
      visible: false
    }
    const formRules = {
      business_name: [
        { required: true, trigger: 'change' }
      ]
    }
    return {
      formProps,
      dialogProps,
      formRules
    }
  },
  methods: {
    closeDialog() {
      this.formProps = this.resetFields()
    },
    cancel() {
      this.dialogProps.visible = false
    },
    resetFields() {
      return {
        business_name: '',
        leader_name: '',
        describtion: ''
      }
    },
    showInitialModal() {
      this.dialogProps.visible = true
    },
    async confirm() {
      await this.$ajax.post(ADD_BUSINESS, this.formProps)
      this.dialogProps.visible = false
      this.$emit('handle-reload')
    }
  }
}
</script>
