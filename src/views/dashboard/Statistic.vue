<template>
  <div>
    <el-row>
      <el-col class="bm-statistic" :xs="24" :sm="24" :md="12" :lg="12" :xl="16">
        <bm-card>
          <el-select v-model="activeDateType" class="bm-select" :placeholder="state.dateTypeList[0].name">
            <el-option
                v-for="item in state.dateTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id" />
          </el-select>
          <bill-statistic :x-axis-data="state.xAxisData"></bill-statistic>
        </bm-card>
      </el-col>
      <el-col class="daily-statistic" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
        <bm-card>
          今日账单<hr/>
          123
        </bm-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import BmCard from "../../components/card/BmCard";
import BillStatistic from "../../components/statistic/BillStatistic.vue";
import {reactive, ref, toRef} from "vue";
import {getLastMonthDays, getLastNDays} from "../../utils/date";

const activeDateType = ref('近七天')
const state = reactive({
  xAxisData: getLastNDays(7, 'MM-DD'),
  dateTypeList: [
    {
      id: 0,
      name: '近七天',
    },
    {
      id: 1,
      name: '近一月'
    },
    {
      id: 2,
      name: '近一年'
    },
  ]
})
</script>

<style lang="stylus" scoped>
.bm-statistic
  --bm-card-padding 20px
</style>