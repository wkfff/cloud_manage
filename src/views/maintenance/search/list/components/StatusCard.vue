<!--
  @author:  lzc
  @date:    2019-02-28
  @file:    状态卡片
  @require:
-->
<template>
  <div class="status-wrapper">
    <div
      v-for="(field, index) in fields"
      :key="index"
      :class="[active === field.status ? 'active' : '']"
      class="card-box"
      @click="changeStatus(field.status)"
    >
      <div class="number">{{ field.value }}</div>
      <div class="text">{{ field.label }}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'StatusCard',
  
  components: {},
  
  model: {
    prop: 'status',
    event: 'change'
  },
  
  props: {
    // 状态
    status: {
      type: [String, Number],
      default: 0
    },
    fields: {
      type: Array,
      default: () => []
    }
  },
  
  data() {
    return {}
  },
  
  computed: {
    active: {
      get() {
        return this.status
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  
  watch: {},
  
  created() {},
  
  mounted() {},
  
  destroyed() {},
  
  methods: {
    changeStatus(status) {
      this.active = status
      this.$emit('update')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.status-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .card-box {
    width: 30%;
    min-width: 280px;
    padding: 21px;
    background-color: #fff;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    &.active {
      border-color: $menuCheckedBg;
      color: $menuCheckedBg;
    }
    &:hover{
      border-color: $menuCheckedBg;
      box-shadow:0px 2px 4px 0px rgba(74,141,240,0.2);
    }
    .number {
      font-size: 30px;
      padding-bottom: 5px;
    }
    .text {
      font-size: 14px;
      padding-top: 5px;
    }
  }
}

</style>
