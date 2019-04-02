<!--
  @author:  lzc
  @date:    2019-03-12
  @file:    生成form-item
  @require:
-->
<template>
  <el-form-item
    v-if="!col.hidden"
    :label="col.label"
    :prop="col.prop"
    :rules="col.rules ? col.rules : (config.rules ? config.rules[col.prop] : null)"
    :class="[tipsIndent ? 'indent-error-form-item' : '']"
    :label-width="typeof col.labelWidth !== 'undefined' ? `${col.labelWidth}px` : (config.labelWidth ? `${config.labelWidth}px` : `100px`)"
  >
    <!--自定义表单项内容-->
    <template v-if="col.render && typeof col.render === 'function'">
      <JsxRender
        :row="{
            field: col,
            data: config.store ? $store.state[config.storeModule][config.storeFormType]  : formData
          }"
        :render="col.render"
        :change="handleChange"
      />
    </template>
    
    <!--slot插槽显示表单项-->
    <template v-else-if="col.slot">
      <slot :name="col.slot" :data="formData" :field="col"/>
    </template>
    
    <!--表单项-->
    <template v-else>
      <template v-if="col.tipsRender && typeof col.tipsRender === 'function'">
        <IconTip>
          <JsxRender :row="{field: col, data: formData}" :render="col.tipsRender"/>
        </IconTip>
      </template>
      
      <!--表单项前扩展，可用于input框后面添加对应button按钮等-->
      <template v-if="col.extendFrontRender && typeof col.extendFrontRender === 'function'">
        <div
          style="display: inline-block;"
          :style="{'margin-left': tipsIndent ? '19px' : ''}"
        >
          <JsxRender
            :row="{ field: col, data: formData }"
            :render="col.extendFrontRender"
          />
        </div>
      </template>
      
      <!--根据表单类型动态加载对应组件-->
      <template v-if="col.type">
        <component
          v-model="val"
          :is="'field-' + col.type"
          :label="col.label"
          :options="col.options"
          :events="col.events"
          :style="{'margin-left': tipsIndent && !col.tipsRender ? '19px' : ''}"
        />
      </template>
      
      <template v-if="col.spanRender && typeof col.spanRender === 'function'">
        <div class="span-render">
          <JsxRender :row="{field: col, data: formData}" :render="col.spanRender"/>
        </div>
      </template>
      
      <template v-if="col.extraInputRender && typeof col.extraInputRender === 'function'">
        <div class="input-render">
          <JsxRender :row="{field: col, data: formData}" :render="col.extraInputRender"/>
        </div>
      </template>
      
      <!--表单项后扩展，可用于input框后面添加对应button按钮等-->
      <template v-if="col.extendRender && typeof col.extendRender === 'function'">
        <JsxRender :row="{field: col, data: formData}" :render="col.extendRender"/>
      </template>
    </template>
  
  </el-form-item>
</template>

<script type="text/ecmascript-6">
import JsxRender from './JsxRender'
import IconTip from './IconTip'

export default {
  name: 'GeneratorFormItem',
  model: {
    prop: 'value',
    event: 'change'
  },
  components: {
    JsxRender,
    IconTip,
    FieldInput: () => import('./field/FieldInput'),
    FieldSelect: () => import('./field/FieldSelect'),
    FieldRadio: () => import('./field/FieldRadio'),
    FieldTextarea: () => import('./field/FieldTextarea'),
    FieldNumber: () => import('./field/FieldNumber'),
    FieldCheckbox: () => import('./field/FieldCheckbox'),
    FieldAutoinput: () => import('./field/FieldAutoinput'),
    FieldSlider: () => import('./field/FieldSlider'),
    FieldTime: () => import('./field/FieldTime')
  },
  props: {
    col: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    value: {
      type: [String, Array, Number, Boolean, Object, Date],
      default: ''
    },
    formData: {
      type: Object,
      required: true
    },
    tipsIndent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    val: {
      get() {
        const { store, storeModule, storeFormType } = this.config
        return store
          ? this.$store.state[storeModule][storeFormType][this.col.prop]
          : this.value
      },
      set(val) {
        const { store, storeModule, storeMutation } = this.config
        const path = storeModule ? `${storeModule}/${storeMutation}` : storeMutation
        store
          ? this.$store.commit(path, { [this.col.prop]: val })
          : this.$emit('change', val)
      }
    }
  },
  methods: {
    /**
     * 自定义表单内容时，改变formData属性的值
     * @param value
     */
    handleChange(value) {
      this.val = value
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
