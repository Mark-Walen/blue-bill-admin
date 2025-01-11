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
      <vue-scroll-picker
        :options="year"
        v-model="cur.years"
        @update:modelValue="setCurrentYear"
        @end="onYearUpdate"
        @click="(value, oldValue) => onYearUpdate(value)"
        @wheel="onYearUpdate"
        @cancel="onYearUpdateCancel"/>
      <vue-scroll-picker
        :options="months"
        v-model="cur.months"
        @update:modelValue="setCurrentMonth"
        @end="onMonthUpdate"
        @click="(value, oldValue) => onMonthUpdate(value)"
        @wheel="onMonthUpdate"
        @cancel="onMonthUpdateCancel"/>
      <vue-scroll-picker
        :options="days"
        v-model="cur.date"
        @update:modelValue="setCurrentDate"
        @end="onDateUpdate"
        @click="(value, oldValue) => onDateUpdate(value)"
        @wheel="onDateUpdate"
        @cancel="onDateUpdateCancel"/>
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

const { fromDate, toDate } = toRefs(props)
// Define emits
const emits = defineEmits()

// Helper function to get date array
const getNow = () => moment().format(props.fmt)
const getCurrentDate = (dateStr) => moment(dateStr, props.fmt).toObject()
const getCurrent = (value) => {
  const dateOption = value === "fromDate" ? fromDate : toDate
  if (["开始时间", "结束时间"].includes(dateOption.value)) {
    const date = getNow()
    return getCurrentDate(date)
  }
  return getCurrentDate(dateOption.value)
}

// Define reactive state
const uRadioDateRange = ref("fromDate");
const cur = reactive(getCurrent(uRadioDateRange.value))
const scrollPickerUpdate = reactive({
  'years': false,
  'months': false,
  'date': false
})

const onYearUpdate = (value) => {
  console.log('year update');
  
  scrollPickerUpdate.years = true
}

const onMonthUpdate = (value) => {
  console.log('month update');
  scrollPickerUpdate.months = true
}

const onDateUpdate = (value) => {
  console.log('date update');
  scrollPickerUpdate.date = true
}

const onYearUpdateCancel = () => {
  if (scrollPickerUpdate.years) scrollPickerUpdate.years = false
}

const onMonthUpdateCancel = () => {
  if (scrollPickerUpdate.months) scrollPickerUpdate.months = false
}

const onDateUpdateCancel = () => {
  if (scrollPickerUpdate.date) scrollPickerUpdate.date = false
}

const setCurrentYear = (value) => {
  console.log('year: ', value);
  if (!scrollPickerUpdate.years) return;
  const date = moment(cur).year(value)
  scrollPickerUpdate.years = false
  emits(`update:${uRadioDateRange.value}`, date.format(props.fmt))
}

const setCurrentMonth = (value) => {
  console.log('month: ', value);
  if (!scrollPickerUpdate.months) return;
  const date = moment(cur).month(value)
  scrollPickerUpdate.months = false
  emits(`update:${uRadioDateRange.value}`, date.format(props.fmt))
}

const setCurrentDate = (value) => {
  console.log('date: ', value);
  
  if (!scrollPickerUpdate.date) return;
  const date = moment(cur).date(value)
  scrollPickerUpdate.date = false
  emits(`update:${uRadioDateRange.value}`, date.format(props.fmt))
}

const setCurrent = (value) => {
  const {years, months, date} = getCurrent(value)
  
  cur.years = years;
  cur.months = months;
  cur.date = date;
}

// Compute years, months, and days for the picker
const year = computed(() => {
  const today = moment().toObject()
  return Array.from({ length: today.years - props.lastYear + 1 }, (_, index) => ({
    name: `${props.lastYear + index} 年`,
    value: props.lastYear + index,
    disabled: false
  }));
});

const months = computed(() => {
  const today = moment().toObject()
  const length = cur.years === today.years ? today.months + 1 : 12;
  return Array.from({ length }, (_, i) => ({
    name: `${i + 1} 月`,
    value: i,
    disabled: false
  }));
});

const days = computed(() => {
  const today = moment().toObject()
  const length = (cur.years === today.years && cur.months === today.months)
    ? today.date
    : moment(`${cur.years}-${cur.months + 1}`, 'YYYY-MM').daysInMonth();
  return Array.from({ length }, (_, i) => ({
    name: `${i + 1} 日`,
    value: i + 1,
    disabled: false
  }));
});

watch([fromDate, toDate], (newValue) => {
  let date = moment(props[uRadioDateRange.value], props.fmt).toObject();
  if (newValue[0] === "开始时间" && newValue[1] === "结束时间") {
    date = moment().toObject()
  }
  
  if (!scrollPickerUpdate.years || !scrollPickerUpdate.months || !scrollPickerUpdate.date) {
    cur.years = date.years
    // cur.months = date.months
    // cur.date = date.date
  }
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