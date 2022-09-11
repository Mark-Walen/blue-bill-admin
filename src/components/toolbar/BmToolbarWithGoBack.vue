<template>
  <bm-toolbar class="bg-white p-0">
    <el-button @click="goBack" :icon="ArrowLeft"></el-button>
    <slot />
  </bm-toolbar>
</template>

<script>
import {defineComponent} from "vue";
import {BmToolbar} from "./index";
import {useRouter} from "vue-router/dist/vue-router";
import {ArrowLeft} from '@element-plus/icons-vue'

export default defineComponent({
  name: "BmToolBarWithGoBack",
  components: {
    BmToolbar
  },
  setup () {
    const router = useRouter()
    const goBack = () => {
      router.go(-1)
    }

    return {
      goBack,
      ArrowLeft
    }
  }
})
</script>

<style lang="stylus" scoped>
.bm-toolbar .el-button
  padding 0
  border none
  :deep(.el-icon svg)
    transform scale(2)

</style>