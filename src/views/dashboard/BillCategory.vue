<template>
  <bm-card>
    <div class="content-toolbar">
      <el-radio-group v-model="category">
        <el-radio-button v-for="(label, index) in categories" :label="label" :key="index" />
      </el-radio-group>
    </div>
  </bm-card>
</template>

<script>
import {defineComponent, ref} from "vue";
import BmCard from "../../components/card/BmCard";

export default defineComponent({
  components: {BmCard},
  setup() {
    const category = ref('收入')
    const categories = ref([])

    categories.value = ['全部','收入','支出','不计入支出']
    return {
      category,
      categories
    }
  },
})
</script>

<style lang="stylus" scoped>
.bm-card
  --bm-card-padding 24px
</style>