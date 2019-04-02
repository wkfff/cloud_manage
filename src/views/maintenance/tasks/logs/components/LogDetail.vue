<!--
  @author:  lzc
  @date:    2019-02-23
  @file:    详情弹框
  @require:
-->
<template>
  <el-dialog
    title="执行日志详情"
    :visible.sync="show"
    :close-on-click-modal="false"
    :custom-class="`pdt0 pdb0`"
    width="800px">
    
    <div class="content">
      <CloudDetail
        ref="logDetail"
        :fields-values="rowDetail"
        :fields="detailFields"
        :config="detailConfig"
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

<script type="text/ecmascript-6">
import DialogMixin from '@/mixins/DialogMixin'
import CloudDetail from '@/components/CloudDetail'

export default {
  name: 'LogDetail',
  
  components: {
    CloudDetail
  },
  
  mixins: [DialogMixin],
  
  props: {
    rowDetail: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  
  data() {
    return {
      detailConfig: {
        hideTitle: true,
        colSpan: 24,
        disableEdit: true
      }
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '所属任务ID',
          prop: 'job_code'
        },
        {
          label: '所属任务名称',
          prop: 'job_desc'
        },
        {
          label: '所属工单编号',
          prop: 'order_no'
        },
        {
          label: '日志信息',
          prop: 'log'
        }
      ]
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    confirm() {
    
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
