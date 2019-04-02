<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item,index) in levelList"
        :key="item.path">
        <span
          v-if="index === levelList.length - 1 || index === 0"
          class="no-redirect">{{ item.title }}</span>
        <a
          v-else
          @click.prevent="handleLink(item)">{{ item.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import BREAD_CONFIG from '@/router/breadcrumb/index'

export default {
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        this.getBreadcrumbRoutes()
      }
    }
  },
  created() {
    this.getBreadcrumbRoutes()
  },
  methods: {
    /**
     * 获取面包屑路由
     */
    getBreadcrumbRoutes() {
      const bread = this.$route.meta && this.$route.meta.bread
      this.levelList = []
      if (bread) {
        bread.split('/').reduce((total, currentValue, index) => {
          let res = null
          if (index === 0) {
            res = BREAD_CONFIG[currentValue]
          } else {
            res = (total && total.children && total.children[currentValue]) || null
          }
          if (res) {
            const { name, title, path } = res
            this.levelList.push({
              title,
              name,
              path
            })
          }
          return res
        }, '')
      }
    },
    
    /**
     * 点击跳转
     * @param item
     */
    handleLink(item) {
      const { path } = item
      this.$router.push(this.pathCompile(path))
    },
    
    pathCompile(path) {
      const { params } = this.$route
      console.log(pathToRegexp.compile)
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 15px;
  line-height: 60px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
