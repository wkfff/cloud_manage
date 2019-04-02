<!--
  @author:  DAniel
  @date:    2019-01-24
  @desc:    工单新建的温馨提示框,新增show属性，表示是否隐藏
  @require:
-->
<template>
  <div :class="{'cloud-alert': show}">
    <el-alert
        :class="{'hidden': !alertItems.show}"
        :title="alertItems.title"
        :type="alertItems.type"
        :show-icon="alertItems.showIcon">
    </el-alert>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'CloudAlert',
  
  components: {
  },
  
  props: {
      alertProps: {
          type: Object,
          default: () => {
              return {}
          }
      }
  },
  
  data() {
    return {

    }
  },
  
  computed: {
      alertItems() {
          return this.alertProps
      },
      show() {
        return this.alertProps.show
      }
  },
  
  watch: {},
  
  created() {
    
  },
  
  mounted() {},
  
  destroyed() {},
  
  methods: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .cloud-alert{
      margin-bottom: 20px;
  }
</style>
