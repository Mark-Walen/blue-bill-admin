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
      <el-tab-pane label="自定义" name="user-defined-date">
        <div class="filter-group filter-radio">
          <div class="filter-group__header">
            <el-text size="large">按时间</el-text>
          </div>
          <el-radio-group v-model="uRadio" @change="handleRadioChange">
            <el-radio-button v-for="(item, index) in radioOptions" :key="index" :label="item.label" :value="item.value" border/>
          </el-radio-group>
        </div>
        <div class="filter-group filter-group__diy">
          <div class="filter-group__header filter-group__diy_header">
            <el-text size="large">自定义</el-text>
            <div class="filter-group__header_logo" @click="handleDateRangeClear"><i class="icon icon-font icon-ashbin"></i></div>
          </div>
          <scroll-date-picker
            v-model:from-date="fromDate"
            v-model:to-date="toDate"/>
          <el-button type="primary" @click="dateRangeQuery">确认</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<script setup>
import { computed, reactive, ref, defineAsyncComponent } from "vue";
import { VueScrollPicker } from "vue-scroll-picker";
import moment from "moment";

moment.updateLocale('en', {
    week : {
        dow : 1,
     }
});

const ScrollDatePicker = defineAsyncComponent(() => import("@/components/scroll-date-picker/ScrollDatePicker.vue"));
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
const now = moment().toObject();
const currentYear = ref(now.years)
const nowYear = ref(now.years)
const lastYear = ref(1980)
const currentMonth = ref(now.months)
const nowMonth = ref(now.months)
const dateFmt = "YYYY年MM月DD日"
const fromDate = ref(moment().format(dateFmt))
const toDate = ref("结束时间")

const uRadio=ref('undefined')
const radioOptions = reactive([
  {
    "label": "上周",
    "value": "lastWeek"
  },
  {
    "label": "上月",
    "value": "lastMonth"
  },
  {
    "label": "近一年",
    "value": "lastYear"
  },
  // lastest five year: 2021-2025
  ...Array.from({ length: 5 }, (_, i) => {
    const year = nowYear.value - i;
    return {
      "label": year.toString(),
      "value": year.toString()
    };
  }),
])

const getDateRange = (selectedValue) => {
  switch (selectedValue) {
    case 'lastWeek':
      // Get the start of the previous week (Monday) and the end (Sunday)
      const lastWeekStart = moment().subtract(1, 'week').startOf('week');
      const lastWeekEnd = moment().subtract(1, 'week').endOf('week');
      return { from: lastWeekStart.format(dateFmt), to: lastWeekEnd.format(dateFmt) };

    case 'lastMonth':
      // Get the start of the previous month and the end of the previous month
      const lastMonthStart = moment().subtract(1, 'month').startOf('month');
      const lastMonthEnd = moment().subtract(1, 'month').endOf('month');
      return { from: lastMonthStart.format(dateFmt), to: lastMonthEnd.format(dateFmt) };

    case 'lastYear':
      // Get the start and end of the previous year
      const lastYearStart = moment().subtract(1, 'year');
      const lastYearEnd = moment();
      return { from: lastYearStart.format(dateFmt), to: lastYearEnd.format(dateFmt) };

    default:
      // For specific years, e.g., 2021-2025
      const year = parseInt(selectedValue, 10);
      const yearStart = moment(`${year}-01-01`);
      const yearEnd = (year === nowYear.value) ? moment() : moment(`${year}-12-31`);
      
      return { from: yearStart.format(dateFmt), to: yearEnd.format(dateFmt) };
  }
}
const handleRadioChange = (val) => {
  const { from, to } = getDateRange(val);
  fromDate.value = from;
  toDate.value = to;
}
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
    drawerHeight.value = "87%"
  }
}
const query = () => {
  const queryMonth = currentYear.value + "." + currentMonth.value
  emits('query', queryMonth)
  emits('closed')
}

const dateRangeQuery = () => {
  console.log({
    'fromDate': fromDate.value,
    'toDate': toDate.value
  })
  emits('closed')
}
const handleDateRangeClear = () => {
  fromDate.value = '开始时间'
  toDate.value = '结束时间'
}
</script>

<style lang="stylus" scoped>
.bill-list-filter-drawer
  overflow hidden

  .el-tabs
    --el-tabs-header-height 32px

  .el-button
    width 100%

  .filter-group
    margin-bottom 24px
    .filter-group__header
      width 100%
      margin-bottom 16px
      display inline-flex
      justify-content space-between

      .icon-font
        font-size 20px
    
    .el-radio-group
      height 4.5rem

    :deep(.el-radio-button)
      margin-right 0.5rem
      
      .el-radio-button__original-radio
        display none
      
      .el-radio-button__inner
        width 4.25rem
        height 1.75rem
        line-height 0.75rem
        border: 1px solid #666666
        border-radius 0.25rem

    :deep(.el-radio-button.is-active)
      .el-radio-button__original-radio:not(:disabled)+.el-radio-button__inner
        border-color #1677FF
        background-color #EDF4FF
        color #1677FF

.month-group-picker
  display flex
</style>
