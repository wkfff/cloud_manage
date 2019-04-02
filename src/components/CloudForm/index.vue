<!--
  @author:  lzc
  @date:    2019-01-29
  @desc:    form表单组件
  @require:
-->
<template>
  <el-form
    ref="cloudForm"
    :model="config.store ? $store.state[config.storeModule][config.storeFormType] : formData"
    :label-position="config.labelPosition || 'left'"
    :label-width="config.labelWidth ? `${config.labelWidth}px` : `100px`"
    class="cloud-form"
  >
    
    <!--基于element的grid布局form-item-->
    <template v-for="(col, colIndex) in fields">
      
      <!--按模块分-->
      <template v-if="col.title && Array.isArray(col.fields)">
        <el-row
          :key="colIndex"
          :gutter="config.gutter || 20"
          :justify="config.justify || 'left'"
          :align="config.align"
          class="detail-wrapper"
        >
          <!--标题-->
          <el-col :span="24">
            <div class="section-title">
              <span class="block"/>
              <span class="text">{{ col.title }}</span>
            </div>
          </el-col>
          
          <el-col
            v-for="(colField, colFieldIndex) in col.fields"
            :index="colFieldIndex"
            :key="colFieldIndex"
            :span="colField.colSpan || config.colSpan"
            :style="colField.style"
          >
            <!--保存进vuex的数据，不需要v-model-->
            <template v-if="config.store">
              <GeneratorFormItem
                :col="colField"
                :form-data="formData"
                :config="config"
                :tips-indent="tipsIndent"
              />
            </template>
            
            <template v-else>
              <GeneratorFormItem
                v-model="formData[`${colField.prop}`]"
                :col="colField"
                :form-data="formData"
                :config="config"
                :tips-indent="tipsIndent"
              />
            </template>
            
          </el-col>
        </el-row>
      </template>
      
      <!--非模块分-->
      <template v-else>
        <el-row
          :key="colIndex"
          :gutter="config.gutter || 20"
          :justify="config.justify || 'left'"
          :align="config.align"
          class="detail-wrapper"
        >
          <el-col
            :index="colIndex"
            :span="col.colSpan || config.colSpan"
            :style="col.style"
          >
            <GeneratorFormItem
              v-model="formData[`${col.prop}`]"
              :col="col"
              :form-data="formData"
              :config="config"
              :tips-indent="tipsIndent"
            />
          </el-col>
        </el-row>
      </template>
    
    </template>
  
  </el-form>
</template>

<script type="text/ecmascript-6">
import GeneratorFormItem from './components/GeneratorFormItem'

export default {
  name: 'CloudForm',
  
  components: {
    GeneratorFormItem
  },
  
  props: {
    // 项
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 其他设置
    config: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      formData: {}, // 每项绑定数据
      tipsIndent: false, // 有提示图标时，需要缩进
      defaultValue: {} // 表单每一项默认值
    }
  },
  
  computed: {
  },
  
  watch: {
    fields: {
      deep: true,
      handler(val, oldVal) {
        if (Array.isArray(val) && val.length !== oldVal.length) {
          !this.config.store && this.generateFormData()
        }
      }
    }
  },
  
  created() {
    !this.config.store && this.generateFormData()
    if (this.config.tipsIndent) this.tipsIndent = true
  },
  
  methods: {
    /**
     * 初始化formData对象
     */
    generateFormData() {
      this.tipsIndent = false
      this.fields.forEach(field => {
        const { title, fields } = field
        // 按模块
        if (title && Array.isArray(fields) && fields.length > 0) {
          fields.forEach(item => {
            this.__initFormFields(item)
          })
        } else {
          this.__initFormFields(field)
        }
      })
    },
    
    __initFormFields(field) {
      const { prop, defaultValue, tipsRender } = field
      const val = typeof defaultValue !== 'undefined' ? defaultValue : ''
      if (typeof this.formData[prop] === 'undefined') {
        this.$set(this.formData, prop, val)
      } else {
        if (!this.formData[prop] && defaultValue) {
          this.$set(this.formData, prop, defaultValue)
        }
      }
      this.$set(this.defaultValue, prop, val)
      if (tipsRender) this.tipsIndent = true
    },
    
    /**
     * 点击确定编辑
     */
    async handleSaveEdit() {
      try {
        const valid = await this.$refs.cloudForm.validate()
        if (valid) {
          this.$emit('success', this.formData)
        }
      } catch (e) {
        console.error(e)
      }
    },
    
    /**
     * 表单原有 validateField 方法
     * @param args
     */
    validateField(...args) {
      this.$refs.cloudForm.validateField(...args)
    },
    
    /**
     * 表单原有 validate 方法扩展
     * @param args
     * @return {Object|Boolean} 检验成功则返回formData数据，否则返回false
     */
    async validate(...args) {
      try {
        const valid = await this.$refs.cloudForm.validate(...args)
        if (valid) {
          return this.formData
        } else {
          return false
        }
      } catch (e) {
        return false
      }
    },
    
    /**
     * 表单原有 resetFields 方法
     * @param args
     */
    resetFields(...args) {
      this.$refs.cloudForm.resetFields(...args)
    },
    
    /**
     * 表单原有 clearValidate 方法
     * @param args
     */
    clearValidate(...args) {
      this.$refs.cloudForm.clearValidate(...args)
    },
    
    /**
     * 为表单设置值
     * @param args
     */
    setFieldValue(...args) {
      const params = [...args]
      const len = params.length
      if (len) {
        const formProps = []
        if (
          len === 1 &&
          Object.prototype.toString.call(params[0]) === '[object Object]'
        ) {
          Object.keys(params[0]).forEach(key => {
            if (typeof this.formData[key] !== 'undefined') {
              this.formData[key] = params[0][key]
              formProps.push(key)
            }
          })
        } else if (
          Object.prototype.toString.call(params[0]) === '[object Array]'
        ) {
          params[0].forEach(key => {
            if (typeof this.formData[key] !== 'undefined') {
              this.formData[key] = this.defaultValue[key]
              formProps.push(key)
            }
          })
        }
        this.$nextTick(() => {
          formProps.length && this.clearValidate(formProps)
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.cloud-form {
  background: white;
  min-height: 190px;
  overflow: hidden;
  overflow-y: auto;
  padding: 15px 10px;
  /deep/ .el-form-item__label {
    color: $textLevelC;
    font-weight: 500;
    line-height: 1.5;
    min-height: 36px;
    display: flex;
    align-items: center;
  }
  /deep/ .el-form-item__content {
    color: $textLevelB;
  }
  .indent-error-form-item {
    /deep/ .el-form-item__error {
      left: 17px;
    }
  }
  .span-render {
    height: 20px;
    line-height: 20px;
    color: $textLevelD;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .input-render {
    margin-top: 20px;
  }
  .section-title {
    padding-bottom: 20px;
    font-weight: 600;
    padding-top: 20px;
    .block {
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 10px;
      background-color: $textNewChecked;
    }
  }
}
</style>
