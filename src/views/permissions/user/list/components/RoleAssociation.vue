<!--
  @author:  lzc
  @date:    2019-02-12
  @file:    关联角色
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
      <div>请选择角色</div>
      <div>
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入城市拼音"
          v-model="value2"
          :data="data2"/>
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

export default {
  name: 'RoleAssociation',
  
  components: {
    CloudDetail
  },
  
  mixins: [DialogMixin],
  
  props: {},
  
  data() {
    const generateData2 = _ => {
      const data = []
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        })
      })
      return data
    }
    return {
      data2: generateData2(),
      value2: [],
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
