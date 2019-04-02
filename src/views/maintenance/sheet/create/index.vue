<!--
  @author:  DAniel
  @date:    2019-01-24
  @desc:    工单新建
  @require:
-->
<template>
  <div>
    <cloud-step :stepProps="stepProps" :currentProps="current"/>
    <div class="sheet_create">
       
       <first-step :handleStep="handleStep" v-if="current === 0"/>
       <second-step :handleStep="handleStep" v-else-if="current === 1"/>
       <third-step :handleStep="handleStep" v-else/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import CloudStep from '@/components/CloudStep'
import FirstStep from './components/first'
import SecondStep from './components/second'
import ThirdStep from './components/third'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SheetCreate',
  
  components: {
    CloudStep,
    FirstStep,
    SecondStep,
    ThirdStep
  },
  
  props: {},
  
  data() {
    const stepProps = {
       list: [
          {title: '选择产品/服务'},
          {title: '选择运维类型'},
          {title: '创建工单'}
       ]
    }
    return {
      stepProps,
      // current: 0
    }
  },
  
  computed: {
    ...mapState('worksheet', [
      'current'
    ])
  },
  
  watch: {},
  
  created() {
  },
  
  mounted() {},
  
  destroyed() {
    this.RESET()
    this.RESET_FORMDATA()
  },
  
  methods: {
    ...mapMutations('worksheet', [
      'UPDATE_WORKSHEET',
      'RESET',
      'RESET_FORMDATA'
    ]),
    handleStep(type) {
       if (type === 'add' || !type) {
          if (this.current >= 2) return false
          this.UPDATE_WORKSHEET({
            type: 'current',
            payload: {
              current: this.current + 1
            }
          })
          return false
       }
       if (type === 'minus') {
          if (this.current <= 0) return false
          this.UPDATE_WORKSHEET({
            type: 'current',
            payload: {
              current: this.current - 1
            }
          })
          return false
       }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .sheet_create{
      min-height: 355px;
      overflow-y: auto;
      background: $appMainBg;
      padding: 20px 15px;
  }
</style>
