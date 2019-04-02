<template>
  <div class="login-panel">
    <div class="login">
      <div class="login-left">
        <div class="login-title textSizeA white-font mgt-150">
          <div class="mgb-30 font-bold"><svg-icon iconClass="aircraft" class="mgr-15 font-30"/>自助、高效的数据库控制台</div>
          <div class="textSizeB">
            <ul class="inline-ul">
              <li>多类型数据库</li>
              <li>自动化安装</li>
              <li>统一配置</li>
            </ul>
            <ul class="inline-ul">
              <li>自主化申请</li>
              <li>弹性伸缩</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="login-right">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px"
              class="demo-ruleForm">
            <div class="login-title textSizeA">
              <!-- <div class="text-active mgb-20 font-bold">HCF</div> -->
              <img src="../../assets/logo.png" />
              <div class="mgb-30 font-bold">DBaaS 云管平台</div>
              <div class="textSizeD mgb-60">分钟级构建数据库服务</div>
            </div>
            <el-form-item prop="user_name">
              <el-input v-model="loginForm.user_name" autocomplete="off">
                <svg-icon iconClass="login_user" slot="prefix"/>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                autocomplete="off"
                @keyup.enter.native="submitForm"
              >
                <svg-icon iconClass="login_password" slot="prefix"/>
                <svg-icon iconClass="show_password" slot="suffix"/>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">登录</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div> 
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        user_name: 'admin',
        password: '123456'
      },
      loginRules: {
        user_name: [
          { validator: checkName, trigger: 'change' }
        ],
        password: [
          { validator: checkPassword, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('app', ['Login']),
    submitForm() {
      this.$refs['loginForm'].validate((valid) => {
        console.log(valid)
        if (valid) {
          const values = {
            ...this.loginForm,
            cb: this.forwordDashboard.bind(this)
          }
          this.Login(values)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    forwordDashboard() {
        this.$router.push('/dashboard')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.login-panel {
  /deep/ .el-input {
    width: 80%!important;
  }
  /deep/ button {
    width: 80%;
  }
  .el-form-item--medium /deep/ .el-form-item__content, .el-form-item--medium /deep/ .el-form-item__label{
    text-align: center;
    margin-left: 0 !important;
  }
  .inline-ul{
    display: inline-block;
    text-align: left;
    li{
      margin-bottom: 35px;
    }
  }
  .font-30{
    font-size: 30px;
  }
}
</style>
