<template>
  <div>
    <el-row :gutter="24" class="mx-[-12px]">
      <el-col :xs="12" :sm="12" :md="12" :xl="6" style="height: 180px;" class="mb-[24px]">
        <bm-card style="width: 100%; height: 100%" class="bg-white">我的账本</bm-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :xl="6" style="height: 180px;" class="mb-[24px]">
        <bm-card style="width: 100%; height: 100%" class="bg-white">
          常用功能
        </bm-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :xl="6" style="height: 180px;" class="mb-[24px]">
        <bm-card style="width: 100%; height: 100%" class="bg-white">
          本月支出：289￥
          本月收入：11700￥
        </bm-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :xl="6" style="height: 180px;" class="mb-[24px]">
        <bm-card style="width: 100%; height: 100%" class="bg-white">
          年度目标
          收入：10 万
          支出：3 万
        </bm-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" class="statistic-container">
      <el-col class="bm-statistic" :xs="24" :sm="24" :md="12" :lg="12" :xl="16">
        <bm-card>
          <el-select v-model="activeDateType" class="bm-select" :placeholder="state.dateTypeList[0].name">
            <el-option
                v-for="item in state.dateTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
          </el-select>
          <bill-statistic :x-axis-data="state.xAxisData" :title="{text: '支出详情'}"></bill-statistic>
        </bm-card>
      </el-col>
      <el-col class="daily-statistic" :xs="24" :sm="12" :md="12" :lg="12" :xl="{span: 6}">
        <el-row justify="space-between" class="header">
          <el-col class="date" :span="12">
            {{today}} 今天
          </el-col>
          <el-col class="bill-count" :span="12">
              <span class="outcome">
                <span class="text">出</span>
                <span class="money">19.3</span>
              </span>
            <span class="income">
                <span class="text">入</span>
                <span class="money">0</span>
              </span>
          </el-col>
        </el-row>
        <bm-card v-infinite-scroll="load" class="content flex-1">
          <el-row v-if="dailyBillList.length" class="bill-item" v-for="(item, index) in dailyBillList[0].billItems" :key="index">
            <el-col :span="4">
              <el-image :src="item.categoryLogo" loading="lazy" fit="fill"/>
            </el-col>
            <el-col :span="16" class="main-content">
              <h2 class="font-medium">{{ item.name }}</h2>
              <bm-card>{{ item.time }} | {{ item.merchant }}</bm-card>
            </el-col>
            <el-col :span="4">
              <h1 class="font-bold text-lg">{{ parseFloat(item.money).toFixed(2) }}</h1>
            </el-col>
          </el-row>
          <el-empty v-else description="今天还没有记账，一定要养成习惯哦！"/>
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

const today = getLastNDays(1, 'YYYY-MM-DD')[0]
const activeDateType = ref('近七天')
const state = reactive({
  xAxisData: getLastNDays(15, 'MM-DD'),
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
const dailyBillList = [
  {
    date: '2022-12-04',
    billItems: [
      {
        categoryLogo: '/img/shopping.png',
        money: '-35.9',
        name: '餐饮',
        time: '12:35',
        merchant: '深圳金拱门食品有限公司',
        itemDetailList: []
      },
      {
        categoryLogo: '/img/shopping.png',
        money: '-35.9',
        name: '餐饮',
        time: '12:35',
        merchant: '深圳金拱门食品有限公司',
        itemDetailList: []
      }
    ]
  }
]

const load = () => {
  //
}
</script>

<style lang="stylus" scoped>
.statistic-container
  .el-col
    margin-bottom 10px

.bm-statistic
  --bm-card-padding 20px

.daily-statistic
  display flex
  flex-direction column
  align-self stretch

  .el-row.header
    background-color: #fbfbfb;
    height 36px

  .bm-card.content
    .bill-item
      padding 4px
      cursor pointer
      border-bottom 1px solid #e5e5e5

      .el-image
        max-width 32px

</style>