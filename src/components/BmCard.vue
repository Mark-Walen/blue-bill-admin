<template>
  <el-card :shadow="cardShadow" :body-style="cardBodyStyle">
    <slot></slot>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BmCard',
  props: {
    shadow: {
      type: String,
      default: 'never',
      validator(value) {
        return ['always', 'hover', 'never'].includes(value)
      }
    },
    bodyStyle: {
      type: String | Object,
      default () {
        return { padding: '0px' }
      }
    }
  },
  data () {
    return {
      cardShadow: this.shadow,
      cardBodyStyle: this.bodyStyle
    }
  }
})
</script>

<style scoped>
.el-card {
  border: none;
}
</style>