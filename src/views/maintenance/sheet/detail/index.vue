<!--
  @author:  DAniel
  @date:    2019-01-24
  @desc:    工单详情
  @require:
-->
<template>
  <div>
    <cloud-back :title="contentInfo.order_no"/>
    <sheet-header :apply-details="contentInfo"/>
    <sheet-content :content-info="contentInfo"/>
  </div>
</template>

<script type="text/ecmascript-6">
import CloudBack from '@/components/CloudBack'
import SheetHeader from './components/SheetHeader'
import SheetContent from './components/SheetContent'
import { GET_WORKSHEET_DETAIL } from '@/api/worksheet'
export default {
  name: 'SheetDetail',
  
  components: {
    CloudBack,
    SheetHeader,
    SheetContent
  },
  
  props: {},
  
  data() {
    return {
      contentInfo: {}
    }
  },
  
  computed: {},
  
  watch: {},
  
  created() {
    this.getDetail()
  },
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    async getDetail() {
      const { id } = this.$route.params
      const res = await this.$ajax.get(GET_WORKSHEET_DETAIL, '', [id])
      this.contentInfo = res.data || {}
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
