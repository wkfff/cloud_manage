<!--
  @author:  lzc
  @date:    2019-01-24
  @desc:    创建MySQL实例
  @require:
-->
<template>
  <div class="create-wrapper">
    <cloud-back
      title="新建MySQL实例"
    />
    <div class="content-wrapper">
      <div class="form-content-box">
        <el-form
          ref="createForm"
          :model="formData"
          :rules="rules"
          label-width="120px">
    
          <!--实例信息-->
          <div class="section">
            <div class="sub-title">实例信息</div>
            <div class="sub-content">
              <el-form-item
                label="区域"
                prop="city">
                <el-radio-group
                  v-model="formData.city">
                  <el-radio-button
                    v-for="(item, key) in INSTANCE_MYSQL.AREA"
                    :key="key"
                    :label="key">{{ item }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </div>
          </div>
    
          <!--实例配置-->
          <div class="section">
            <div class="sub-title">实例配置</div>
            <div class="sub-content">
        
              <el-form-item
                label="实例类型"
                prop="instance_type_id">
                <el-radio-group
                  v-model.number="formData.instance_type_id">
                  <el-radio-button
                    v-for="(item, index) in instanceType"
                    :key="index"
                    :label="item.id">{{ item.name }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
        
              <el-form-item
                label="实例架构"
                prop="architecture_id">
                <el-radio-group
                  v-model="formData.architecture_id">
                  <el-radio-button
                    v-for="(item, index) in showArchitectureType"
                    :key="index"
                    :label="item.id">{{ item.name }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
        
              <el-form-item
                label="数据库类型"
                prop="db_version">
                <el-radio-group
                  v-model="formData.db_version">
                  <el-radio-button
                    v-for="(item, key) in DATABASE_TYPE"
                    :key="key"
                    :label="key">{{ item }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
        
              <el-form-item
                v-if="formData.instance_type_id === 8"
                :rules="[{ required: true, message: '请选择镜像版本', trigger: 'change' }]"
                label="镜像版本"
                prop="image">
                <el-radio-group
                  v-model="formData.image">
                  <el-radio-button
                    v-for="item in imagesVersion"
                    :key="item"
                    :label="item">{{ item }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
        
              <el-form-item
                label="规格"
                prop="db_spec">
                <el-radio-group
                  v-model="formData.db_spec">
                  <el-radio-button
                    v-for="(item, key) in INSTANCE_MYSQL.INSTANCE_SPEC"
                    :key="key"
                    :label="key">{{ item }}
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
        
              <el-form-item
                label="硬盘"
                prop="disk">
                {{ formData.disk }} GB
              </el-form-item>
            </div>
          </div>
    
          <!--实例数量-->
          <div class="section">
            <div class="sub-title">实例数量</div>
            <div class="sub-content">
        
              <el-form-item
                label="申请数量"
                prop="apply_num">
                <el-input-number
                  v-model="formData.apply_num"
                  :min="1"
                  :max="5"
                  controls-position="right"
                />
              </el-form-item>
        
              <el-form-item>
                <div class="btn-box">
                  <DelayButton
                    ref="confirmBtn"
                    type="primary"
                    delayPlaceholder="提交中"
                    @click="submitForm">
                    提交申请
                  </DelayButton>
            
                  <el-button @click="$router.go(-1)">取消</el-button>
                </div>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CloudBack from '@/components/CloudBack'
import DelayButton from '@/components/DelayButton/index.vue'
import { INSTANCE_MYSQL, DATABASE_TYPE } from '@/utils/constant'
import {
  GET_MYSQL_INSTANCE_TYPE,
  GET_ARCHITECTURE_TYPE,
  GET_MYSQL_IMAGES,
  POST_MYSQL_INSTANCE
} from '@/api/instance'

export default {
  name: 'CreateMysqlInstance',
  
  components: {
    CloudBack,
    DelayButton
  },
  
  props: {},
  
  data() {
    const rules = {
      city: [{ required: true, message: '请选择区域', trigger: 'change' }],
      instance_type_id: [{ required: true, message: '请选择实例类型', trigger: 'change' }],
      architecture_id: [{ required: true, message: '请选择实例架构', trigger: 'change' }],
      db_version: [{ required: true, message: '请选择数据库类型', trigger: 'change' }],
      db_spec: [{ required: true, message: '请选择规格', trigger: 'change' }],
      apply_num: [{ required: true, message: '请输入申请数量', trigger: 'change' }]
    }
    return {
      INSTANCE_MYSQL,
      DATABASE_TYPE,
      formData: {
        city: '深圳',
        instance_type_id: 1,
        architecture_id: '',
        db_version: 'MySQL 5.6',
        image: null,
        db_spec: '2C8G',
        disk: 500,
        apply_num: 1,
        db_type: 1
      },
      rules,
      instanceType: [], // 实例类型
      architectureType: [], // 所有实例架构
      showArchitectureType: [], // 需要显示的实例架构
      imagesVersion: [] // 镜像版本
    }
  },
  
  computed: {},
  
  watch: {
    'formData.instance_type_id'(val) {
      this.calcShowArchitectureType()
      if (val === 8) this.formData.image = this.imagesVersion[0] || ''
    }
  },
  
  created() {
    this.__getInstanceType()
    this.__getArchitectureType()
    this.__getMysqlImages()
  },
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    /**
     * 获取实例类型
     * @return {Promise<void>}
     * @private
     */
    async __getInstanceType() {
      const res = await this.$ajax.get(GET_MYSQL_INSTANCE_TYPE, { dbType: 1 })
      this.instanceType = res.data || []
    },
    
    /**
     * 获取所有架构类型
     * @return {Promise<void>}
     * @private
     */
    async __getArchitectureType() {
      const res = await this.$ajax.get(GET_ARCHITECTURE_TYPE)
      this.architectureType = res.data
      this.calcShowArchitectureType()
    },
    
    /**
     * 根据当前选择的实例类型，筛选对应的实例架构
     */
    calcShowArchitectureType() {
      this.showArchitectureType = this.architectureType.filter(item => item.instance_type_id === this.formData.instance_type_id)
      this.formData.architecture_id = this.showArchitectureType[0] ? this.showArchitectureType[0].id : ''
    },
    
    /**
     * 获取镜像
     * @return {Promise<void>}
     * @private
     */
    async __getMysqlImages() {
      const res = await this.$ajax.get(GET_MYSQL_IMAGES)
      this.imagesVersion = res.data
    },
    
    async submitForm() {
      try {
        const valid = await this.$refs['createForm'].validate()
        if (valid) {
          await this.$ajax.post(POST_MYSQL_INSTANCE, this.formData)
          this.$message({
            message: '新建成功',
            type: 'success'
          })
          this.$router.go(-1)
        }
      } catch (e) {
        this.$refs.confirmBtn.clear()
        console.error(e)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.create-wrapper {
  .content-wrapper {
    margin: 20px;
    .form-content-box{
      background-color: #fff;
      padding: 20px;
      position: relative;
    }
    .section {
      .sub-title {
        font-size: 14px;
        font-weight: 600;
        padding-bottom: 20px;
      }
      .sub-content {
        padding-left: 20px;
        /deep/ .el-form-item__label {
          font-weight: 500;
        }
        /deep/ .el-form-item__content .el-input {
          width: auto;
        }
      }
      .btn-box {
        padding-top: 30px;
      }
    }
  }
}
</style>
