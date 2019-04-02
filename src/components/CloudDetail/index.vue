<!--
  @author:  Daniel
  @date:    2019-01-18
  @desc:    详情展示和编辑页面模块
  @require:
-->
<template>
  <div
    :class="[config.onlyShow ? 'only-show': '']"
    class="detail-box">
    <div
      v-if="!config.hideTitle"
      class="checked-wrap">
      <!--<span class="checked-icon"></span>
      <span class="checked-title">{{config.title}}</span>-->
      <CloudSectionTitle :title="config.title">
        <!--操作栏-->
        <div class="checked-svg">
          <!--编辑按钮-->
          <template v-if="!isEdit && !config.disableEdit">
            <el-tooltip
              content="编辑"
              placement="top">
          <span
            class="icon"
            @click="handleShowEdit">
            <svg-icon
              icon-class="small_edit"
              class="running-color"
            />
          </span>
            </el-tooltip>
          </template>
          
          <template v-if="isEdit">
            <el-tooltip
              content="保存编辑"
              placement="top">
          <span
            class="icon"
            @click="handleSaveEdit">
            <svg-icon
              icon-class="small_save"
              class="running-color"
            />
          </span>
            </el-tooltip>
            <el-tooltip
              content="取消编辑"
              placement="top">
          <span
            class="icon"
            @click="handleCancelEdit">
            <svg-icon
              icon-class="small_cancel"
              class="cancel-color"/>
          </span>
            </el-tooltip>
          </template>
          
          <template v-if="config.hasSettingBtn">
            <el-tooltip
              content="设置"
              placement="top">
          <span
            class="icon"
            @click="handleSetting">
            <svg-icon
              icon-class="small_setting"
              class="running-color"
            />
          </span>
            </el-tooltip>
          </template>
        </div>
      </CloudSectionTitle>
    </div>
    
    <el-form
      ref="detailForm"
      :model="formData"
      :label-position="config.labelPosition || 'left'"
      :label-width="config.labelWidth ? `${config.labelWidth}px` : `100px`"
      :hide-required-asterisk="!isEdit"
      class="detail-edit-form"
    >
      <el-row
        :gutter="config.gutter || 20"
        :justify="config.justify || 'left'"
        :align="config.align"
        class="detail-wrapper"
      >
        <template>
          <!--基于element的grid布局form-item-->
          <el-col
            v-for="(col, colIndex) in fields"
            :index="colIndex"
            :key="colIndex"
            :span="col.colSpan || config.colSpan"
          >
            <el-form-item
              :label="col.label"
              :prop="`${col.editProp || col.prop}`"
              :rules="(config.rules && col.hasEdit) ? config.rules[`${col.editProp || col.prop}`] : null"
              :style="config.formItemStyle"
            >
              <!--编辑状态-->
              <template v-if="col.hasEdit && isEdit">
                <component
                  v-model="formData[`${col.editProp || col.prop}`]"
                  :is="'field-' + col.type"
                  :label="col.label"
                  :options="col.options"
                  :events="col.events"
                />
              </template>
              
              <!--非编辑，正常显示状态-->
              <template v-else>
                <!--render渲染显示-->
                <template v-if="col.render && typeof col.render === 'function'">
                  <JsxRender
                    :row="{field: col, row: fieldsValues}"
                    :render="col.render"
                  />
                </template>
                
                <!--filter显示，需要配置全局过滤器、或者配置 filterFn-->
                <template v-else-if="col.filter">
                  <template v-if="col.filterFn && typeof col.filterFn === 'function'">
                    {{ col.filterFn(fieldsValues[col.prop]) }}
                  </template>
                  <template v-else>
                    {{ constructor.filter(col.filter) ? constructor.filter(col.filter)(fieldsValues[col.prop]) : '-' }}
                  </template>
                </template>
                
                <!--slot插槽显示-->
                <template v-else-if="col.slot">
                  <slot
                    :name="col.slot"
                    :row="fieldsValues"
                    :field="col"/>
                </template>
                
                <!--默认显示-->
                <template v-else>
                  {{ (fieldsValues && fieldsValues[col.prop]) || (col.options && col.options.defaultValue) || '-' }}
                </template>
              
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import JsxRender from './components/JsxRender'
import CloudSectionTitle from '@/components/CloudSectionTitle'

