<!--
  @author:  lzc
  @date:    2019-02-12
  @file:    添加到组弹出框
  @require:
-->
<template>
  <el-dialog
    title="关联角色"
    :visible.sync="show"
    :close-on-click-modal="false"
    @opened="openDialog"
  >
    
    <div class="content">
      <CloudDetail
        ref="userDetailOverview"
        :fields="detailFields"
        :config="detailConfig"
      />
      <div>请选择用户组</div>
      
      <div>
        <CloudTreeTransfer
          v-model="value"
          :data="data"
        />
      </div>
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
import CloudTreeTransfer from '@/components/CloudTreeTransfer'

export default {
  name: 'AddGroup',
  
  components: {
    CloudDetail,
    CloudTreeTransfer
  },
  
  mixins: [DialogMixin],
  
  props: {},
  
  data() {
    const generateData2 = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }, {
        id: 20,
        label: '二级 2-1',
        children: [{
          id: 21,
          label: '三级 2-2-1'
        }, {
          id: 22,
          label: '三级 2-2-2'
        }]
      }
      ]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      data: generateData2,
      value: [],
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1
      },
      detailConfig: {
        hideTitle: true,
        onlyShow: true
      }
    }
  },
  
  computed: {
    detailFields() {
      return [
        {
          label: '用户名',
          prop: 'display_name'
        },
        {
          label: '工号',
          prop: 'display_name'
        }
      ]
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    openDialog() {
    
    },
    confirm() {
    
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
