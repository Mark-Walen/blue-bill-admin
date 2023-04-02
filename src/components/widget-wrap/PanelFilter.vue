<template>
  <bm-card class="bm-panel-filter">
    <bm-card class="row justify-between items-center flex-nowrap panel-filter p-sm pl-md">
      <bm-card v-if="selectedValues.length">
        <bm-chip v-for="item in selectedValues" :key="item.field" dense removable @remove="onChipClick(item.field)"
                 color="primary" text-color="white">
          {{ item.lable }}: {{ item.displayValue }}
        </bm-chip>
      </bm-card>
      <bm-card v-else class="text-gray-600 fix-height">
        暂无筛选条件
      </bm-card>
      <el-button v-if="!alwaysExpanded" @click="toggleExpanded" class="filter-controller"
                 :style="{backgroundColor: expanded?'var(--bm-theme-color-5)': 'transparent', color: expanded ? 'var(--bm-gray-1)' : 'var(--bm-theme-color-6)'}">
        筛选
        <svg-icon :name="expanded?'funnel-simple-light':'funnel-simple'" :size="24"></svg-icon>
      </el-button>
    </bm-card>
    <bm-separator v-if="alwaysExpanded || expanded" />
    <bm-card v-if="alwaysExpanded || expanded" class="column m-sm ml-md">
      <slot name="filter-component"></slot>
      <bm-card>
        <el-button color="var(--bm-theme-color-5)" v-if="!alwaysExpanded && expanded && !immediate"
                   @click="toggleExpanded"
                   class="ml-auto filter-btn">重置
        </el-button>
        <el-button color="var(--bm-theme-color-5)" v-if="!alwaysExpanded && expanded && !immediate"
                   @click="toggleExpanded"
                   class="ml-auto filter-btn">完成
        </el-button>
      </bm-card>
    </bm-card>
    <bm-separator />
  </bm-card>
</template>

<script setup>
import { nextTick, onMounted, ref, toRefs, watch } from "vue";
import BmCard from "../card/BmCard";
import { BmChip } from "../chip/";
import { BmSeparator } from "../seperator/";
import { isNullOrUndefined } from "@/utils/util";

const props = defineProps({
  options: {},
  value: {},
  onChanged: {},
  alwaysExpanded: { default: true },
  done: { type: Function },
  onExpansionStateChanged: { type: Function },
  immediate: Boolean
});

const fieldMapping = {};
const { options, value } = toRefs(props);
const changedValue = ref(value.value || {});
const expanded = ref(false);

if (!isNullOrUndefined(options.value)) {
  options.value.forEach((i) => {
    fieldMapping[i.field] = i;
  });
}

const selectedValues = ref([]);
const resetOption = () => {
  const res = [];
  options.value.forEach((config) => {
    if (changedValue.value && !isNullOrUndefined(changedValue.value[config.field])) {
      const v = changedValue.value[config.field];
      res.push({
        lable: config.lable,
        field: config.field,
        displayedValue: config.valueFormatter ? config.valueFormatter(v) : v
      });
    }
  });
  selectedValues.value = res;
};

watch(changedValue, (currentValue, oldValue) => {
  resetOption();
  props.onChanged && props.onChanged(changedValue.value);
});

onMounted(() => {
  resetOption();
});

const removeOption = field => {
  const newVal = { ...changedValue.value };
  delete newVal[field];
  changedValue.value = newVal;
};

const setOptionValue = (field, value) => {
  changedValue.value = { ...changedValue.value, [field]: value };
};

const toggleExpanded = async () => {
  expanded.value = !expanded.value;
  if (props.onExpansionStateChanged) {
    await nextTick();
    props.onExpansionStateChanged(expanded.value);
  }
};

const onConfirm = () => {
  if (props.done) {
    props.done(changedValue.value);
  }
};

const onChipClick = (field) => {
  removeOption(field);
  onConfirm();
};

</script>

<style lang="stylus" scoped>
.panel-filter-item
  margin 0 16px

.filter-controller
  --el-button-hover-text-color: var(--bm-theme-color-5)
  --el-button-hover-border-color: var(--bm-theme-color-5)

.filter-btn
  --el-button-hover-bg-color: var(--bm-theme-color-4) !important;

.fix-height
  height 32px
  line-height 32px
</style>