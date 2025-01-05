<template>
  <el-drawer
    v-model="drawerVisible"
    :size="drawerHeight"
    :with-header="false"
    @closed="handleDrawerClosed"
    class="bill-list-filter-drawer"
    direction="btt"
    append-to=".bill-list">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
      <el-tab-pane label="月份选择" name="month-picker">
        <div class="month-group-picker">
          <vue-scroll-picker :options="year" v-model="currentYear"/>
          <vue-scroll-picker :options="months" v-model="currentMonth"/>
        </div>
        <el-button type="primary" @click="query">确认</el-button>
      </el-tab-pane>
      <el-tab-pane label="自定义" name="user-defined-date">Config</el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script setup>
import { computed, ref } from "vue";
import { VueScrollPicker } from "vue-scroll-picker";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  direction: {
    type: String,
    default: "btt",
    validator: (value) => {
      const validDirections = ['ltr', 'rtl', 'ttb', 'btt'];
      if (!validDirections.includes(value)) {
        console.error(`Invalid direction: ${value}. Must be one of ${validDirections.join(', ')}.`);
        return false; // This will trigger a Vue warning in development mode
      }
      return true;
    }
  }
});

const drawerHeight = ref(224);
const activeName = ref('month-picker')
const today = new Date();
const currentYear = ref(today.getFullYear())
const nowYear = ref(today.getFullYear())
const lastYear = ref(1980)
const currentMonth = ref(today.getMonth())
const nowMonth = ref(today.getMonth())

const emits = defineEmits(['update:visible', 'closed', 'query']);
const drawerVisible = computed({
  get: () => props.visible,
  set: (visible) => {
    emits('update:visible', visible);
  }
})
const year = computed({
  get: () => {
    return Array.from({length: nowYear.value - lastYear.value + 1}, (_, index) => {
      const yearValue = lastYear.value+index
      return {
        name: yearValue.toString() + ' 年',
        value: yearValue,
        disabled: false
      }
    })
  },
})
const months = computed({
  get: () => {
    const length = currentYear.value === nowYear.value ? (nowMonth.value+1) : 12
    const months = []
    for (let i = 1; i <= length; i++) {
      months.push({
        name: i.toString() + ' 月',
        value: i,
        disabled: false
      })
    }
    return months
  }
})

const handleDrawerClosed = () => {
  emits('closed', true)
}
const handleTabClick = (tab, event) => {
  if (tab.props.name === 'month-picker') {
    drawerHeight.value = 224
  } else if (tab.props.name === 'user-defined-date') {
    drawerHeight.value = "50%"
  }
}
const query = () => {
  const queryMonth = currentYear.value + "." + currentMonth.value
  emits('query', queryMonth)
  emits('closed')
}
</script>

<style lang="stylus" scoped>
.bill-list-filter-drawer
  .el-tabs
    --el-tabs-header-height 32px

  .el-button
    width 100%

.month-group-picker
  display flex
</style>
