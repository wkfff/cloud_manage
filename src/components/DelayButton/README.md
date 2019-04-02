> 基于 element 的带延时功能 button

## 属性

|参数|说明|类型|可选值|默认值|
|----|----|---|-----|-----|
|delay|延时时间,单位秒| Number|-|-|
|delayPlaceholder|延时占位符, 可选|String|-|-|

## 用例
```
<template>
  <DelayButton
    :delay="3"
    :delay-placeholder="'重新同步目标库'"
    @click="handleClick"
  >测试延时按钮</DelayButton>
</template>
<script>
  import DelayButton from '@/components/DelayButton/index.vue'

  export default {
    components: {
      DelayButton
    },

    methods: {
      handleClick() {
        console.log('testButton')
      }
    }
  }

</script>

```
