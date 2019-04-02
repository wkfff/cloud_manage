<!--
  @author:  lzc
  @date:    2019-01-23
  @desc:    设置维护信息弹框
  @require:
-->
<template>
  <el-dialog
    title="维护信息设置"
    :visible.sync="show"
    :close-on-click-modal="false"
    width="750px"
    @open="openDialog"
  >
    <div class="content">
      <el-form
        ref="maintainConfigureForm"
        :model="formData"
        :rules="rules"
        label-width="140px"
        class="configure-form">
        <div class="section">
          <div class="title">时间设置</div>
          <div class="section-box">
            <el-form-item label="业务服务时间" prop="service_time">
              <el-radio-group v-model="formData.service_time">
                <el-radio-button label="5*8"/>
                <el-radio-button label="7*8"/>
                <el-radio-button label="7*24"/>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="数据库维护窗口" prop="rto">
              <div class="time-box">
                <div class="sub-title">周一至周五</div>
                <div>
                  <el-time-picker
                    v-model="workDay"
                    is-range
                    range-separator="-"
                    format="HH:mm:ss"
                    value-format="HH:mm:ss"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </div>
              </div>
              <div class="time-box">
                <div class="sub-title">周六至周日</div>
                <div>
                  <el-time-picker
                    v-model="weekendDay"
                    is-range
                    range-separator="-"
                    format="HH:mm:ss"
                    value-format="HH:mm:ss"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </div>
              </div>
              <div class="time-box">
                <div class="sub-title">RTO</div>
                <div>
                  <el-radio-group v-model="formData.rto">
                    <el-radio-button
                      v-for="item in rtoArr"
                      :key="item"
                      :label="item"/>
                  </el-radio-group>
                </div>
              </div>
              <div class="time-box">
                <div class="sub-title">RPO</div>
                <div>
                  <el-radio-group v-model="formData.rpo">
                    <el-radio-button
                      v-for="item in rpoArr"
                      :key="item"
                      :label="item"/>
                  </el-radio-group>
                </div>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="section">
          <div class="title">其他设置</div>
          <div class="section-box">
            <el-form-item label="开发室经理" prop="dev_manager_name">
              <el-input
                v-model="formData.dev_manager_name"
                placeholder="请输入开发室经理名字"
              />
            </el-form-item>
            <el-form-item label="开发负责人" prop="dev_leader_name">
              <el-input
                v-model="formData.dev_leader_name"
                placeholder="请输入开发负责人名字"
              />
            </el-form-item>
            <el-form-item label="本地系统管理员A" prop="sys_admina_name">
              <el-input
                v-model="formData.sys_admina_name"
                placeholder="请输入本地系统管理员A名字"
              />
            </el-form-item>
            <el-form-item label="本地系统管理员B" prop="sys_adminb_name">
              <el-input
                v-model="formData.sys_adminb_name"
                placeholder="请输入本地系统管理员B名字"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <div
      slot="footer"
      class="dialog-footer">
      <DelayButton
        ref="confirmBtn"
        type="primary"
        delayPlaceholder="提交中"
        @click="confirm">
        确 定
      </DelayButton>
      <el-button
        @click="show = false">取 消
      </el-button>
    </div>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import DialogMixin from '@/mixins/DialogMixin'
import DelayButton from '@/components/DelayButton'
import { PATCH_INSTANCE_INIT } from '@/api/instance'

export default {
  name: 'MaintainConifgDialog',
  
  components: {
    DelayButton
  },
  
  mixins: [DialogMixin],
  
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    const rtoArr = ['15min', '30min', '1h', '2h', '3h', '6h', '24h']
    const rpoArr = ['1min', '5min', '30min', '1h', '12h', '24h', '7Day']
    
    return {
      formData: {
        service_time: '',
        maintain_work_day: '',
        maintain_weekend: '',
        rto: '',
        rpo: '',
        dev_manager_name: '',
        dev_leader_name: '',
        sys_admina_name: '',
        sys_adminb_name: ''
      },
      rules: {
        service_time: [{ required: true, message: '请选择业务服务时间', trigger: 'change' }],
        maintain_work_day: [{ required: true, message: '请选择数据库维护窗口', trigger: 'change' }]
      },
      rtoArr,
      rpoArr
    }
  },
  
  computed: {
    workDay: {
      get() {
        const { maintain_work_day } = this.formData
        if (maintain_work_day && maintain_work_day.includes('-')) {
          const [s, e] = maintain_work_day.split('-')
          return [s, e]
        } else {
          return ['', '']
        }
      },
      set(val) {
        if (val) {
          this.formData.maintain_work_day = val.join('-')
        }
      }
    },
    weekendDay: {
      get() {
        const { maintain_weekend } = this.formData
        if (maintain_weekend && maintain_weekend.includes('-')) {
          const [s, e] = maintain_weekend.split('-')
          return [s, e]
        } else {
          return ['', '']
        }
      },
      set(val) {
        if (val) {
          this.formData.maintain_weekend = val.join('-')
        }
      }
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    openDialog() {
      const { maintenance } = this.dataInfo
      console.log(this.dataInfo)
      if (maintenance && Object.prototype.toString.call(maintenance) === '[object Object]') {
        Object.keys(maintenance).forEach(key => {
          if (typeof this.formData[key] !== 'undefined') {
            this.formData[key] = maintenance[key]
            
            if ((key === 'maintain_work_day') && maintenance[key]) {
              const [s, e] = maintenance[key].split('-')
              this.workDay = [s || '', e || '']
            }
            if (key === 'maintain_weekend' && maintenance[key]) {
              const [s, e] = maintenance[key].split('-')
              this.weekendDay = [s || '', e || '']
            }
          }
        })
      }
    },
    
    async confirm() {
      try {
        const valid = await this.$refs['maintainConfigureForm'].validate()
        if (valid) {
          await this.$ajax.patch(PATCH_INSTANCE_INIT, this.formData, [this.$route.params.id])
          this.$message({
            message: '配置成功',
            type: 'success'
          })
          this.show = false
          this.$emit('success')
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.configure-form {
  .section {
    padding-bottom: 20px;
    &:last-child {
      padding-bottom: 0;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      padding-bottom: 20px;
    }
  }
  .section-box {
    padding-left: 20px;
  }
  /deep/ .el-form-item__label {
    font-weight: 500;
  }
}

.time-box {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
  .sub-title {
    padding-right: 20px;
  }
}
</style>
