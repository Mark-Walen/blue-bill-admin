<template>
  <bm-card>
    <bm-card class="row items-start flex-nowrap panel-filter">
      <div class="search-box relative">
        <el-input />
        <svg-icon name="search" class="absolute"></svg-icon>
      </div>
    </bm-card>
  </bm-card>
</template>

<script setup>
import { ref } from "vue";
import BmCard from "../card/BmCard";

const props = defineProps({
  options: {},
  value: {},
  onChanged: {},
  alwaysExpanded: { default: true },
  done: { type: Function },
  onExpansionStateChanged: { type: Function },
  immediate: Boolean
})

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

const value = ref([])
const name = ref("")
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))

const value2 = ref('')

</script>

<style lang="stylus" scoped>
.panel-filter-item
  margin 0 16px
</style>