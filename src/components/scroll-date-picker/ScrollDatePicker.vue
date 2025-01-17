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
      <scroll-picker
        :options="years"
        v-model="cur.years"
        @update:modelValue="setCurrentYear"
        @end="onYearUpdate"
        @click="(value, oldValue) => onYearUpdate(value)"
        @wheel="onYearUpdate"
        @cancel="onYearUpdateCancel"/>
      <scroll-picker
        :options="months"
        v-model="cur.months"
        @update:modelValue="setCurrentMonth"
        @end="onMonthUpdate"
        @click="(value, oldValue) => onMonthUpdate(value)"
        @wheel="onMonthUpdate"
        @cancel="onMonthUpdateCancel"/>
      <scroll-picker
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
import ScrollPicker from "@/components/scroll-picker/scroll-picker";
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
const getCurrentDate = (dateStr, fmt) => {
  let date = moment(dateStr, fmt)
  if (!date.isValid()) {
    date = moment()
  }
  return date.toObject()
}

// Define reactive state
const uRadioDateRange = ref("fromDate");
const cur = reactive(getCurrentDate(uRadioDateRange.value, props.fmt))
const scrollPickerUpdate = reactive({
  'years': false,
  'months': false,
  'date': false
})

const onYearUpdate = (value) => {
  // console.log('year update');  
  scrollPickerUpdate.years = true
}

const onMonthUpdate = (value) => {
  // console.log('month update');
  scrollPickerUpdate.months = true
}

const onDateUpdate = (value) => {
  // console.log('date update');
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

// Compute years, months, and days for the picker
const years = computed(() => {
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
    : moment([cur.years, cur.months]).daysInMonth();
  return Array.from({ length }, (_, i) => ({
    name: `${i + 1} 日`,
    value: i + 1,
    disabled: false
  }));
});

const setCurrentYear = (value) => {
  // console.log('year: ', value);
  if (!scrollPickerUpdate.years) return;
  let date = moment(cur).year(value)
  if (months.value.length <= cur.months) {
    date.month(months.value.length-1)
  }
  if(days.value.length < cur.date) {
    date.date(days.value.length)
  }
  scrollPickerUpdate.years = false
  emits(`update:${uRadioDateRange.value}`, date.format(props.fmt))
}

const setCurrentMonth = (value) => {
  console.log('month: ', value);
  if (!scrollPickerUpdate.months) return;
  const date = moment(cur).month(value)
  if(days.value.length < cur.date) {
    date.date(days.value.length)
  }
  scrollPickerUpdate.months = false
  emits(`update:${uRadioDateRange.value}`, date.format(props.fmt))
}

const setCurrentDate = (value) => {
  // console.log('date: ', value);
  if (!scrollPickerUpdate.date) return;
  const date = moment(cur).date(value)
  scrollPickerUpdate.date = false
  emits(`update:${uRadioDateRange.value}`, date.format(props.fmt))
}

const setCurrent = (value) => {
  let date = moment(props[value], props.fmt)
  if (!date.isValid()) {
    date = moment()
    emits(`update:${value}`, date.format(props.fmt))
  }
  const {years, months, date:date_} = date.toObject()
  
  cur.years = years;
  cur.months = months;
  cur.date = date_;
}

watch(fromDate, (newValue) => {
  let date = moment(newValue, props.fmt)
  if (!date.isValid()) {
    date = moment()
  }
  const {years, months, date:date_} = date.toObject()
  
  if ((!scrollPickerUpdate.years || !scrollPickerUpdate.months || !scrollPickerUpdate.date) && uRadioDateRange.value === "fromDate") {
    cur.years = years
    cur.months = months
    cur.date = date_
  }
})

watch(toDate, (newValue) => {
  let date = moment(newValue, props.fmt)
  if (!date.isValid()) {
    date = moment()
  }
  const {years, months, date:date_} = date.toObject()
  
  if ((!scrollPickerUpdate.years || !scrollPickerUpdate.months || !scrollPickerUpdate.date) && uRadioDateRange.value === "toDate") {
    cur.years = years
    cur.months = months
    cur.date = date_
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