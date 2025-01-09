<template>
  <div class="scroll-date-picker">
    <el-radio-group v-model="uRadioDateRange" size="large" @change="setCurrent">
      <el-radio-button :label="fromDate" value="fromDate" />
      <el-text size="large">至</el-text>
      <el-radio-button :label="toDate" value="toDate" />
    </el-radio-group>
    <div class="hint" style="width: 100%;">
      <el-text type="warning" style="width: 100%; display: block; text-align: center;">最长可查找时间跨度一年的交易</el-text>
    </div>
    <div class="date-group-picker">
      <vue-scroll-picker :options="year" v-model="cur.years" @update:modelValue="setCurrentYear" />
      <vue-scroll-picker :options="months" v-model="cur.months" @update:modelValue="setCurrentMonth" />
      <vue-scroll-picker :options="days" v-model="cur.date" @update:modelValue="setCurrentDate" />
    </div>
  </div>
</template>

<script lang="js" setup>
import { VueScrollPicker } from "vue-scroll-picker";
import moment from 'moment/moment';
import { ref, computed, reactive, toRefs, watch } from "vue";

// Define props
const props = defineProps({
  lastYear: {
    type: [Number, String],
    default: 1980
  },
  fromDate: {
    type: String,
    default: "开始时间",
    require: true
  },
  toDate: {
    type: String,
    default: "结束时间",
    require: true
  },
  fmt: {
    type: String,
    default: "YYYY年MM月DD日"
  }
})

const { fromDate, toDate, fmt } = toRefs(props)
// Define emits
const emits = defineEmits()

// Get the current date values
const now = moment().toObject()
const nowYear = ref(now.years)
const nowMonth = ref(now.months)
const today = ref(now.date)

// Helper function to get date array
const getNow = () => moment().format(fmt.value)
const getCurrentDate = (dateStr) => moment(dateStr, fmt.value).toObject()
const getCurrent = (value) => {
  if (["开始时间", "结束时间"].includes(props[value])) {
    const date = getNow()
    emits(`update:${value}`, date)
    return getCurrentDate(date)
  }
  return getCurrentDate(props[uRadioDateRange.value])
}
// Define reactive state
const uRadioDateRange = ref("fromDate");
const cur = reactive(getCurrent(uRadioDateRange.value))

const setCurrentYear = (value) => {
  console.log(value);
  
  const date = moment(cur).year(value)
  emits(`update:${uRadioDateRange.value}`, date.format(fmt.value))
}

const setCurrentMonth = (value) => {
  console.log(value);
  const date = moment(cur).month(value)
  emits(`update:${uRadioDateRange.value}`, date.format(fmt.value))
}

const setCurrentDate = (value) => {
  console.log(value);
  const date = moment(cur).date(value)
  emits(`update:${uRadioDateRange.value}`, date.format(fmt.value))
}

const setCurrent = (value) => {
  const {years, months, date} = getCurrent(value)
  cur.years = years
  cur.months = months
  cur.date = date
}

// Compute years, months, and days for the picker
const year = computed(() => {
  return Array.from({ length: nowYear.value - props.lastYear + 1 }, (_, index) => ({
    name: `${props.lastYear + index} 年`,
    value: props.lastYear + index,
    disabled: false
  }));
});

const months = computed(() => {
  const length = cur.years === nowYear.value ? nowMonth.value + 1 : 12;
  return Array.from({ length }, (_, i) => ({
    name: `${i + 1} 月`,
    value: i,
    disabled: false
  }));
});

const days = computed(() => {
  const length = (cur.years === nowYear.value && cur.months === nowMonth.value)
    ? today.value
    : moment(`${cur.years}-${cur.months + 1}`, 'YYYY-MM').daysInMonth();
  return Array.from({ length }, (_, i) => ({
    name: `${i + 1} 日`,
    value: i + 1,
    disabled: false
  }));
});

watch([fromDate, toDate], (newValue) => {
  if (newValue[0] === "开始时间" && newValue[1] === "结束时间") {
    return
  }
  console.log(newValue);
  setCurrent(uRadioDateRange.value)
})

</script>

<style lang="stylus" scoped>
.scroll-date-picker
  .el-radio-group
      width 100%
      flex auto
      justify-content space-between

      :deep(.el-radio-button)
          margin-right 0 !important
          .el-radio-button__inner
              width 9rem
              height 1.75rem !important
              line-height 0.25rem !important
              font-size 1rem

.date-group-picker
  display flex
  
</style>