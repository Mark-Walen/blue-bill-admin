<template>
    <div class="scroll-date-picker">
        <el-radio-group v-model="uRadioDateRange">
            <el-radio-button label="开始时间" value="fromDate"/>
            <span>至</span>
            <el-radio-button label="结束时间" value="toDate"/>
        </el-radio-group>
        <div>{{ uRadioDateRange }}</div>
        <div class="date-group-picker" v-if="uRadioDateRange !== 'toDate'">
            <vue-scroll-picker :options="year" v-model="currentYear"/>
            <vue-scroll-picker :options="months" v-model="currentMonth"/>
            <vue-scroll-picker :options="days" v-model="currentDay"/>
        </div>
        <div class="date-group-picker" v-else>
            <vue-scroll-picker :options="year" v-model="currentYear"/>
            <vue-scroll-picker :options="months" v-model="currentMonth"/>
            <vue-scroll-picker :options="days" v-model="currentDay"/>
        </div>
    </div>
</template>

<script lang="js" setup>
import moment from 'moment/moment';

const now = moment();
const currentYear = ref(now.getFullYear())
const nowYear = ref(now.getFullYear())
const lastYear = ref(1980)
const currentMonth = ref(now.getMonth())
const nowMonth = ref(now.getMonth())
const currentDay = ref(now.getDay)
const today = now.getDay

const props = defineProps({
    lastYear: {
        type: Number | String,
        default: 1980,
        validator: (value) => {
            const nowYear_ = new Date().getFullYear
            const lastYear_ = Number(value)
            return !isNaN(lastYear_) && lastYear_ > 0 && lastYear_ <= nowYear_;
        }
    },
    fromDate: {
        type: [String, Date],
        default: "开始时间"
    },
    toDate: {
        type: [String, Date],
        default: "结束时间"
    }
})

const uRadioDateRange=ref('undefined')
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
</script>

<style lang="stylus" scoped>

</style>
