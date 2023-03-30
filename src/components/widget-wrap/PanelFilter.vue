<template>
  <bm-card>
    <bm-card class="row items-start flex-nowrap panel-filter">
      <bm-card v-if="selectedValues.length">
        <bm-chip v-for="item in selectedValues" :key="item.field" dense removable
        color="primary" text-color="white">
          {{ item.lable }}: {{ item.displayValue }}
        </bm-chip>
      </bm-card>
      <bm-card v-else class="text-gray-600 fix-height">
        暂无筛选条件
      </bm-card>
      <el-button v-if="!alwaysExpanded && !expanded" @click="toggleExpanded" />
      <el-button v-if="!alwaysExpanded && expanded" @click="toggleExpanded" />
    </bm-card>
    <bm-separator v-if="alwaysExpanded || expanded" />
  </bm-card>
</template>

<script setup>
import { ref, toRefs } from "vue";
import BmCard from "../card/BmCard";
import {BmChip} from "../chip/"
import {BmSeparator} from "../seperator/"

const props = defineProps({
  options: {},
  value: {},
  onChanged: {},
  alwaysExpanded: { default: true },
  done: { type: Function },
  onExpansionStateChanged: { type: Function },
  immediate: Boolean
})

const fieldMapping = {}
const {options, value} = toRefs(props)
const changedValue = ref(value.value || {})
const expanded = ref(false)

if (typeof options.value !== "undefined" && options.value) {
  options.value.forEach((i) => {
    fieldMapping[i.field] = i
  })
}

const selectedValues = ref([])

const toggleExpanded = async () => {
  expanded.value = !expanded.value
  if (props.onExpansionStateChanged) {
    await nextTick()
    props.onExpansionStateChanged(expanded.value)
  }
}

</script>

<style lang="stylus" scoped>
.panel-filter-item
  margin 0 16px

.fix-height
  height 32px
  line-height 32px
</style>