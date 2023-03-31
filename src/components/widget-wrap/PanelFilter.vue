<template>
  <bm-card>
    <bm-card class="row justify-between items-center flex-nowrap panel-filter p-sm pl-md">
      <bm-card v-if="selectedValues.length">
        <bm-chip v-for="item in selectedValues" :key="item.field" dense removable
        color="primary" text-color="white">
          {{ item.lable }}: {{ item.displayValue }}
        </bm-chip>
      </bm-card>
      <bm-card v-else class="text-gray-600 fix-height">
        暂无筛选条件
      </bm-card>
      <el-button color="#0F3554" v-if="!alwaysExpanded && expanded && !immediate" @click="toggleExpanded" class="ml-auto filter-btn">筛选</el-button>
      <el-button text v-if="!alwaysExpanded" @click="toggleExpanded"><svg-icon :name="expanded ? 'caret-up': 'caret-down'" :size="24"></svg-icon></el-button>
    </bm-card>
    <bm-separator v-if="alwaysExpanded || expanded" />
    <bm-card v-if="alwaysExpanded || expanded" class="column m-sm ml-md">
      你好
    </bm-card>
    <bm-separator />
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

.filter-btn
  --el-button-hover-bg-color: #2E5D7F !important;
.fix-height
  height 32px
  line-height 32px
</style>