export default {
  name: 'CloudDetail',
  
  components: {
    CloudSectionTitle,
    JsxRender,
    FieldInput: () => import('./components/field/FieldInput'),
    FieldSelect: () => import('./components/field/FieldSelect'),
    FieldRadio: () => import('./components/field/FieldRadio'),
    FieldTextarea: () => import('./components/field/FieldTextarea'),
    FieldNumber: () => import('./components/field/FieldNumber')
  },
  
  props: {
    // 项
    fields: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 每项对应的值
    fieldsValues: {
      type: Object,
      default: () => {
        return {}
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
      rules: {}, // 校验规则
      isEdit: false // 是否处于编辑状态
    }
  },
  
  computed: {},
  
  watch: {
    fieldsValues: {
      deep: true,
      handler() {
        this.__assignmentFormData()
      }
    }
  },
  
  created() {
    this.generateFormData()
  },
  
  methods: {
    /**
     * 初始化formData对象
     */
    generateFormData() {
      this.fields.forEach(field => {
        const { prop, options, editProp, hasEdit } = field
        if (hasEdit) {
          const val = (this.fieldsValues && this.fieldsValues[prop]) || (options && options.defaultValue) || ''
          const p = editProp || prop
          this.$set(this.formData, p, val)
        }
      })
      console.log(this.formData)
    },
    
    /**
     * 点击编辑按钮
     */
    handleShowEdit() {
      this.isEdit = true
      this.$refs.detailForm.clearValidate()
    },
    
    /**
     * 点击取消编辑
     */
    handleCancelEdit() {
      this.$refs.detailForm.clearValidate()
      this.isEdit = false
    },
    
    /**
     * 点击确定编辑
     */
    async handleSaveEdit() {
      try {
        const valid = await this.$refs.detailForm.validate()
        if (valid) {
          this.$emit('success', this.formData)
        }
      } catch (e) {
        console.error(e)
      }
    },
    
    /**
     * 点击设置
     */
    handleSetting() {
      this.$emit('configure')
    },
    
    /**
     * 赋值formData
     * @private
     */
    __assignmentFormData() {
      if (this.fieldsValues && Object.keys(this.fieldsValues).length) {
        Object.keys(this.fieldsValues).forEach(key => {
          if (typeof this.formData[key] !== 'undefined') {
            this.formData[key] = this.fieldsValues[key]
          }
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.detail-box {
  background: white;
  min-height: 190px;
  overflow-y: auto;
  padding: 20px;
  .detail-wrapper {
    flex-wrap: wrap
  }
  .checked-wrap {
    height: 28px;
    line-height: 28px;
    .checked-svg {
      display: inline-block;
      vertical-align: middle;
      float: right;
      .icon {
        display: inline-block;
        padding: 0 10px;
      }
      svg {
        font-size: 20px;
        cursor: pointer;
      }
      svg:not(:last-child) {
        margin-right: 10px;
      }
      .running-color {
        color: #4A8DF0;
      }
      .cancel-color {
        color: #FB6041;
      }
    }
  }
  .detail-edit-form {
    padding: 20px;
  }
  /deep/ .el-form-item__label {
    color: $textLevelC;
    font-weight: 500;
    line-height: 1.5;
  }
  /deep/ .el-form-item__content {
    color: $textLevelB;
    line-height: 1.5;
  }
  // 仅查看时的样式
  &.only-show {
    margin: 0;
    padding: 0;
    min-height: auto;
    overflow-y: inherit;
    .detail-edit-form {
      padding: 0;
    }
    /deep/ .el-form-item {
      margin-bottom: 20px;
    }
  }
}
</style>
