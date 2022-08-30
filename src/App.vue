<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="stylus">
html
body
#app
  width 100%
  direction ltr
  margin 0
</style>
