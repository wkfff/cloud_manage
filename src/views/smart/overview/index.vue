<!-- 全景视图 -->
<template>
  <div class="view-wrapper">
    <img src="../../../assets/overview.png" :class="[isScreen ? 'picStyle' : 'img-style']">
    <div class="hidden-model" @click="handleShowDialog"></div>
    <div class="screen-style" @click="handleFullScreen"></div>
    <instance-dialog v-model="instanceVisible"/>
  </div>
</template>

<script>
import InstanceDialog from './components/InstanceDialog.vue'
import screenfull from 'screenfull'

export default {
  name: 'OverView',
  
  data() {
    const width = document.documentElement.clientWidth || document.body.clientWidth
    const height = document.documentElement.clientHeight || document.body.clientHeight
    
    return {
      instanceVisible: false,
      isScreen: false
      
    }
  },
  
  components: {
    InstanceDialog
  },
  
  computed: {},
  
  methods: {
    handleShowDialog() {
      // this.instanceVisible = true;
      const { href } = this.$router.resolve({
        path: '/intelligent'
      })
      window.open(href, '_blank', 'toolbar=yes, width=1530, height=770')
    },
    handleFullScreen() {
      if (screenfull.enabled) {
        if (screenfull.isFullscreen) {
          this.isScreen = false
        } else {
          this.isScreen = true
        }
        screenfull.toggle()
      }
    }
  }
}
</script>
<style rel='stylesheet/scss' lang='scss' scoped>
.img-style {
  width: 100%;
  height: calc(100vh - 105px);
}

.hidden-model {
  position: absolute;
  z-index: 2001;
  width: 300px;
  height: calc(100vh - 100px);
  left: 0;
  top: 80px;
  right: 0;
  bottom: 0;
  cursor: pointer;
}

.screen-style {
  position: absolute;
  z-index: 2001;
  width: 400px;
  height: 400px;
  top: 80px;
  right: 20px;
  cursor: pointer;
}

.picStyle {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  width: calc(100vW);
  height: calc(100vh);
}
</style>
